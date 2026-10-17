import React from 'react'
import { Skeleton } from '../ui/skeleton'

export function LoadingContainer() {
  return (
    <div className='grid grid-cols-2 gap-x-4 gap-y-10 pt-12 sm:grid-cols-3 lg:grid-cols-4'>
      <LoadingProduct/>
      <LoadingProduct/>
      <LoadingProduct/>
      <LoadingProduct/>
    </div>
  )
}

export function LoadingHero() {
  return (
    <div className='grid gap-4 pt-12'>
      <LoadingProduct/>
    </div>
  )
}




export  function LoadingProduct() {

  return (
    <div>
      <Skeleton className='aspect-[3/4] w-full rounded-none'/>
      <Skeleton className='mt-4 h-4 w-3/4'/>
      <Skeleton className='mt-3 h-4 w-1/2'/>
    </div>
  )
}
