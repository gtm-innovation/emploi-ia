import { Suspense, lazy, useRef, useState, useEffect } from 'react'
import styles from './Hero.module.css'

const HeroScene = lazy(() => import('./HeroScene'))

function supportsWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch { return false }
}

export default function Hero() {
  const sectionRef = useRef(null)
  const [show3D, setShow3D] = useState(false)
  const [useFallback, setUseFallback] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)

  useEffect(() => {
    if (!supportsWebGL()) { setUseFallback(true); return }
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShow3D(true); observer.disconnect() }
    }, { threshold: 0.01 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!show3D) return
    const t = setTimeout(() => { if (!sceneReady) setUseFallback(true) }, 4000)
    return () => clearTimeout(t)
  }, [show3D, sceneReady])

  return (
    <header className={styles.hero} id="top" ref={sectionRef}>
      <div className={styles.grid}>
        <div className={styles.head}>
          <div className={styles.logo}>
            <span className={styles.logoNm}>Sapaserrie</span>
            <span className={styles.logoEst}>EST. 2015</span>
          </div>
          <p className={`${styles.eyebrow} eyebrow`}>Rooted in Indonesia · Locally Sourced</p>
          <h1 className={styles.h1}>cookie, coffee<br />&amp; a mindful space</h1>
          <div className={styles.scrollcue} aria-hidden="true">⌄</div>
        </div>

        <div className={styles.media} aria-hidden="true">
          <div className={styles.phoneFrame}>
            {useFallback ? (
              <CookieFallback />
            ) : show3D ? (
              <Suspense fallback={<CookieFallback />}>
                <HeroScene onReady={() => setSceneReady(true)} />
              </Suspense>
            ) : (
              <CookieFallback />
            )}
          </div>
        </div>

        <div className={styles.foot}>
          <p className={styles.lead}>A mindful little space for cookies &amp; coffee, handmade in Kuta, Bali since 2015.</p>
          <div className={styles.cta}>
            <a className="btn btn-p" href="https://linktr.ee/sapaserriebali" target="_blank" rel="noopener">Order now</a>
            <a className="btn btn-o" href="#visit">Visit us</a>
          </div>
          <p className={styles.hours}>Open daily 8am–7pm · Kuta, Bali</p>
        </div>
      </div>
    </header>
  )
}

function CookieFallback() {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 96, animation: 'spin 8s linear infinite',
    }}>
      🍪
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
