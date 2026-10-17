"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect, unstable_rethrow } from "next/navigation";
import { revalidatePath } from "next/cache";
import type {
  ApiResponse,
  Cart,
  Category,
  FavoriteWithProduct,
  Hero,
  Order,
  Product,
  ProductWithCategory,
  Review,
  ReviewWithProduct,
} from "./type";

const API_URL = process.env.API_URL || "https://backend-perfume-store.vercel.app/api";

// ================= Helpers =================

type ApiOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | object;
  // auth: true => لازم يكون المستخدم مسجل دخول، وإلا يتحول إلى /sign-in
  auth?: boolean;
};

async function getToken() {
  const { getToken } = await auth();
  return getToken();
}

async function apiFetch<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { body, auth = false, headers, ...init } = options;
  const token = await getToken();

  if (auth && !token) redirect("/sign-in");

  const isJsonBody =
    body !== undefined && !(body instanceof FormData) && typeof body === "object";

  const res = await fetch(`${API_URL}${path}`, {
    cache: "no-store",
    ...init,
    headers: {
      ...(isJsonBody ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: isJsonBody ? JSON.stringify(body) : (body as BodyInit | undefined),
  });
  const json = (await res.json().catch(() => null)) as ApiResponse<T> | null;

  if (res.status === 401 && auth) redirect("/sign-in");

  if (!res.ok || !json?.success) {
    throw new Error(json?.message || `فشل الطلب (${res.status})`);
  }
  return json.data;
}

const renderError = (error: unknown): { message: string } => {
  // يخلي redirect() و notFound() تشتغل حتى لو صارت داخل try/catch
  unstable_rethrow(error);
  return {
    message: error instanceof Error ? error.message : "حدث خطأ غير معروف",
  };
};

// ================= Heroes =================
// GET /heroes

export const fetchHeroes = async () => apiFetch<Hero[]>("/heroes");

// ================= Categories =================
// GET /categories , GET /categories/admin , GET /categories/:id
// POST /categories , PATCH /categories/:id , PATCH /categories/:id/image , DELETE /categories/:id

export const fetchAllCategories = async () => apiFetch<Category[]>("/categories");

export const fetchAdminCategories = async () =>
  apiFetch<Category[]>("/categories/admin", { auth: true });

export const fetchSingleCategory = async (categoryId: string) => {
  try {
    return await apiFetch<Category>(`/categories/${categoryId}`);
  } catch {
    redirect("/products");
  }
};

export const createCategoryAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
  try {
    await apiFetch<Category>("/categories", {
      method: "POST",
      body: formData, // multipart: title, description, image
      auth: true,
    });
    revalidatePath("/admin/category");
    revalidatePath("/products");
    return { message: "تم إنشاء القسم بنجاح" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateCategoryAction = async (prevState: any, formData: FormData) => {
  try {
    const categoryId = formData.get("id") as string;
    const description = formData.get("description");
    await apiFetch<Category>(`/categories/${categoryId}`, {
      method: "PATCH",
      body: {
        title: formData.get("title"),
        ...(description !== null ? { description } : {}),
      },
      auth: true,
    });
    revalidatePath("/admin/category");
    revalidatePath("/products");
    return { message: "تم تحديث القسم بنجاح" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateCategoryImageAction = async (prevState: any, formData: FormData) => {
  try {
    const categoryId = formData.get("id") as string;
    const image = new FormData();
    image.set("image", formData.get("image") as File);
    await apiFetch<Category>(`/categories/${categoryId}/image`, {
      method: "PATCH",
      body: image,
      auth: true,
    });
    revalidatePath(`/admin/category/${categoryId}/edit`);
    return { message: "تم تحديث الصورة بنجاح" };
  } catch (error) {
    return renderError(error);
  }
};

export const deleteCategoryAction = async (prevState: { categoryId: string }) => {
  try {
    await apiFetch<null>(`/categories/${prevState.categoryId}`, {
      method: "DELETE",
      auth: true,
    });
    revalidatePath("/admin/category");
    revalidatePath("/products");
    return { message: "تم حذف القسم بنجاح" };
  } catch (error) {
    return renderError(error);
  }
};

// ================= Products =================
// GET /products , GET /products/featured , GET /products/:id , GET /products/mine
// POST /products , PATCH /products/:id , PATCH /products/:id/image , DELETE /products/:id

export const fetchFeaturedProducts = async () =>
  apiFetch<Product[]>("/products/featured");

export const fetchAllProducts = async ({ search = "", categoryId }: { search?: string; categoryId?: string; }) => {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (categoryId) params.set("categoryId", categoryId);
  const query = params.toString();
  return apiFetch<Product[]>(`/products${query ? `?${query}` : ""}`);
};

export const fetchSingleProduct = async (productId: string) =>
  apiFetch<ProductWithCategory>(`/products/${productId}`);

export const fetchAdminPosts = async () =>
  apiFetch<Product[]>("/products/mine", { auth: true });

export const createProductAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
  try {
    // الـ checkbox ما يرسل شي إذا ما محدد، والـ backend يعتبره false
    if (formData.has("featured")) formData.set("featured", "true");
    await apiFetch<Product>("/products", {
      method: "POST",
      body: formData, // multipart: name, description, price, featured, categoryId, image
      auth: true,
    });
    revalidatePath("/admin/products");
    return { message: "تم إنشاء المنتج بنجاح" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProductAction = async (prevState: any, formData: FormData) => {
  try {
    const productId = formData.get("id") as string;
    await apiFetch<Product>(`/products/${productId}`, {
      method: "PATCH",
      body: {
        name: formData.get("name"),
        description: formData.get("description"),
        price: formData.get("price"),
        featured: formData.has("featured"),
        categoryId: formData.get("categoryId"),
      },
      auth: true,
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "تم تحديث المنتج بنجاح" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProductImageAction = async (prevState: any, formData: FormData) => {
  try {
    const productId = formData.get("id") as string;
    const image = new FormData();
    image.set("image", formData.get("image") as File);
    await apiFetch<Product>(`/products/${productId}/image`, {
      method: "PATCH",
      body: image,
      auth: true,
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "تم تحديث الصورة بنجاح" };
  } catch (error) {
    return renderError(error);
  }
};

export const deleteProductAction = async (prevState: { productId: string }) => {
  try {
    await apiFetch<null>(`/products/${prevState.productId}`, {
      method: "DELETE",
      auth: true,
    });
    revalidatePath("/admin/products");
    return { message: "تم حذف المنتج" };
  } catch (error) {
    return renderError(error);
  }
};

// ================= Cart =================
// GET /cart/count , GET /cart , POST /cart/items , PATCH /cart/items/:itemId , DELETE /cart/items/:itemId

export const fetchCartItems = async () => {
  try {
    const { numItemsInCart } = await apiFetch<{ numItemsInCart: number }>("/cart/count");
    return numItemsInCart;
  } catch {
    return 0;
  }
};

// يرجع السلة مع الـ totals محسوبة من جديد
export const fetchCart = async () => apiFetch<Cart>("/cart", { auth: true });

export const addToCartAction = async (prevState: any, formData: FormData) => {
  try {
    await apiFetch<Cart>("/cart/items", {
      method: "POST",
      body: {
        productId: formData.get("productId"),
        amount: Number(formData.get("amount")),
      },
      auth: true,
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/cart");
};

export const updateCartItemAction = async ({ amount, cartItemId }: {
  amount: number;
  cartItemId: string;
}) => {
  try {
    await apiFetch<Cart>(`/cart/items/${cartItemId}`, {
      method: "PATCH",
      body: { amount },
      auth: true,
    });
    revalidatePath("/cart");
    return { message: "تم تحديث السلة" };
  } catch (error) {
    return renderError(error);
  }
};

export const removeCartItemAction = async (prevState: any, formData: FormData) => {
  try {
    const cartItemId = formData.get("id") as string;
    await apiFetch<Cart>(`/cart/items/${cartItemId}`, {
      method: "DELETE",
      auth: true,
    });
    revalidatePath("/cart");
    return { message: "تمت إزالة المنتج من السلة" };
  } catch (error) {
    return renderError(error);
  }
};

// ================= Favorites =================
// GET /favorites , GET /favorites/status/:productId , POST /favorites/toggle/:productId

export const fetchFavoritID = async (productId: string) => {
  try {
    const { favoriteId } = await apiFetch<{ favoriteId: string | null }>(
      `/favorites/status/${productId}`,
    );
    return favoriteId;
  } catch {
    return null;
  }
};

// الـ backend يعرف وحده إذا المنتج مضاف للمفضلة أو لا
export const toggleFavAction = async (prevState: { productID: string; FavoriteID: string | null }) => {
  try {
    await apiFetch<{ favorited: boolean }>(`/favorites/toggle/${prevState.productID}`, {
      method: "POST",
      auth: true,
    });
    revalidatePath("/", "layout");
    return { message: prevState.FavoriteID ? "تمت الإزالة من المفضلة" : "تمت الإضافة إلى المفضلة" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchUserFav = async () =>
  apiFetch<FavoriteWithProduct[]>("/favorites", { auth: true });

// ================= Orders =================
// POST /orders , GET /orders , POST /orders/:id/pay , GET /orders/all

// إذا الفورم بيه productId => شراء منتج واحد، وإلا => شراء كل السلة
export const createOrderAction = async (prevState: any, formData: FormData) => {
  let paymentUrl: string | null = null;
  try {
    const productId = formData.get("productId");
    const result = await apiFetch<{ order: Order; paymentUrl: string | null }>("/orders", {
      method: "POST",
      body: productId ? { productId } : {},
      auth: true,
    });
    paymentUrl = result.paymentUrl;
  } catch (error) {
    return renderError(error);
  }
  redirect(paymentUrl || "/orders");
};

export const payOrderAction = async (prevState: any, formData: FormData) => {
  let paymentUrl: string | null = null;
  try {
    const orderId = formData.get("orderId") as string;
    if (!orderId) throw new Error("رقم الطلب مطلوب");
    const result = await apiFetch<{ paymentUrl: string }>(`/orders/${orderId}/pay`, {
      method: "POST",
      auth: true,
    });
    paymentUrl = result.paymentUrl;
  } catch (error) {
    return renderError(error);
  }
  redirect(paymentUrl || "/orders");
};

export const fetchUserOrders = async () =>
  apiFetch<Order[]>("/orders", { auth: true });

export const fetchAdminOrders = async () =>
  apiFetch<Order[]>("/orders/all", { auth: true });

// ================= Reviews =================
// POST /reviews , GET /reviews , GET /reviews/product/:productId

// اسم وصورة الكاتب ياخذها الـ backend من Clerk
export const creatReviewAction = async (prevState: any, formData: FormData) => {
  try {
    const productId = formData.get("productId") as string;
    await apiFetch<Review>("/reviews", {
      method: "POST",
      body: {
        productId,
        rating: Number(formData.get("rating")),
        comment: formData.get("comment"),
      },
      auth: true,
    });
    revalidatePath(`/products/${productId}`);
    return { message: "تم إرسال تقييمك بنجاح" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchProductReview = async (productId: string) =>
  apiFetch<Review[]>(`/reviews/product/${productId}`);

export const fetchAllReviews = async () =>
  apiFetch<ReviewWithProduct[]>("/reviews");
