import Link from "next/link";
import SectionTitle from "../global/SectionTitle";
import ProductsGrid from "../prodcuts/ProductsGrid";
import { fetchFeaturedProducts } from "@/utils/api";
import EmptyList from "../global/EmptyList";
import { links } from "@/utils/links";

async function FeaturedProducts() {
  const Featured_Products = await fetchFeaturedProducts();

  if (Featured_Products.length === 0)
    return <EmptyList className="mt-16" title="لا توجد منتجات مميزة بعد" />;

  return (
    <section className="pt-20">
      <SectionTitle eyebrow="الأكثر طلبًا" text="مختارات عَبَق" />
      <ProductsGrid products={Featured_Products} />
      <div className="flex justify-center">
        <Link
          href={links.PRODUCTS.href}
          className="inline-flex h-11 items-center border-2 border-foreground px-8 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
        >
          عرض كل المنتجات
        </Link>
      </div>
    </section>
  );
}

export default FeaturedProducts;
