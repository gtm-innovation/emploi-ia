import styles from './Highlights.module.css'

const RINGS = [
  { ic: '🪴', bg: '#FFE3A8', t: 'The space',         d: 'Greenery, warm light & slow mornings.' },
  { ic: '💬', bg: '#FFC9D6', t: 'Kind words',        d: 'Honest reviews from our regulars.' },
  { ic: '🍪', bg: '#C8E6C9', t: 'Eid & Lebaran kukis', d: 'Festive cookie jars, baked fresh.' },
  { ic: '🎁', bg: '#D6C8F5', t: 'Christmas hampers', d: 'Handcrafted holiday gift boxes.' },
]

export default function Highlights() {
  return (
    <section className={styles.high} id="high">
      <div className="wrap">
        <div className={`${styles.head} reveal`}>
          <p className={`eyebrow ${styles.eyebrow}`}>Straight from our Instagram</p>
          <h2 className={styles.h2}>Our highlights</h2>
        </div>
        <div className={styles.rings}>
          {RINGS.map(r => (
            <div key={r.t} className={`${styles.ring} reveal`}>
              <div className={styles.circ} style={{ background: r.bg }}>{r.ic}</div>
              <h3 className={styles.rt}>{r.t}</h3>
              <p className={styles.rd}>{r.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
