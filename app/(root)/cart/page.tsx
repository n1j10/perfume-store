import Link from "next/link";
import CartItemsList from "@/components/cart/CartItemsList";
import CartTotals from "@/components/cart/CartTotals";
import SectionTitle from "@/components/global/SectionTitle";
import EmptyList from "@/components/global/EmptyList";
import { fetchCart } from "@/utils/api";

async function CartPage() {
  const cart = await fetchCart();

  if (cart.cartItems.length === 0)
    return (
      <EmptyList title="سلة التسوق فارغة" description="لم تُضف أي منتج بعد، تصفّح المتجر واختر عطرك.">
        <Link
          href="/products"
          className="mt-2 inline-flex h-10 items-center bg-foreground px-5 text-sm font-semibold text-background"
        >
          تصفّح المتجر
        </Link>
      </EmptyList>
    );

  return (
    <>
      <SectionTitle eyebrow={`${cart.numItemsInCart} منتج في السلة`} text="سلة التسوق" />

      <div className="grid items-start gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList cartItems={cart.cartItems} />
        </div>

        <div className="lg:sticky lg:top-40 lg:col-span-4">
          <CartTotals cart={cart} />
        </div>
      </div>
    </>
  );
}
export default CartPage;
