"use client"

import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

function DarkMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label={isDark ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'}
      title={isDark ? 'الوضع النهاري' : 'الوضع الليلي'}
      disabled={!mounted}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className='relative grid h-9 w-9 place-items-center rounded-full border-2 border-foreground transition-colors hover:bg-foreground hover:text-background disabled:opacity-50'
    >
      <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  )
}

export default DarkMode
