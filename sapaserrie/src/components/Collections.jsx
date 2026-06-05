import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Collections.module.css'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  { id: 1, title: 'Série Rivière', tag: 'Osier & Rotin', year: '2024' },
  { id: 2, title: 'Collection Forêt', tag: 'Jonc & Bambou', year: '2024' },
  { id: 3, title: 'Édition Solstice', tag: 'Osier tressé', year: '2023' },
]

export default function Collections() {
  const listRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-card]', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 80%',
        },
      })
    }, listRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.collections} id="collections">
      <div className={styles.header}>
        <p className="section-label">Collections</p>
        <h2 className="section-title">
          Pièces <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>disponibles</em>
        </h2>
      </div>

      <ul ref={listRef} className={styles.list}>
        {ITEMS.map((item) => (
          <li key={item.id} data-card className={styles.card}>
            <div className={styles.cardVisual} />
            <div className={styles.cardInfo}>
              <div>
                <p className={styles.cardTag}>{item.tag}</p>
                <h3 className={styles.cardTitle}>{item.title}</h3>
              </div>
              <div className={styles.cardMeta}>
                <span>{item.year}</span>
                <a href="#" className={styles.cardLink}>Voir →</a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
