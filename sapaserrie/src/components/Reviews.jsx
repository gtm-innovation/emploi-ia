import styles from './Reviews.module.css'

const REVIEWS = [
  { q: 'The cosiest little spot in Kuta. Great coffee, even better cookies — I keep coming back.', who: 'Ayu P.', sub: 'Regular · Bali', av: 'A', col: 'var(--terra)' },
  { q: 'Ordered a Lebaran hamper and everything was beautiful and fresh. You can taste the care.', who: 'Maria L.', sub: 'Hamper order', av: 'M', col: 'var(--grape)' },
  { q: 'A truly mindful space. I come for the quiet mornings and stay for the kastengel.', who: 'Dewi S.', sub: 'Local guest', av: 'D', col: 'var(--yellow-deep)' },
]

export default function Reviews() {
  return (
    <section className={styles.rev}>
      <div className="wrap">
        <div className={`${styles.head} reveal`}>
          <p className={`eyebrow ${styles.eyebrow}`}>Kind words</p>
          <h2 className={styles.h2}>Loved by our regulars</h2>
        </div>
        <div className={styles.cards}>
          {REVIEWS.map(r => (
            <div key={r.who} className={`${styles.card} reveal`}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.quote}>{r.q}</p>
              <div className={styles.who}>
                <div className={styles.av} style={{ background: r.col }}>{r.av}</div>
                <div>
                  <b className={styles.name}>{r.who}</b>
                  <small className={styles.sub}>{r.sub}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
