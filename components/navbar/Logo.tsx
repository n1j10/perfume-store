import Link from 'next/link'
import { links } from '@/utils/links'
import { cn } from '@/lib/utils'

// inverted: for dark surfaces such as the footer
function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href={links.HOME.href} className='group flex items-center gap-2.5' aria-label='عَبَق - الصفحة الرئيسية'>
      <span className={cn(
        'grid h-10 w-10 rotate-45 place-items-center border-2 bg-saffron transition-transform duration-500 group-hover:rotate-135',
        inverted ? 'border-background' : 'border-foreground'
      )}>
        <span className='-rotate-45 font-display text-lg font-bold leading-none text-saffron-foreground'>ع</span>
      </span>
      <span className='flex flex-col leading-none'>
        <span className='font-display text-2xl font-bold tracking-tight'>عَبَق</span>
        <span className={cn('mt-1 text-[0.65rem]', inverted ? 'text-background/60' : 'text-muted-foreground')}>
          عطور · بخور · دهن عود
        </span>
      </span>
    </Link>
  )
}

export default Logo
