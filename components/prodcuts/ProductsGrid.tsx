import { Product } from "@/utils/type";
import Link from "next/link";
import { links } from "@/utils/links";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import FavoriteToggleButton from "./FavoriteToggleButton";
import SubmitButton from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import { addToCartAction } from "@/utils/api";

function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <section className="grid grid-cols-2 gap-x-4 gap-y-10 pb-14 pt-2 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
      {products.map((product) => {
        const productName = product.name;
        const productId = product.id;
        const DinarAmount = formatCurrency(product.price);
        return (
          <article key={productId} className="group relative flex min-w-0 flex-col">
            <div className="relative aspect-[3/4] w-full overflow-hidden border-2 border-foreground bg-muted">
              <Link href={`${links.PRODUCTS.href}/${productId}`} aria-label={productName}>
                <Image
                  src={product.image}
                  alt={productName}
                  fill
                  sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>

              {product.featured && (
                <span className="absolute start-0 top-3 bg-saffron px-2.5 py-1 text-[0.7rem] font-bold text-saffron-foreground">
                  مميز
                </span>
              )}

              <div className="absolute end-2 top-2 z-10 rounded-full bg-background/90 backdrop-blur">
                <FavoriteToggleButton productId={productId} />
              </div>

              {/* quick add slides up on hover (always visible on touch screens) */}
              <div className="absolute inset-x-0 bottom-0 translate-y-0 transition-transform duration-300 md:translate-y-full md:group-hover:translate-y-0 md:group-focus-within:translate-y-0">
                <FormContainer action={addToCartAction}>
                  <input type="hidden" name="productId" value={productId} />
                  <input type="hidden" name="amount" value={1} />
                  <SubmitButton
                    text="أضف إلى السلة"
                    className="mt-0 h-10 w-full rounded-none border-t-2 border-foreground bg-foreground text-xs text-background hover:bg-primary hover:text-primary-foreground sm:text-sm"
                  />
                </FormContainer>
              </div>
            </div>

            <div className="mt-3 flex flex-1 items-start justify-between gap-2">
              <Link href={`${links.PRODUCTS.href}/${productId}`} className="min-w-0">
                <h2
                  className="line-clamp-2 font-sans text-sm font-semibold leading-6 hover:text-primary sm:text-base"
                  title={productName}
                >
                  {productName}
                </h2>
              </Link>
            </div>
            <p className="mt-1 text-sm font-bold text-primary sm:text-base">{DinarAmount}</p>
          </article>
        );
      })}
    </section>
  );
}

export default ProductsGrid;
