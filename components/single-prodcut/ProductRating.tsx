import React from 'react'
import { FaStar } from 'react-icons/fa';

function ProductRating({ productId }: { productId: string }) {

  const rating = 4.2;
  const reviews = 42;

  return (
    <span className='mt-3 flex items-center gap-2 text-sm'>
      <span className='inline-flex items-center gap-1 bg-saffron px-2 py-0.5 font-bold text-saffron-foreground'>
        <FaStar className='h-3 w-3' />
        {rating}
      </span>
      <span className='text-muted-foreground'>({reviews} تقييمًا)</span>
    </span>
  )
}

export default ProductRating
