"use client"

import { adminLinks } from '@/utils/links'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function SidebarComponent() {
const  path_url = usePathname();
  return (
    <aside className='no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:gap-0 lg:divide-y-2 lg:divide-foreground lg:border-2 lg:border-foreground'>
      {
        adminLinks.map(function (value) {
          const active_page = value.href === path_url;
          return (
            <Link
              key={value.href}
              href={value.href}
              className={cn(
                'shrink-0 border-2 border-foreground px-4 py-2.5 text-sm font-medium transition-colors lg:border-0 lg:py-3.5',
                active_page ? 'bg-foreground text-background' : 'hover:bg-secondary'
              )}
            >
              {value.name}
            </Link>
          )
        })
      }

    </aside>
  )
}

export default SidebarComponent
