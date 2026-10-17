import React from 'react'
import Image from 'next/image'
import { LuQuote } from 'react-icons/lu'
import Rating from './Rating'


type ReviewInfoProps = {
  reviewInfo: {
    name: string,
    image: string,
    rating: number,
    comment: string,
  },
  children?: React.ReactNode
}

function ReviewCard({ reviewInfo, children }: ReviewInfoProps) {
  return (
    <article className='relative flex flex-col border-2 border-foreground bg-card p-6'>
      <LuQuote className='absolute end-5 top-5 h-8 w-8 text-saffron' aria-hidden />
      <Rating rating={reviewInfo.rating} />
      <p className='mt-4 flex-1 text-base leading-8'>{reviewInfo.comment}</p>
      <div className='mt-6 flex items-center gap-3 border-t-2 border-dashed border-foreground/20 pt-4'>
        <Image
          src={reviewInfo.image}
          alt={reviewInfo.name}
          width={44}
          height={44}
          className='h-11 w-11 rounded-full border-2 border-foreground object-cover'
        />
        <h3 className='font-sans text-sm font-bold'>{reviewInfo.name}</h3>
      </div>
      {children}
    </article>
  )
}

export default ReviewCard
