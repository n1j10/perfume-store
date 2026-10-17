import React from 'react'
import Container from '../global/Container'
import Logo from './Logo'
import CartButton from './CartButton'
import DarkMode from './DarkMode'
import LinksDropdown from './LinksDropdown'
import NavLinks from './NavLinks'
import { auth } from '@clerk/nextjs/server'
import { LuTruck } from 'react-icons/lu'

async function Navbar() {
  const { userId } = await auth();
  const isAdmin = userId === process.env.ADMIN_USER_ID;

  return (
    <header className='sticky top-0 z-40'>
      <div className='bg-primary text-primary-foreground'>
        <Container className='flex items-center justify-center gap-2 py-1.5 text-xs font-medium'>
          <LuTruck className='h-3.5 w-3.5' />
          توصيل سريع لجميع محافظات العراق — الدفع الآمن عبر كي كارد
        </Container>
      </div>

      <div className='border-b-2 border-foreground/90 bg-background/95 backdrop-blur'>
        <Container className='grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 py-3 md:grid-cols-[auto_1fr_auto]'>
          <Logo />

          <div className='flex items-center justify-end gap-2 md:order-3'>
            <CartButton />
            <DarkMode />
            <LinksDropdown isAdmin={isAdmin} />
          </div>

          <NavLinks />
        </Container>
      </div>
    </header>
  )
}

export default Navbar
