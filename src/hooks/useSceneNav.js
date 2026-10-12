import { useEffect, useState } from 'react'
import { scroller } from './useSmoothScroll'

const NEXT = ['ArrowDown', 'ArrowRight', 'PageDown', ' ']
const PREV = ['ArrowUp', 'ArrowLeft', 'PageUp']

const sceneTops = (ids) =>
  ids.map((id) => {
    const el = document.getElementById(id)
    return el ? el.getBoundingClientRect().top + window.scrollY : 0
  })

export function scrollToScene(id) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY
  if (scroller.lenis) {
    scroller.lenis.scrollTo(top, {
      duration: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    })
  } else {
    window.scrollTo({ top, behavior: 'auto' })
  }
}

// Keyboard scene navigation for live pitching, plus the active-scene index.
export function useSceneNav(scenes) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const ids = scenes.map((s) => s.id)

    const current = () => {
      const probe = window.scrollY + window.innerHeight * 0.5
      const tops = sceneTops(ids)
      let index = 0
      tops.forEach((top, i) => {
        if (probe >= top) index = i
      })
      return index
    }

    const onScroll = () => setActive(current())

    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const tag = e.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) return

      let target = null
      const i = current()
      if (NEXT.includes(e.key) && !e.shiftKey) target = Math.min(i + 1, ids.length - 1)
      else if (PREV.includes(e.key) || (e.key === ' ' && e.shiftKey)) target = Math.max(i - 1, 0)
      else if (e.key === 'Home') target = 0
      else if (e.key === 'End') target = ids.length - 1
      else if (/^[1-9]$/.test(e.key) && Number(e.key) <= ids.length) target = Number(e.key) - 1
      if (target === null) return

      e.preventDefault()
      scrollToScene(ids[target])
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
    }
  }, [scenes])

  return active
}
