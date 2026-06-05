import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

// Objet 3D principal — forme organique animée
function OrganicSphere({ scrollProgress }) {
  const meshRef = useRef()
  const materialRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()

    // Rotation lente continue
    meshRef.current.rotation.x = t * 0.08
    meshRef.current.rotation.y = t * 0.12

    // Réaction au scroll : inclinaison + déplacement vers le haut
    meshRef.current.position.y = scrollProgress.current * -1.5
    meshRef.current.rotation.z = scrollProgress.current * 0.4

    // Pulsation douce du matériau
    if (materialRef.current) {
      materialRef.current.distort = 0.3 + Math.sin(t * 0.5) * 0.1
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={1.8} castShadow>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#c8a882"
          envMapIntensity={1.2}
          roughness={0.15}
          metalness={0.6}
          distort={0.3}
          speed={1.5}
        />
      </mesh>
    </Float>
  )
}

// Particules d'ambiance
function Particles({ count = 60 }) {
  const meshRef = useRef()

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4
  }

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.02
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#e8d5c0" transparent opacity={0.6} />
    </points>
  )
}

// Caméra animée au scroll
function ScrollCamera({ scrollProgress }) {
  const { camera } = useThree()

  useFrame(() => {
    const p = scrollProgress.current
    camera.position.z = 5 - p * 1.5
    camera.position.y = p * 0.5
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function HeroScene({ onReady }) {
  const scrollProgress = useRef(0)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: 'section',
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        scrollProgress.current = self.progress
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
        onReady?.()
      }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 3]} intensity={1.2} />
      <pointLight position={[-3, -3, -3]} intensity={0.5} color="#8b6f47" />

      <Particles />
      <OrganicSphere scrollProgress={scrollProgress} />
      <ScrollCamera scrollProgress={scrollProgress} />

      <Environment preset="sunset" />
    </Canvas>
  )
}
