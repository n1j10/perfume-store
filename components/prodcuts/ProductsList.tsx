import { Product } from "@/utils/type";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import FavoriteToggleButton from "./FavoriteToggleButton";
import FormContainer from "../form/FormContainer";
import { createOrderAction } from "@/utils/api";
import SubmitButton from "../form/Buttons";

function ProductsList({ products }: { products: Product[] }) {
  return (
    <section className="mt-6 divide-y-2 divide-foreground/15 border-y-2 border-foreground">
      {products.map((product, index) => {
        const productId = product.id;
        const { name, price, image, description } = product;
        const dinarAmount = formatCurrency(price);

        return (
          <article key={productId} className="group grid gap-5 py-6 sm:grid-cols-[auto_8rem_1fr_auto] sm:items-center sm:gap-8">
            <span className="ltr-nums hidden font-display text-3xl font-bold text-foreground/20 sm:block">
              {String(index + 1).padStart(2, "0")}
            </span>

            <Link
              href={`/products/${productId}`}
              className="relative aspect-[3/4] w-28 overflow-hidden border-2 border-foreground bg-muted sm:w-32"
            >
              <Image
                src={image}
                alt={name}
                fill
                sizes="128px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            <div className="min-w-0">
              <Link href={`/products/${productId}`}>
                <h2 className="font-display text-xl font-bold hover:text-primary sm:text-2xl">{name}</h2>
              </Link>
              <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p>
            </div>

            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
              <p className="text-lg font-bold text-primary">{dinarAmount}</p>
              <div className="flex items-center gap-2">
                <FavoriteToggleButton productId={productId} />
                <FormContainer action={createOrderAction}>
                  <input type="hidden" name="productId" value={productId} />
                  <SubmitButton
                    text="اطلب الآن"
                    size="sm"
                    className="mt-0 h-9 rounded-none bg-foreground px-5 text-background hover:bg-primary hover:text-primary-foreground"
                  />
                </FormContainer>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default ProductsList;
