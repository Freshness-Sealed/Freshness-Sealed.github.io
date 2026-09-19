/**
 * A single leaf in a flat, illustrated style: a lanceolate blade with no
 * outline, a midrib running from the base vertex to the tip, and a few short
 * veins branching toward the edges. `curl` bends the whole leaf — positive curls it
 * up, negative down, 0 keeps it straight — so a vine can mix all three.
 *
 * Drawn pointing right from (0,0), the base where it meets the stem.
 * 'b' mirrors it for leaves on the other side of a stem.
 */
export function Leaf({
  transform,
  fill = 'var(--leaf)',
  rib = 'var(--forest-deep)',
  size = 26,
  variant = 'a',
  curl = 0,
}: {
  transform?: string
  fill?: string
  rib?: string
  size?: number
  variant?: 'a' | 'b'
  /** -1 (curled down) … 0 (straight) … 1 (curled up) */
  curl?: number
}) {
  const s = size / 26
  const flip = variant === 'b' ? -1 : 1

  // Vertical bend that grows toward the tip, applied to every point of the leaf
  const bend = (x: number) => curl * 7 * (x / 31) ** 2
  const P = (x: number, y: number) => `${x} ${(y + bend(x)).toFixed(2)}`

  const blade =
    `M0 0 C ${P(3, -4.8)}, ${P(10, -8.2)}, ${P(17.5, -7)} C ${P(23, -6)}, ${P(27, -3)}, ${P(31, 0)} ` +
    `C ${P(27, 3)}, ${P(23, 6)}, ${P(17.5, 7)} C ${P(10, 8.2)}, ${P(3, 4.8)}, 0 0 Z`
  const midrib = `M0 0 C ${P(10, 0)}, ${P(20, 0)}, ${P(28.5, 0)}`
  // Three short veins, alternating sides, stopping well inside the blade
  const veins = [
    [8, -1], [13, 1], [18, -1],
  ].map(([x, side]) => `M${P(x, 0)} C ${P(x + 2, 1.6 * side)}, ${P(x + 3.5, 2.6 * side)}, ${P(x + 5.5, 3.2 * side)}`)

  return (
    <g transform={`${transform ?? ''} scale(${s} ${s * flip})`}>
      <path d={blade} fill={fill} />
      <g fill="none" stroke={rib} strokeLinecap="round">
        <path d={midrib} strokeWidth={1.3} />
        <g strokeWidth={0.75} opacity={0.9}>
          {veins.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </g>
    </g>
  )
}
