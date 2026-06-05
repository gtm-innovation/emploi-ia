import { useEffect } from 'react'
import Lenis from 'lenis'
import Hero from './components/Hero'
import About from './components/About'
import Collections from './components/Collections'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <main>
      <Hero />
      <About />
      <Collections />
      <Footer />
    </main>
  )
}
