import React from "react";
import Link from "next/link";
import { LuShoppingBag } from "react-icons/lu";
import { links } from "@/utils/links";
import { fetchCartItems } from "@/utils/api";

async function CartButton() {
  const cartItems = await fetchCartItems();

  return (
    <Link
      href={links.CART.href}
      aria-label={`سلة التسوق (${cartItems})`}
      className="relative inline-flex h-9 items-center gap-2 rounded-full border-2 border-foreground px-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
    >
      <LuShoppingBag className="h-4 w-4" />
      <span className="hidden sm:inline">السلة</span>
      <span className="grid h-5 min-w-5 place-items-center rounded-full bg-saffron px-1 text-xs font-bold text-saffron-foreground">
        {cartItems}
      </span>
    </Link>
  );
}

export default CartButton;
