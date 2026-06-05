import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './About.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-reveal]', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.about} id="about">
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className="section-label" data-reveal>Notre approche</p>
          <h2 className={`section-title ${styles.heading}`} data-reveal>
            L'art du geste,<br /><em>transmis de génération en génération.</em>
          </h2>
        </div>
        <div className={styles.right}>
          <p data-reveal>
            Chez Sapaserrie, chaque création naît d'une connaissance profonde des matériaux
            naturels. Nous travaillons l'osier, le rotin et le jonc de mer en respectant les
            saisons et les cycles de la nature.
          </p>
          <p data-reveal>
            Nos artisans perpétuent un savoir-faire centenaire, adapté aux usages contemporains.
            Le résultat : des pièces durables, vivantes, qui racontent une histoire.
          </p>
          <a href="#collections" className={styles.link} data-reveal>
            Voir nos collections →
          </a>
        </div>
      </div>
    </section>
  )
}
