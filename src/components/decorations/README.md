# Decorations

Small artistic touches that live *around* the content rather than in it.

| Component        | Where it appears                              |
|------------------|-----------------------------------------------|
| `HangingVine`    | Vine hanging from the top edge (kept on file; not currently placed) |
| `CornerLeaves`   | Faint leaf cluster fixed to the bottom-left   |
| `WalkingWug`     | Outline wug that paces in place (kept on file; not currently placed) |
| `OrangePileArt`  | Heap of oranges, used below the bio on the home page |
| `Leaf`           | Building block used by both                   |

## The pattern

Every decoration follows the same three rules:

1. **Positioned out of flow** – `absolute` (relative to the nav) or `fixed`
   (relative to the viewport) so it never pushes real content around.
2. **`pointer-events-none`** – clicks pass straight through to whatever is
   underneath, so a leaf hanging over a nav link never blocks it.
3. **`aria-hidden`** – screen readers skip it.

## Using your own artwork

Draw in Procreate / Illustrator / Inkscape, export as **SVG** (crisp at any
size) or PNG with a transparent background, drop the file in `/public`, and
replace the inline `<svg>` with:

```tsx
<img src="/my-vine.svg" alt="" className="h-28 w-auto" />
```

Keep the wrapper `<div>` and its classes. Nudge position with Tailwind's
`top-* / right-* / bottom-*` utilities.

## Motion

The `sway` utility (defined in `src/index.css`) gently rocks an element
around its top edge. Add it to anything that should look like it is hanging.
It automatically switches off for people who prefer reduced motion.
