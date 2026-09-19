import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <p className="font-heading text-7xl font-semibold text-forest">404</p>
      <h1 className="text-2xl font-semibold">This page wandered off.</h1>
      <p className="text-muted-foreground">Nothing grows here. Let's head back.</p>
      <Button asChild className="outlined-sm lift mt-2 border-ink bg-forest text-cream hover:bg-forest-deep">
        <Link to="/">Back home</Link>
      </Button>
    </div>
  )
}
