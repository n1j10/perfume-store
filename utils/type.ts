// Types matching the JSON returned by the Express backend (dates arrive as ISO strings).

export type actionFunction = (prevState: any, formData: FormData) => Promise<{ message: string }>;

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email?: string;
  imageUrl: string;
};

export type Category = {
  id: string;
  title: string;
  image: string;
  description: string | null;
  clerkId: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  featured: boolean;
  image: string;
  price: number;
  clerkId: string;
  categoryId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ProductWithCategory = Product & { category: Category | null };

export type Hero = {
  id: string;
  title: string;
  image: string;
  createdAt: string;
};

export type CartItem = {
  id: string;
  productId: string;
  cartId: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
};

export type CartItemWithProduct = CartItem & { product: Product };

export type Cart = {
  id: string;
  clerkId: string;
  cartItems: CartItemWithProduct[];
  numItemsInCart: number;
  cartTotal: number;
  orderTotal: number;
  createdAt: string;
  updatedAt: string;
};

export type Favorite = {
  id: string;
  clerkId: string;
  productId: string;
  createdAt: string;
};

export type FavoriteWithProduct = Favorite & { product: Product };

export type Order = {
  id: string;
  clerkId: string;
  productId: string;
  products: number;
  orderTotal: number;
  isPaid: boolean;
  createdAt: string;
  product: { name: string };
};

export type Review = {
  id: string;
  clerkId: string;
  rating: number;
  comment: string;
  authorName: string;
  authorImageUrl: string;
  productId: string;
  createdAt: string;
};

export type ReviewWithProduct = Review & { product: { id: string; name: string } };
