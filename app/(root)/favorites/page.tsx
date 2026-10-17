export const dynamic = "force-dynamic";

import Link from "next/link";
import SectionTitle from "@/components/global/SectionTitle";
import EmptyList from "@/components/global/EmptyList";
import ProductsGrid from "@/components/prodcuts/ProductsGrid";
import { fetchUserFav } from "@/utils/api";

const FavoritesPage = async () => {
  const userFavorites = await fetchUserFav();
  if (userFavorites.length === 0) {
    return (
      <EmptyList title="لا توجد منتجات في المفضلة بعد" description="اضغط على أيقونة القلب في أي منتج لحفظه هنا.">
        <Link
          href="/products"
          className="mt-2 inline-flex h-10 items-center bg-foreground px-5 text-sm font-semibold text-background"
        >
          تصفّح المتجر
        </Link>
      </EmptyList>
    );
  } else {
    return (
      <div>
        <SectionTitle eyebrow={`${userFavorites.length} منتج`} text="المفضلة" />
        <ProductsGrid products={userFavorites.map((fav) => fav.product)} />
      </div>
    );
  }
};

export default FavoritesPage;
