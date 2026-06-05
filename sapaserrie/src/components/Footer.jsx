import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <p className={styles.logo}>Sapaserrie</p>
          <p className={styles.tagline}>L'art de la vannerie contemporaine.</p>
        </div>
        <nav className={styles.nav}>
          <a href="#about">À propos</a>
          <a href="#collections">Collections</a>
          <a href="mailto:contact@sapaserrie.com">Contact</a>
        </nav>
      </div>
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Sapaserrie. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
