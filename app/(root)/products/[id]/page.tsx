import FavoriteToggleButton from "@/components/prodcuts/FavoriteToggleButton";
import ProductReviews from "@/components/reviews/ProductReviews";
import SubmitReview from "@/components/reviews/SubmitReview";
import AddtoCart from "@/components/single-prodcut/AddtoCart";
import BreadCrumb from "@/components/single-prodcut/BreadCrumb";
import ProductRating from "@/components/single-prodcut/ProductRating";
import ShareButton from "@/components/single-prodcut/shareButton";
import EmptyList from "@/components/global/EmptyList";
import { fetchSingleProduct } from "@/utils/api";
import { formatCurrency } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";
import { LuBadgeCheck, LuTruck } from "react-icons/lu";

const ProductDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  try {
    const product = await fetchSingleProduct(id);
    const dinarAmount = formatCurrency(product.price);

    return (
      <>
        <BreadCrumb name={product.name} />
        <section className="mt-6 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* image */}
          <div className="relative mx-auto w-full max-w-lg lg:sticky lg:top-40">
            <div className="absolute inset-0 -translate-x-3 translate-y-3 border-2 border-foreground bg-secondary" aria-hidden />
            <div className="relative aspect-[3/4] overflow-hidden border-2 border-foreground bg-muted">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width:1023px) 100vw, 45vw"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            {product.featured && (
              <span className="mb-4 inline-block bg-saffron px-3 py-1 text-xs font-bold text-saffron-foreground">
                من مختارات عَبَق
              </span>
            )}
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
              {product.name}
            </h1>
            <ProductRating productId={product.id} />

            <p className="mt-6 text-3xl font-bold text-primary">{dinarAmount}</p>

            <div className="my-6 h-0.5 bg-foreground/15" />

            <h2 className="mb-2 font-sans text-sm font-bold">عن العطر</h2>
            <p className="leading-8 text-muted-foreground">
              {product.description}
            </p>

            <AddtoCart productId={product.id} />

            <div className="mt-6 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">أضف إلى المفضلة أو شارك المنتج:</span>
              <div className="rounded-full border-2 border-foreground">
                <FavoriteToggleButton productId={id} />
              </div>
              <ShareButton id={id} name={product.name} />
            </div>

            <ul className="mt-8 grid gap-0.5 border-2 border-foreground bg-foreground sm:grid-cols-2">
              <li className="flex items-center gap-3 bg-background p-4 text-sm">
                <LuBadgeCheck className="h-5 w-5 text-primary" />
                منتج أصلي ومضمون
              </li>
              <li className="flex items-center gap-3 bg-background p-4 text-sm">
                <LuTruck className="h-5 w-5 text-primary" />
                توصيل خلال 2-4 أيام عمل
              </li>
            </ul>
          </div>
        </section>
        <ProductReviews productId={id} />
        <SubmitReview id={id} />
      </>
    );
  } catch (error) {
    return (
      <EmptyList title="المنتج غير موجود" description="ربما تم حذف هذا المنتج أو أن الرابط غير صحيح.">
        <Link
          href="/products"
          className="mt-2 inline-flex h-10 items-center bg-foreground px-5 text-sm font-semibold text-background"
        >
          العودة إلى المتجر
        </Link>
      </EmptyList>
    );
  }
};

export default ProductDetailsPage;
