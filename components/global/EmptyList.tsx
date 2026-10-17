import { cn } from '@/lib/utils'
import React from 'react'
import { LuPackageOpen } from 'react-icons/lu'


type EmptyListProps ={
  title:string,
  description?: string,
  className?:string,
  children?: React.ReactNode
}


function EmptyList({title,description,className,children}:EmptyListProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 border-2 border-dashed border-foreground/20 px-6 py-16 text-center', className)}>
      <span className='grid h-14 w-14 place-items-center rounded-full bg-secondary text-primary'>
        <LuPackageOpen className='h-7 w-7' />
      </span>
      <h2 className='font-display text-xl font-bold'>{title}</h2>
      {description && <p className='max-w-sm text-sm text-muted-foreground'>{description}</p>}
      {children}
    </div>
  )
}

export default EmptyList
