import styles from './Nav.module.css'

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.row}>
        <a className={styles.brand} href="#top">
          <span className={styles.dot}><span>S</span></span>
          <span className={styles.txt}>Sapaserrie</span>
        </a>
        <div className={styles.links}>
          <a href="#story">Story</a>
          <a href="#high">Highlights</a>
          <a href="#menu">Menu</a>
          <a href="#visit">Visit</a>
        </div>
        <a className="btn btn-p" href="https://linktr.ee/sapaserriebali" target="_blank" rel="noopener" style={{ fontSize: 15, padding: '10px 20px' }}>
          Order
        </a>
      </div>
    </nav>
  )
}
