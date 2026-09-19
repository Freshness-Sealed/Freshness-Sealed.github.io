import { useRef, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { profile } from '@/content/profile'
import { useHideOnScroll } from '@/hooks/useHideOnScroll'
import { navItems } from './nav'

function navClass(isActive: boolean) {
  return cn(
    'rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors',
    isActive ? 'bg-forest text-cream' : 'text-ink hover:bg-moss',
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const scrolledDown = useHideOnScroll()
  // On phones, slide the bar out of the way while scrolling down and bring it
  // back on the first upward nudge. Desktop keeps it pinned. Never hide it
  // while the menu is open.
  const hidden = scrolledDown && !open

  return (
    <header
      className={cn(
        'sticky top-0 z-[60] transition-transform duration-300 ease-out',
        hidden && 'max-md:-translate-y-full',
      )}
    >
      <div className="dotted relative">
        <div className="relative mx-auto flex h-[4.5rem] max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="group flex items-center gap-3">
            <span className="grid size-11 place-items-center transition-transform group-hover:-rotate-6">
              <LogoOrange />
            </span>
            <span className="font-heading text-[1.75rem] font-semibold leading-none">
              {profile.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => navClass(isActive)}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile nav: a single persistent toggle that morphs hamburger ⇄ X. The header sits
              above the panel and its overlay so the same button opens and closes the menu. */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="pointer-events-auto grid size-11 place-items-center rounded-lg transition-colors hover:bg-moss md:hidden"
          >
            <MenuToggleIcon open={open} />
          </button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent
              id="mobile-menu"
              side="right"
              showCloseButton={false}
              className="border-0! bg-cream shadow-none"
              // The toggle lives outside the sheet; don't treat a tap on it as an "outside"
              // click, or the menu would close and immediately reopen.
              onPointerDownOutside={(e) => {
                if (toggleRef.current?.contains(e.target as Node)) e.preventDefault()
              }}
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="flex flex-col items-start gap-1 px-4 pt-20" aria-label="Mobile">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => cn(navClass(isActive), 'py-2.5 text-base')}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  )
}

/**
 * Three bars that fold into an X (and back) when `open` flips. Only transforms
 * and opacity are animated (compositor-friendly, no layout work), and the
 * motion is dropped entirely for people who prefer reduced motion.
 */
function MenuToggleIcon({ open }: { open: boolean }) {
  const bar = cn(
    'absolute top-1/2 left-0 h-[2.5px] w-full -translate-y-1/2 rounded-full bg-ink',
    'transition-[translate,rotate,scale,opacity] duration-300 ease-in-out motion-reduce:transition-none',
  )
  return (
    <span aria-hidden className="relative block h-[18px] w-[26px]">
      <span className={cn(bar, open ? 'rotate-45' : '-translate-y-[calc(50%+8px)]')} />
      <span className={cn(bar, open && 'scale-x-0 opacity-0')} />
      <span className={cn(bar, open ? '-rotate-45' : '-translate-y-[calc(50%-8px)]')} />
    </span>
  )
}

/** A little orange with a leaf. Swap the paths here to change the logo. */
function LogoOrange() {
  return (
    <svg width="38" height="38" viewBox="0 0 32 32" aria-hidden>
      {/* fruit */}
      <circle cx="16" cy="18" r="12" fill="#f0913a" />
      {/* highlight */}
      <circle cx="11.5" cy="13.5" r="2.4" fill="#fbc98a" />
      {/* stem */}
      <path d="M16 7V4" stroke="var(--forest-deep)" strokeWidth="2.2" strokeLinecap="round" />
      {/* leaf */}
      <path d="M16.5 6.5c1.5-3.8 6-4.3 8.5-2.5-1.2 3.6-5 4.8-8.5 2.5z" fill="var(--forest)" />
    </svg>
  )
}
