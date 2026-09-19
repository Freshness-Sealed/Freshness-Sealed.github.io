import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import { CornerLeaves } from '@/components/decorations/CornerLeaves'

export function Layout() {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <CornerLeaves />
      <CornerLeaves corner="right" />
      <SiteHeader />
      <main className="relative z-10 mx-auto w-full max-w-5xl flex-1 px-4 pt-12 sm:px-6 sm:pt-16">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
