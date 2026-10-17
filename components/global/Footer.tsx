import Link from 'next/link'
import Container from './Container'
import Logo from '../navbar/Logo'
import { navLinks } from '@/utils/links'

const helpLinks = [
  { href: '/about', name: 'من نحن' },
  { href: '/reviews', name: 'آراء العملاء' },
  { href: '/cart', name: 'سلة التسوق' },
];

function Footer() {
  return (
    <footer className='mt-auto border-t-2 border-foreground/90 bg-foreground text-background'>
      <Container className='grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4'>
        <div className='lg:col-span-2'>
          <Logo inverted />
          <p className='mt-5 max-w-md text-sm leading-7 text-background/70'>
            عَبَق متجر عراقي للعطور الأصيلة، نختار لكم أجود أنواع دهن العود والبخور والعطور الرجالية والنسائية بعناية، ونوصلها إلى باب بيتكم.
          </p>
        </div>

        <div>
          <h3 className='mb-4 text-sm font-semibold text-saffron'>تسوّق</h3>
          <ul className='space-y-2.5 text-sm text-background/75'>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className='transition-colors hover:text-saffron'>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className='mb-4 text-sm font-semibold text-saffron'>المساعدة</h3>
          <ul className='space-y-2.5 text-sm text-background/75'>
            {helpLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className='transition-colors hover:text-saffron'>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className='border-t border-background/15'>
        <Container className='flex flex-col items-center justify-between gap-2 py-4 text-xs text-background/60 sm:flex-row'>
          <p>© {new Date().getFullYear()} عَبَق. جميع الحقوق محفوظة.</p>
          <p>صُنع بحب في العراق</p>
        </Container>
      </div>
    </footer>
  )
}

export default Footer
