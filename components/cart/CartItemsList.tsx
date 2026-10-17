'use client';

import { FirstColumn, SecondColumn, FourthColumn } from './CartItemColumns';
import ThirdColumn from './ThirdColumn';
import { CartItemWithProduct } from '@/utils/type';



function CartItemsList({ cartItems }: { cartItems: CartItemWithProduct[] }) {
  return (
    <div className='divide-y-2 divide-foreground/15 border-y-2 border-foreground'>
      {cartItems.map((cartItem) => {
        const { id, amount } = cartItem;
        const { image, name, price, id: productId, description } = cartItem.product;

        return (
          <div
            key={id}
            className='grid grid-cols-[auto_1fr] gap-x-5 gap-y-4 py-6 md:grid-cols-[auto_1fr_auto_auto] md:items-center'
          >
            <FirstColumn image={image} name={name} />
            <SecondColumn name={name} description={description} productId={productId} />
            <ThirdColumn id={id} quantity={amount} />
            <FourthColumn price={price} />
          </div>
        );
      })}
    </div>
  );
}
export default CartItemsList;
