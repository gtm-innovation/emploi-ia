import { useEffect } from 'react'
import Lenis from 'lenis'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Story from './components/Story'
import Highlights from './components/Highlights'
import Menu from './components/Menu'
import Reviews from './components/Reviews'
import Visit from './components/Visit'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    const raf = time => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)

    // Scroll reveal
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))

    return () => { lenis.destroy(); io.disconnect() }
  }, [])

  return (
    <>
      <Nav />
      <Hero />
      <svg className="wave" viewBox="0 0 1440 42" preserveAspectRatio="none" style={{ background: 'var(--yellow)' }}>
        <path fill="var(--cream)" d="M0,42 C240,0 480,0 720,18 C960,36 1200,42 1440,12 L1440,42 Z" />
      </svg>
      <Story />
      <Highlights />
      <Menu />
      <Reviews />
      <Visit />
      <Footer />
    </>
  )
}
