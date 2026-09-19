import { useEffect, useState } from 'react'

/**
 * Returns true while the user is scrolling down (past `topOffset`), false as
 * soon as they scroll up a little. Used to tuck the nav bar away on phones.
 */
export function useHideOnScroll({ threshold = 8, topOffset = 64 } = {}) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const delta = y - lastY
        if (y <= topOffset) {
          setHidden(false)
        } else if (Math.abs(delta) > threshold) {
          setHidden(delta > 0)
        }
        lastY = y
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold, topOffset])

  return hidden
}
