/**
 * A wug (Berko Gleason, 1958) walking in place. Outline only, no fill, so it
 * sits on any background. Stands on the bottom edge of the nav bar just right
 * of the vine (offset from the vine's `left-[36%]` so the gap is constant); shown from the `lg` breakpoint like the other header decorations.
 *
 * Motion (defined in src/index.css): the body bobs gently while the two legs
 * swing in opposite phase from the hip. Switches off under reduced motion.
 */
export function WalkingWug({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute bottom-0 left-[calc(36%+146px)] hidden select-none lg:block ${className}`}
    >
      <svg width="52" height="56" viewBox="0 0 60 64" className="overflow-visible" fill="none" stroke="var(--ink)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        {/* Body + head, one continuous outline with the beak at top-right */}
        <g className="wug-body">
          <path d="M52 13 C46 14 44 18 44 24 C44 32 50 40 40 48 C32 54 16 54 8 48 L5 50 C10 44 10 30 12 22 C14 10 26 4 36 5 C44 6 50 9 52 13 Z" />
          <circle cx="38" cy="16" r="2.2" fill="var(--ink)" stroke="none" />
        </g>
        {/* Legs: each rotates around its hip point (the top of the leg) */}
        <g className="wug-leg-a" style={{ transformOrigin: '24px 52px' }}>
          <path d="M24 52 V60 H31" />
        </g>
        <g className="wug-leg-b" style={{ transformOrigin: '32px 52px' }}>
          <path d="M32 52 V60 H39" />
        </g>
      </svg>
    </div>
  )
}
