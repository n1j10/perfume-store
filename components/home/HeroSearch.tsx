"use client";

import React, { useState } from 'react'
import { useSearchParams,useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { LuSearch } from 'react-icons/lu';
import { links } from '@/utils/links';

function NavSearch() {

  const searchParams = useSearchParams();   //react hook
  const [search, setSearch] = useState(
    searchParams.get('search')?.toString() || ''
  );
  const {replace} = useRouter()   //when I search will take me to product page and replace  current



  const handleSearch = useDebouncedCallback((value: string) => {  //useDebouncedCallback is fuction to delay search
    const params = new URLSearchParams(searchParams); //read from url query parametrd
  if(value){
      params.set('search', value);
  }else{
    params.delete('search');
  }
replace(`${links.PRODUCTS.href}?${params.toString()}`); //when I search will take me to product page and replace  current
},700);

  return (
    <label className='flex h-12 items-center gap-3 border-b-2 border-foreground bg-transparent px-1 focus-within:border-primary'>
      <LuSearch className='h-5 w-5 shrink-0 text-muted-foreground' />
      <input
        type='search'
        placeholder='ابحث عن عطرك المفضل...'
        aria-label='البحث عن منتج'
        className='h-full w-full bg-transparent text-base outline-none placeholder:text-muted-foreground'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
      />
    </label>
  )
}

export default NavSearch
