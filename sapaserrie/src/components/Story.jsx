import styles from './Story.module.css'

export default function Story() {
  return (
    <section className={styles.story} id="story">
      <div className="wrap">
        <div className={styles.grid}>
          <div className="reveal">
            <p className={`eyebrow ${styles.eyebrow}`}>Our story</p>
            <h2 className={styles.h2}>Baked with love, rooted in Indonesia</h2>
            <p className={styles.p}>Sapaserrie started in 2015 as a little corner in Kuta — a mindful space where good coffee meets honest, handmade cookies.</p>
            <p className={styles.p}>We source locally and bake fresh, every day. From quiet mornings over coffee to festive hampers, everything carries a little Bali warmth.</p>
          </div>
          <div className={`${styles.vidFrame} reveal`}>
            <span className={styles.tag}>Our story · 1 min</span>
            <div className={styles.vidPlaceholder}>🎥</div>
          </div>
        </div>

        <div className={styles.values}>
          {[
            { ic: '🌾', bg: '#FFE3A8', t: 'Locally sourced',   d: 'Ingredients from Indonesian growers we trust.' },
            { ic: '🤲', bg: '#FFC9D6', t: 'Handmade daily',    d: 'Small batches, baked fresh in our kitchen.' },
            { ic: '🧘', bg: '#C8E6C9', t: 'A mindful space',   d: 'Slow mornings, good coffee, no rush.' },
          ].map(v => (
            <div key={v.t} className={`${styles.value} reveal`}>
              <div className={styles.ic} style={{ background: v.bg }}>{v.ic}</div>
              <div>
                <h3 className={styles.vt}>{v.t}</h3>
                <p className={styles.vd}>{v.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
