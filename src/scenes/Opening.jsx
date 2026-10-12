import { useLayoutEffect, useRef } from 'react'
import { gsap, MOTION_OK } from '../hooks/motion'

export default function Opening({ content }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(
      MOTION_OK,
      () => {
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .from('.opening__line span', { yPercent: 110, duration: 1.6, stagger: 0.12 })
          .from('.opening__meta', { autoAlpha: 0, y: 12, duration: 1.2, stagger: 0.1 }, '-=1.1')

        // Type drifts up and fades as the next scene approaches.
        gsap.to('.opening__inner', {
          yPercent: -18,
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to('.opening__glow', {
          scale: 1.25,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      },
      root,
    )
    return () => mm.revert()
  }, [])

  return (
    <section id="opening" className="scene opening" ref={root} aria-label="Opening">
      <div className="opening__glow" aria-hidden="true" />
      <div className="opening__inner">
        <p className="eyebrow opening__meta">{content.eyebrow}</p>
        <h1 className="opening__title">
          {content.lines.map((line) => (
            <span className="opening__line" key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h1>
        <p className="opening__sub opening__meta">{content.sub}</p>
      </div>
      <p className="opening__cue opening__meta">{content.cue}</p>
    </section>
  )
}
