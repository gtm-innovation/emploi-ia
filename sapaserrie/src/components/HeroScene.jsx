import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Cookie = torus (anneau/donut)
function Cookie({ scrollProgress }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.z = t * 0.15
    meshRef.current.rotation.x = 0.4 + scrollProgress.current * 0.6
    meshRef.current.position.y = scrollProgress.current * -1.2
  })

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.5}>
        <torusGeometry args={[1, 0.42, 32, 64]} />
        <MeshDistortMaterial
          color="#C8742A"
          roughness={0.4}
          metalness={0.1}
          distort={0.12}
          speed={1.2}
        />
      </mesh>
      {/* chips sur le cookie */}
      {[0, 1, 2, 3, 4].map(i => (
        <mesh
          key={i}
          position={[
            Math.cos(i * 1.26) * 1.1,
            Math.sin(i * 1.26) * 1.1,
            0.38
          ]}
          scale={0.13}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color="#3B1A0A" roughness={0.6} />
        </mesh>
      ))}
    </Float>
  )
}

// Petites particules jaunes
function Crumbs({ count = 40 }) {
  const ref = useRef()
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 6
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8
    positions[i * 3 + 2] = (Math.random() - 0.5) * 3
  }
  useFrame(s => { if (ref.current) ref.current.rotation.y = s.clock.getElapsedTime() * 0.05 })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#F6E11C" transparent opacity={0.8} />
    </points>
  )
}

export default function HeroScene({ onReady }) {
  const scrollProgress = useRef(0)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: 'header',
      start: 'top top',
      end: 'bottom top',
      onUpdate: self => { scrollProgress.current = self.progress },
    })
    return () => trigger.kill()
  }, [])

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); onReady?.() }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 3]} intensity={1.6} color="#fff8e8" />
      <directionalLight position={[-2, -2, -2]} intensity={0.4} color="#7C2A8E" />
      <pointLight position={[0, 3, 2]} intensity={0.8} color="#F6E11C" />

      <Crumbs />
      <Cookie scrollProgress={scrollProgress} />
    </Canvas>
  )
}
