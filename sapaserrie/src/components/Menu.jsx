import styles from './Menu.module.css'

const ITEMS = [
  { ic: '🍪', t: 'Signature cookies',        d: 'Our everyday classics — soft, golden and baked fresh.' },
  { ic: '☕', t: 'Coffee & mindful moments', d: 'Locally roasted coffee to slow down with.' },
  { ic: '🌙', t: 'Eid & Lebaran kukis',      d: 'Festive jars: kastengel, nastar & the classics.' },
  { ic: '🎄', t: 'Christmas hampers',        d: 'Handcrafted holiday boxes, made to gift.' },
  { ic: '🎁', t: 'Custom hampers',           d: 'Build your own box for any celebration.' },
  { ic: '🌷', t: 'Seasonal specials',        d: 'Little limited treats that follow the calendar.' },
]

export default function Menu() {
  return (
    <section className={styles.menu} id="menu">
      <div className="wrap">
        <div className={`${styles.head} reveal`}>
          <p className={`eyebrow ${styles.eyebrow}`}>What we make</p>
          <h2 className={styles.h2}>From cookie jars to gift hampers</h2>
        </div>
        <div className={styles.cards}>
          {ITEMS.map(item => (
            <div key={item.t} className={`${styles.card} reveal`}>
              <div className={styles.ic}>{item.ic}</div>
              <h3 className={styles.ct}>{item.t}</h3>
              <p className={styles.cd}>{item.d}</p>
            </div>
          ))}
        </div>
        <div className={`${styles.foot} reveal`}>
          <a className="btn" style={{ background: 'var(--yellow)', color: 'var(--grape-deep)' }}
            href="https://linktr.ee/sapaserriebali" target="_blank" rel="noopener">
            See the full menu & order →
          </a>
        </div>
      </div>
    </section>
  )
}
