/**
 * Oranges resting on the bottom edge of the nav bar, drawn in the same flat
 * style as the logo, heaped loosely: mixed sizes, slight overlaps, stems pointing
 * every which way, and one that has rolled off. Shown from `lg` like the others.
 */
function Orange({
  x,
  y,
  r = 9,
  leaf = true,
  tilt = 0,
}: {
  x: number
  y: number
  r?: number
  leaf?: boolean
  /** Degrees to rotate the whole fruit, so stems point in different directions */
  tilt?: number
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${tilt})`}>
      <circle r={r} fill="#f0913a" />
      <circle cx={-r * 0.38} cy={-r * 0.38} r={r * 0.2} fill="#fbc98a" />
      {leaf && (
        <>
          <path d={`M0 ${-r + 1} V ${-r - 2}`} stroke="var(--forest-deep)" strokeWidth={1.8} strokeLinecap="round" />
          {/* leaf springs from where the stem meets the fruit, like the logo */}
          <path
            d={`M0.5 ${-r + 0.5} c1.2-3 4.8-3.4 6.8-2 -1 2.9-4 3.8-6.8 2z`}
            fill="var(--forest)"
          />
        </>
      )}
    </g>
  )
}

/** The drawing by itself, for use in the page flow. `scale` multiplies its natural 76×40 size. */
export function OrangePileArt({ scale = 1, className = '' }: { scale?: number; className?: string }) {
  return (
    <svg
      width={76 * scale}
      height={40 * scale}
      viewBox="0 0 76 40"
      className={`overflow-visible ${className}`}
      aria-hidden
    >
      {/* the one nestled on top goes first so the front row overlaps it */}
      <Orange x={24} y={15} r={8} tilt={-28} />
      {/* front row: mixed sizes, stems leaning different ways */}
      <Orange x={12} y={31} r={8.5} tilt={-38} />
      <Orange x={30} y={30} r={9.5} tilt={32} />
      <Orange x={47} y={31} r={9} tilt={-18} />
      {/* one that rolled away, lying on its side */}
      <Orange x={67} y={32} r={7.5} tilt={100} />
    </svg>
  )
}

/** The pile pinned to the bottom edge of the nav bar (absolute; shown from `lg`). */
export function OrangePile({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute bottom-0 left-[calc(36%+342px)] hidden select-none lg:block ${className}`}
    >
      <OrangePileArt />
    </div>
  )
}
