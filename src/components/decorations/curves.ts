/** Small cubic-Bézier helpers so leaves can be placed exactly on a drawn stem. */
export type Pt = [number, number]
export type Cubic = [Pt, Pt, Pt, Pt]

/** Point on the curve at t (0–1) plus the tangent angle in degrees. */
export function bezier([p0, p1, p2, p3]: Cubic, t: number): { x: number; y: number; angle: number } {
  const u = 1 - t
  const x = u ** 3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t ** 3 * p3[0]
  const y = u ** 3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t ** 3 * p3[1]
  const dx = 3 * u * u * (p1[0] - p0[0]) + 6 * u * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0])
  const dy = 3 * u * u * (p1[1] - p0[1]) + 6 * u * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1])
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI }
}

/** SVG path data for a chain of cubic segments (each starts where the last ended). */
export function pathFrom(segments: Cubic[]): string {
  return segments.map((s, i) => `${i === 0 ? `M${s[0]} ` : ''}C ${s[1]}, ${s[2]}, ${s[3]}`).join(' ')
}
