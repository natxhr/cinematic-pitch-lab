import { useLayoutEffect, useRef } from 'react'
import { gsap, MOTION_OK } from '../hooks/motion'

export default function ProductReveal({ content }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(
      MOTION_OK,
      () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom bottom',
            pin: '.reveal__stage',
            pinSpacing: false,
            scrub: 1,
          },
        })

        // Product: distant and tilted -> centred and level -> close and offset.
        tl.fromTo(
          '.reveal__product',
          { scale: 0.45, rotation: -8, xPercent: -18, yPercent: 14, autoAlpha: 0.2 },
          { scale: 1, rotation: 0, xPercent: 0, yPercent: 0, autoAlpha: 1, duration: 1 },
        )
          .to('.reveal__product', { scale: 1.3, rotation: 3, xPercent: 12, yPercent: -4, duration: 1 })
          .fromTo('.reveal__horizon', { scaleX: 0 }, { scaleX: 1, duration: 1.2 }, 0)

        // Captions cross-fade across the pinned scroll distance.
        const captions = gsap.utils.toArray('.reveal__caption')
        captions.forEach((el, i) => {
          const at = 0.2 + i * 0.7
          tl.fromTo(el, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.25 }, at)
          if (i < captions.length - 1) tl.to(el, { autoAlpha: 0, y: -24, duration: 0.25 }, at + 0.4)
        })
      },
      root,
    )
    return () => mm.revert()
  }, [])

  return (
    <section id="reveal" className="scene reveal" ref={root} aria-label="Product reveal">
      <div className="reveal__stage">
        <div className="reveal__horizon" aria-hidden="true" />
        <img
          className="reveal__product"
          src={content.image}
          alt={content.imageAlt}
          width="1200"
          height="520"
          draggable="false"
        />
        <ul className="reveal__captions">
          {content.captions.map((c) => (
            <li className="reveal__caption" key={c.kicker}>
              <span className="eyebrow">{c.kicker}</span>
              <p>{c.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
