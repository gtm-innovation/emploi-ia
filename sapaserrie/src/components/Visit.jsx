import styles from './Visit.module.css'

export default function Visit() {
  return (
    <section className={styles.visit} id="visit">
      <div className="wrap">
        <div className={styles.grid}>
          <div className="reveal">
            <p className={`eyebrow ${styles.eyebrow}`}>Visit us</p>
            <h2 className={styles.h2}>Come say hello in Kuta</h2>
            <div className={styles.infoline}><span>📍</span><span>Jl. Kauripan No. 2, Kuta, Badung, Bali, Indonesia 80361</span></div>
            <div className={styles.infoline}><span>🕗</span><span>Open daily<small>8am – 7pm, everyday</small></span></div>
            <div className={styles.infoline}><span>📷</span><span>@sapaserrie<small>Follow our daily bakes on Instagram</small></span></div>
            <div className={styles.cta}>
              <a className="btn btn-p" href="https://www.google.com/maps/search/?api=1&query=Sapaserrie+Jl+Kauripan+No+2+Kuta+Bali" target="_blank" rel="noopener">Get directions</a>
              <a className="btn btn-o" href="https://www.instagram.com/sapaserrie/" target="_blank" rel="noopener">Follow on Instagram</a>
            </div>
          </div>
          <div className={`${styles.mapwrap} reveal`}>
            <iframe
              loading="lazy"
              title="Sapaserrie map"
              src="https://www.google.com/maps?q=Jl.+Kauripan+No.+2,+Kuta,+Badung,+Bali+80361&output=embed"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
