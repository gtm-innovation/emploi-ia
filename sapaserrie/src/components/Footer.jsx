import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.flogo}>Sapaserrie</div>
        <p className={styles.tag}>cookie | coffee &amp; a mindful space · Kuta, Bali</p>
        <div className={styles.social}>
          <a href="https://www.instagram.com/sapaserrie/" target="_blank" rel="noopener">Instagram</a>
          <a href="https://linktr.ee/sapaserriebali" target="_blank" rel="noopener">Linktree</a>
          <a href="https://www.google.com/maps/search/?api=1&query=Sapaserrie+Jl+Kauripan+No+2+Kuta+Bali" target="_blank" rel="noopener">Map</a>
        </div>
        <p className={styles.copy}>
          © 2015–{new Date().getFullYear()} Sapaserrie café · Jl. Kauripan No. 2, Kuta, Bali 80361<br />
          Made with love in Bali 🌴
        </p>
      </div>
    </footer>
  )
}
