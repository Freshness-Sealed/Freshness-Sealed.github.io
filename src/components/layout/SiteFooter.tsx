import { profile } from '@/content/profile'

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-20">
      <div className="mx-auto max-w-5xl px-4 py-8 text-center text-sm text-muted-foreground sm:px-6">
        <p>© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  )
}
