import { Leaf } from './Leaf'
import { bezier, pathFrom, type Cubic } from './curves'

/**
 * A cluster of leafy stems growing in from the edge of the viewport — from the
 * bottom-left corner by default, or trailing down from the right edge just below
 * the nav bar. It sits behind all content (z-0), fully opaque on wide screens
 * where there is gutter room for it, and faded to 15% on narrower ones where
 * it would run underneath the text. It rocks gently from where it is rooted.
 *
 * Each stem is a chain of Bézier curves that twists as it climbs; leaves are
 * placed *on* the curve with their base at the stem, angled off its tangent,
 * alternating sides. A leaf caps every tip.
 *
 * To use your own artwork: replace the <svg> with an <img src="/leaves.png" />
 * and keep the wrapper classes. Change `opacity-*` to taste.
 */

type Leaflet = { seg: number; t: number; size: number; curl: number }
type Stem = { segments: Cubic[]; leaves: Leaflet[]; tipCurl: number }

const bottomLeft: Stem[] = [
  {
    // enters from the bottom-left corner, winding up and to the right
    segments: [
      [[-14, 298], [34, 252], [4, 214], [48, 190]],
      [[48, 190], [92, 166], [92, 152], [150, 125]],
    ],
    leaves: [
      { seg: 0, t: 0.3, size: 36, curl: 0.5 }, { seg: 0, t: 0.62, size: 38, curl: -0.4 },
      { seg: 1, t: 0.15, size: 38, curl: 0 }, { seg: 1, t: 0.5, size: 36, curl: 0.7 }, { seg: 1, t: 0.8, size: 32, curl: -0.3 },
    ],
    tipCurl: 0.4,
  },
  {
    // enters from the left edge (crossing the corner stem), meandering right
    segments: [
      [[-14, 262], [46, 258], [96, 250], [118, 226]],
      [[118, 226], [132, 200], [196, 218], [240, 190]],
    ],
    leaves: [
      { seg: 0, t: 0.35, size: 36, curl: -0.6 }, { seg: 0, t: 0.72, size: 36, curl: 0.3 },
      { seg: 1, t: 0.3, size: 36, curl: -0.2 }, { seg: 1, t: 0.66, size: 33, curl: 0.6 },
    ],
    tipCurl: -0.4,
  },
  {
    // enters from the left edge, curling upward
    segments: [
      [[-16, 238], [32, 226], [52, 202], [44, 166]],
      [[44, 166], [36, 130], [78, 122], [70, 90]],
    ],
    leaves: [
      { seg: 0, t: 0.34, size: 36, curl: 0.4 }, { seg: 0, t: 0.7, size: 36, curl: -0.7 },
      { seg: 1, t: 0.3, size: 34, curl: 0.1 }, { seg: 1, t: 0.66, size: 32, curl: -0.5 },
    ],
    tipCurl: 0.3,
  },
]

/**
 * All three stems start past the right edge of the box and fan out the way the
 * bottom-left cluster does: one on the diagonal, one reaching mostly across,
 * one dropping mostly down.
 */
const rightEdge: Stem[] = [
  {
    // the diagonal: enters highest, runs nearly level, then bends down to the bottom-left
    segments: [
      [[356, 29], [317, 24], [292, 58], [267, 88]],
      [[267, 88], [242, 118], [220, 153], [178, 181]],
    ],
    leaves: [
      { seg: 0, t: 0.3, size: 29, curl: 0.5 }, { seg: 0, t: 0.64, size: 31, curl: -0.4 },
      { seg: 1, t: 0.2, size: 29, curl: 0 }, { seg: 1, t: 0.56, size: 28, curl: 0.6 },
    ],
    tipCurl: 0.4,
  },
  {
    // reaching across: enters low, climbs steeply to cross the diagonal ~40% along, then runs left
    segments: [
      [[356, 90], [323, 96], [292, 77], [269, 60]],
      [[269, 60], [244, 43], [219, 48], [172, 39]],
    ],
    leaves: [
      { seg: 0, t: 0.34, size: 28, curl: -0.6 }, { seg: 0, t: 0.7, size: 28, curl: 0.3 },
      { seg: 1, t: 0.3, size: 28, curl: -0.2 }, { seg: 1, t: 0.66, size: 25, curl: 0.5 },
    ],
    tipCurl: -0.4,
  },
  {
    // dropping down along the edge, bowing out then back
    segments: [
      [[356, 60], [335, 85], [327, 113], [317, 136]],
      [[317, 136], [305, 161], [323, 183], [303, 213]],
    ],
    leaves: [
      { seg: 0, t: 0.36, size: 29, curl: 0.4 }, { seg: 0, t: 0.74, size: 29, curl: -0.7 },
      { seg: 1, t: 0.3, size: 28, curl: 0.1 }, { seg: 1, t: 0.66, size: 25, curl: -0.5 },
    ],
    tipCurl: 0.3,
  },
]

const W = 340
const H = 290

export function CornerLeaves({ corner = 'bottom-left' }: { corner?: 'bottom-left' | 'right' }) {
  const right = corner === 'right'
  const stems = right ? rightEdge : bottomLeft
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed z-0 select-none opacity-15 xl:opacity-100 ${right ? 'top-24 right-0' : 'bottom-0 left-0'}`}
    >
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        className="sway-rooted"
        style={{ transformOrigin: right ? 'top right' : 'bottom left' }}
      >
        <g>
        <g fill="none" stroke="var(--forest)" strokeWidth={3} strokeLinecap="round">
          {stems.map(({ segments }, i) => (
            <path key={i} d={pathFrom(segments)} />
          ))}
        </g>
        {stems.flatMap(({ segments, leaves, tipCurl }, si) => {
          const placed = leaves.map(({ seg, t, size, curl }, li) => {
            const { x, y, angle } = bezier(segments[seg], t)
            const side = li % 2 === 0 ? -1 : 1 // alternate left/right of the stem
            return (
              <Leaf
                key={`${si}-${li}`}
                transform={`translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(angle + side * 48).toFixed(1)})`}
                size={size}
                variant={side < 0 ? 'a' : 'b'}
                curl={curl}
              />
            )
          })
          const end = bezier(segments[segments.length - 1], 1)
          placed.push(
            <Leaf key={`${si}-tip`} transform={`translate(${end.x.toFixed(1)},${end.y.toFixed(1)}) rotate(${end.angle.toFixed(1)})`} size={right ? 28 : 34} curl={tipCurl} />,
          )
          return placed
        })}
        </g>
      </svg>
    </div>
  )
}
