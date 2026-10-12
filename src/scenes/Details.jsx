import { useLayoutEffect, useRef } from 'react'
import { gsap, MOTION_OK } from '../hooks/motion'

export default function Details({ content }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(
      MOTION_OK,
      () => {
        // Dark -> light transition as the scene rises into view.
        gsap.fromTo(
          root.current,
          { '--scene-bg': '#07090b', '--scene-fg': '#e8eaec' },
          {
            '--scene-bg': '#eceae5',
            '--scene-fg': '#111417',
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 25%', scrub: true },
          },
        )

        gsap
          .timeline({
            defaults: { ease: 'expo.out', duration: 1.4 },
            scrollTrigger: { trigger: root.current, start: 'top 45%' },
          })
          .from('.details__headline', { y: 60, autoAlpha: 0 })
          .from('.details__feature', { y: 40, autoAlpha: 0, stagger: 0.12 }, '-=1.1')
      },
      root,
    )
    return () => mm.revert()
  }, [])

  return (
    <section id="details" className="scene details" ref={root} aria-label="Product details">
      <div className="details__inner">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 className="details__headline">{content.headline}</h2>
        <ul className="details__features">
          {content.features.map((f, i) => (
            <li className="details__feature" key={f.title}>
              <span className="eyebrow">{String(i + 1).padStart(2, '0')}</span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
