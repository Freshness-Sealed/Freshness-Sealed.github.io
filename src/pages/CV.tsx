import { FileTextIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { profile } from '@/content/profile'
import { asset } from '@/lib/assets'

export function CV() {
  return (
    <div className="flex flex-col items-center gap-6 pt-16 text-center sm:pt-24">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Curriculum Vitae
      </h1>

      <Button asChild className="h-auto rounded-lg border-0 bg-forest px-4 py-2.5 text-sm font-semibold text-cream shadow-none hover:bg-forest-deep">
        <a href={asset(profile.cvPdf)} target="_blank" rel="noreferrer">
          <FileTextIcon data-icon="inline-start" /> View CV
        </a>
      </Button>
    </div>
  )
}
