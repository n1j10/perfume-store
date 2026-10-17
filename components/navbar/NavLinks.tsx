"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/utils/links'
import { cn } from '@/lib/utils'

function NavLinks() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="القائمة الرئيسية"
      className='no-scrollbar col-span-2 -mx-1 flex items-center gap-1 overflow-x-auto md:col-span-1 md:mx-0 md:justify-center md:gap-6'
    >
      {navLinks.map((link) => {
        const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'relative shrink-0 px-3 py-1.5 text-sm font-medium transition-colors md:px-1',
              'after:absolute after:inset-x-1 after:-bottom-0.5 after:h-0.5 after:origin-center after:scale-x-0 after:bg-saffron after:transition-transform md:after:inset-x-0',
              'hover:text-primary hover:after:scale-x-100',
              isActive && 'text-primary after:scale-x-100'
            )}
          >
            {link.name}
          </Link>
        )
      })}
    </nav>
  )
}

export default NavLinks
