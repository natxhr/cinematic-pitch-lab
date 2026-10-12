import { brand, opening, reveal, details, scenes } from './content'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useSceneNav, scrollToScene } from './hooks/useSceneNav'
import Opening from './scenes/Opening'
import ProductReveal from './scenes/ProductReveal'
import Details from './scenes/Details'

export default function App() {
  useSmoothScroll()
  const active = useSceneNav(scenes)

  return (
    <>
      <header className="hud">
        <span className="hud__brand">{brand}</span>
        <nav className="hud__nav" aria-label="Scenes">
          {scenes.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className="hud__dot"
              aria-current={active === i ? 'step' : undefined}
              aria-label={`${i + 1}. ${s.label}`}
              onClick={() => scrollToScene(s.id)}
            />
          ))}
          <span className="hud__count">
            {String(active + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}
          </span>
        </nav>
      </header>

      <main>
        <Opening content={opening} />
        <ProductReveal content={reveal} />
        <Details content={details} />
      </main>
    </>
  )
}
