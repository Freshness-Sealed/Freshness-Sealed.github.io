import { MailIcon } from 'lucide-react'
import { OrangePileArt } from '@/components/decorations/OrangePile'
import { profile } from '@/content/profile'
import { asset } from '@/lib/assets'

export function About() {
  return (
    <div className="flex flex-col items-center gap-14">
      {/* Hero: photo, then email, then tagline — all centred */}
      <section className="flex flex-col items-center text-center">
        {/* Visually hidden page heading so the document still has an h1 for screen readers and SEO */}
        <h1 className="sr-only">{profile.shortName}</h1>

        <div className="relative">
          <img
            src={asset(profile.photo)}
            alt={`Portrait of ${profile.name}`}
            className="aspect-square w-40 rounded-full bg-paper object-cover sm:w-48 md:w-56"
          />
        </div>

        <a
          href={`mailto:${profile.email}`}
          className="mt-5 inline-flex items-center gap-2 text-lg font-semibold break-all text-forest hover:underline"
        >
          <MailIcon className="size-5" /> {profile.email}
        </a>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">{profile.tagline}</p>
      </section>

      {/* Bio: the block is centred on the page; paragraphs stay left-aligned inside it */}
      <section className="w-full max-w-3xl">
        <h2 className="mb-4 text-center text-3xl font-semibold">About Me</h2>
        <div className="space-y-4 text-[17px] leading-relaxed">
          {profile.bio.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* A little pile of oranges to close the page */}
      <OrangePileArt scale={1.6} />
    </div>
  )
}
