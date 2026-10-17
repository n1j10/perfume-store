import { fetchAllCategories, fetchAllProducts } from "@/utils/api";
import Link from "next/link";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import { links } from "@/utils/links";
import { cn } from "@/lib/utils";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import EmptyList from "../global/EmptyList";

async function ProductsContainer({
  layout,
  search,
  categoryId,
}: {
  layout: string;
  search?: string;
  categoryId?: string;
}) {
  const [totalProducts, categories] = await Promise.all([
    fetchAllProducts({ search, categoryId }),
    fetchAllCategories(),
  ]);

  const category = categories.find((item) => item.id === categoryId);

  const searchTerm = search ? `&search=${search}` : "";
  const categoryTerm = categoryId ? `&category=${categoryId}` : "";

  const chipClass = (active: boolean) =>
    cn(
      "shrink-0 rounded-full border-2 border-foreground px-4 py-1.5 text-sm font-medium transition-colors",
      active ? "bg-foreground text-background" : "hover:bg-secondary"
    );

  const layoutClass = (active: boolean) =>
    cn(
      "grid h-9 w-9 place-items-center border-2 border-foreground transition-colors",
      active ? "bg-foreground text-background" : "hover:bg-secondary"
    );

  return (
    <>
      <section className="border-b-2 border-foreground pb-6">
        <p className="text-xs font-semibold text-primary">المتجر</p>
        <h1 className="mt-1 font-display text-4xl font-bold sm:text-5xl">
          {category ? category.title : search ? `نتائج البحث عن "${search}"` : "كل المنتجات"}
        </h1>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0">
            <Link href={`${links.PRODUCTS.href}?layout=${layout}${searchTerm}`} className={chipClass(!categoryId)}>
              الكل
            </Link>
            {categories.map((item) => (
              <Link
                key={item.id}
                href={`${links.PRODUCTS.href}?layout=${layout}${searchTerm}&category=${item.id}`}
                className={chipClass(item.id === categoryId)}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 lg:justify-end">
            <p className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">{totalProducts.length}</span> منتج
            </p>
            <div className="flex">
              <Link
                aria-label="عرض شبكي"
                href={`${links.PRODUCTS.href}?layout=grid${searchTerm}${categoryTerm}`}
                className={layoutClass(layout === "grid")}
              >
                <LuLayoutGrid />
              </Link>
              <Link
                aria-label="عرض قائمة"
                href={`${links.PRODUCTS.href}?layout=list${searchTerm}${categoryTerm}`}
                className={cn(layoutClass(layout === "list"), "-ms-0.5")}
              >
                <LuList />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-8">
        {totalProducts.length === 0 ? (
          <EmptyList
            title="لا توجد منتجات مطابقة"
            description="جرّب كلمة بحث أخرى أو اختر قسمًا مختلفًا."
          />
        ) : layout === "grid" ? (
          <ProductsGrid products={totalProducts} />
        ) : (
          <ProductsList products={totalProducts} />
        )}
      </section>
    </>
  );
}

export default ProductsContainer;
