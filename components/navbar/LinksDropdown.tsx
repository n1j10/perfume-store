"use client"

import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserIcon from './UserIcon';
import Link from 'next/link';
import { dropDownMenuLinks } from '@/utils/links';
import { LuChevronDown } from 'react-icons/lu';
import { SignInButton, SignOutButton, SignUpButton, useAuth } from "@clerk/nextjs";

const ADMIN_HREF = '/admin/products/create';

function LinksDropdown({ isAdmin = false }: { isAdmin?: boolean }) {

  const { userId } = useAuth();
  const isSignedIn = !!userId;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type='button'
            className='flex h-9 items-center gap-1.5 rounded-full border-2 border-foreground bg-foreground pe-2.5 ps-1 text-background transition-opacity hover:opacity-90'
            aria-label="فتح قائمة الحساب"
          />
        }
      >
        <UserIcon />
        <LuChevronDown className='h-4 w-4' />
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-48' align='end' sideOffset={10}>
        {!isSignedIn ? (
          <>
            <DropdownMenuItem>
              <SignInButton mode='modal'>
                <button className='w-full text-start'>تسجيل الدخول</button>
              </SignInButton>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignUpButton mode='modal'>
                <button className='w-full text-start'>إنشاء حساب</button>
              </SignUpButton>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            {dropDownMenuLinks.map((link) => {
              if (link.href === ADMIN_HREF && !isAdmin) return null;

              return (
                <DropdownMenuItem key={link.href}>
                  <Link href={link.href} className='w-full'>
                    {link.name}
                  </Link>
                </DropdownMenuItem>
              )
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOutButton>
                <button className='w-full text-start text-destructive'>تسجيل الخروج</button>
              </SignOutButton>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinksDropdown
