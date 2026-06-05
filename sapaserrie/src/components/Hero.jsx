import { Suspense, lazy, useRef, useState, useEffect } from 'react'
import styles from './Hero.module.css'

// Chargement lazy : Three.js ne s'initialise qu'à l'intersection
const HeroScene = lazy(() => import('./HeroScene'))

const WEBGL_TIMEOUT_MS = 4000

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    )
  } catch {
    return false
  }
}

export default function Hero() {
  const sectionRef = useRef(null)
  const [show3D, setShow3D] = useState(false)
  const [useFallback, setUseFallback] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)

  // Démarrage lazy : seulement quand la section entre dans le viewport
  useEffect(() => {
    if (!supportsWebGL()) {
      setUseFallback(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow3D(true)
          observer.disconnect()
        }
      },
      { threshold: 0.01 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Fallback si la scène met trop longtemps à charger
  useEffect(() => {
    if (!show3D) return
    const timer = setTimeout(() => {
      if (!sceneReady) setUseFallback(true)
    }, WEBGL_TIMEOUT_MS)
    return () => clearTimeout(timer)
  }, [show3D, sceneReady])

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* Contenu textuel — rendu immédiatement, jamais bloqué par le 3D */}
      <div className={styles.content}>
        <p className={styles.eyebrow}>Artisanat d'exception</p>
        <h1 className={styles.title}>
          La nature,<br />
          <em>sublimée à la main.</em>
        </h1>
        <p className={styles.subtitle}>
          Chaque pièce Sapaserrie est un objet unique, né d'un dialogue
          entre la matière brute et le geste maîtrisé.
        </p>
        <a href="#collections" className={styles.cta}>
          Découvrir les collections
          <span className={styles.arrow}>→</span>
        </a>
      </div>

      {/* Zone 3D — rendue séparément, sans bloquer le FCP */}
      <div className={styles.canvas} aria-hidden="true">
        {useFallback ? (
          <HeroFallback />
        ) : show3D ? (
          <Suspense fallback={<HeroFallback />}>
            <HeroScene onReady={() => setSceneReady(true)} />
          </Suspense>
        ) : (
          <HeroFallback />
        )}
      </div>

      <div className={styles.scroll}>
        <span />
      </div>
    </section>
  )
}

function HeroFallback() {
  return (
    <div className={styles.fallback}>
      <div className={styles.fallbackShape} />
    </div>
  )
}
