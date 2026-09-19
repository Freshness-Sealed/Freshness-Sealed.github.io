import { Leaf } from './Leaf'
import { bezier, pathFrom, type Cubic } from './curves'

/**
 * Two leafy sprigs draping from the top of the nav bar. Each stem is a chain of
 * Bézier curves that twists in loose S-bends; every leaflet is placed *on* the
 * curve with its base vertex at the stem, angled off the stem's tangent and
 * alternating sides. Sizes and curls vary so nothing looks stamped.
 *
 * HOW TO SWAP IN YOUR OWN ART
 * ---------------------------
 * 1. Export your drawing as an SVG (or PNG) into /public, e.g. /public/vine.svg
 * 2. Replace the <svg> below with:
 *      <img src="/vine.svg" alt="" className="h-24 w-auto" />
 * 3. Keep the wrapper: `absolute`, `pointer-events-none`, and `aria-hidden`
 *    ensure it never blocks clicks and is ignored by screen readers.
 * Adjust `right-*` / `top-*` classes to move it around. It hangs from the very top
 * of the header, just to the left of the nav links, and spills a little past
 * the bar's bottom edge. Shown from the `lg` breakpoint.
 */

type Leaflet = { seg: number; t: number; size: number; spread: number; curl: number }
type Stem = { segments: Cubic[]; leaves: Leaflet[]; tip: { size: number; curl: number } }

const stems: Stem[] = [
  {
    segments: [
      // stems begin above the viewport so swaying never opens a gap at the top edge
      [[27, -14], [41, 16], [16, 34], [27, 52]],
      [[27, 52], [38, 68], [18, 82], [30, 98]],
    ],
    // spaced so neighbouring leaves clear each other
    leaves: [
      { seg: 0, t: 0.24, size: 22, spread: 48, curl: 0.6 },
      { seg: 0, t: 0.62, size: 23, spread: 46, curl: -0.5 },
      { seg: 1, t: 0.02, size: 23, spread: 50, curl: 0 },
      { seg: 1, t: 0.4, size: 22, spread: 46, curl: 0.8 },
      { seg: 1, t: 0.76, size: 20, spread: 50, curl: -0.6 },
    ],
    tip: { size: 20, curl: 0.4 },
  },
  {
    segments: [
      [[93, -14], [104, 12], [86, 28], [96, 44]],
      [[96, 44], [102, 54], [90, 60], [95, 68]],
    ],
    leaves: [
      { seg: 0, t: 0.24, size: 20, spread: 48, curl: -0.6 },
      { seg: 0, t: 0.66, size: 21, spread: 46, curl: 0.7 },
      { seg: 1, t: 0.12, size: 21, spread: 50, curl: 0.1 },
      { seg: 1, t: 0.62, size: 19, spread: 46, curl: -0.7 },
    ],
    tip: { size: 18, curl: -0.4 },
  },
]

export function HangingVine({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute top-0 right-44 hidden select-none lg:block ${className}`}
    >
      <svg width="150" height="125" viewBox="0 0 150 125" className="sway overflow-visible">
        <g fill="none" stroke="var(--forest)" strokeWidth={1.8} strokeLinecap="round">
          {stems.map(({ segments }, i) => (
            <path key={i} d={pathFrom(segments)} />
          ))}
        </g>

        {stems.flatMap(({ segments, leaves, tip }, si) => {
          const placed = leaves.map(({ seg, t, size, spread, curl }, li) => {
            const { x, y, angle } = bezier(segments[seg], t)
            const side = li % 2 === 0 ? -1 : 1 // alternate sides down the stem
            return (
              <Leaf
                key={`${si}-${li}`}
                transform={`translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(angle + side * spread).toFixed(1)})`}
                size={size}
                variant={side < 0 ? 'a' : 'b'}
                curl={curl}
              />
            )
          })
          const end = bezier(segments[segments.length - 1], 1)
          placed.push(
            <Leaf
              key={`${si}-tip`}
              transform={`translate(${end.x.toFixed(1)},${end.y.toFixed(1)}) rotate(${end.angle.toFixed(1)})`}
              size={tip.size}
              curl={tip.curl}
            />,
          )
          return placed
        })}
      </svg>
    </div>
  )
}
