"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

// 3D Loss Surface Component
function LossSurface() {
  const meshRef = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(4, 4, 64, 64)
    const positions = geo.attributes.position

    // Create bowl-shaped loss surface: z = x² + y²
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const z = (x * x + y * y) * 0.4 // Bowl shape
      positions.setZ(i, z)
    }

    geo.computeVertexNormals()
    return geo
  }, [])

  // Color the surface based on height (loss value)
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        lowColor: { value: new THREE.Color("#22c55e") },
        highColor: { value: new THREE.Color("#dc2626") },
        opacity: { value: 0.5 }
      },
      vertexShader: `
        varying float vHeight;
        void main() {
          vHeight = position.z;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 lowColor;
        uniform vec3 highColor;
        uniform float opacity;
        varying float vHeight;
        void main() {
          float t = clamp(vHeight / 1.5, 0.0, 1.0);
          vec3 color = mix(lowColor, highColor, t);
          gl_FragColor = vec4(color, opacity);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      wireframe: false
    })
  }, [])

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} />
  )
}

// Wireframe overlay for better depth perception
function SurfaceWireframe() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(4, 4, 16, 16)
    const positions = geo.attributes.position

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const z = (x * x + y * y) * 0.4
      positions.setZ(i, z)
    }

    geo.computeVertexNormals()
    return geo
  }, [])

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
      <meshBasicMaterial color="#ffffff" wireframe opacity={0.15} transparent />
    </mesh>
  )
}

// The descending ball
function DescentBall({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const outerGlowRef = useRef<THREE.Mesh>(null)

  // Spiral path parameters
  const getPosition = (t: number) => {
    const startRadius = 1.8
    const endRadius = 0.05
    const rotations = 2.5

    const radius = startRadius * (1 - t) + endRadius * t
    const angle = t * rotations * Math.PI * 2

    const x = radius * Math.cos(angle)
    const z = radius * Math.sin(angle)
    const y = (x * x + z * z) * 0.4 + 0.18 // Height on surface + ball radius (raised higher)

    return { x, y, z }
  }

  useFrame(() => {
    if (meshRef.current && glowRef.current && outerGlowRef.current) {
      const pos = getPosition(progress)
      meshRef.current.position.set(pos.x, pos.y, pos.z)
      glowRef.current.position.set(pos.x, pos.y, pos.z)
      outerGlowRef.current.position.set(pos.x, pos.y, pos.z)

      // Rotate ball as it moves
      meshRef.current.rotation.x += 0.05
      meshRef.current.rotation.z += 0.03
    }
  })

  const isConverged = progress > 0.95
  const ballColor = isConverged ? "#22c55e" : "#ff4444"

  return (
    <>
      {/* Outer glow effect - larger and more visible */}
      <mesh ref={outerGlowRef} renderOrder={999}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color={ballColor} transparent opacity={0.15} depthTest={false} />
      </mesh>
      {/* Inner glow effect */}
      <mesh ref={glowRef} renderOrder={1000}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color={ballColor} transparent opacity={0.4} depthTest={false} />
      </mesh>
      {/* Main ball - larger and always on top */}
      <mesh ref={meshRef} castShadow renderOrder={1001}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color={ballColor}
          emissive={ballColor}
          emissiveIntensity={0.8}
          metalness={0.2}
          roughness={0.3}
          depthTest={false}
        />
      </mesh>
    </>
  )
}

// Trail showing the path taken
function DescentTrail({ progress }: { progress: number }) {
  const lineRef = useRef<THREE.Line>(null)

  const getPosition = (t: number) => {
    const startRadius = 1.8
    const endRadius = 0.05
    const rotations = 2.5

    const radius = startRadius * (1 - t) + endRadius * t
    const angle = t * rotations * Math.PI * 2

    const x = radius * Math.cos(angle)
    const z = radius * Math.sin(angle)
    const y = (x * x + z * z) * 0.4 + 0.05

    return new THREE.Vector3(x, y, z)
  }

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const steps = 100
    for (let i = 0; i <= steps; i++) {
      pts.push(getPosition(i / steps))
    }
    return pts
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(303)
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  useFrame(() => {
    if (lineRef.current) {
      const positions = geometry.attributes.position as THREE.BufferAttribute
      const visiblePoints = Math.floor(progress * 100)

      for (let i = 0; i < 101; i++) {
        if (i <= visiblePoints) {
          positions.setXYZ(i, points[i].x, points[i].y, points[i].z)
        } else {
          positions.setXYZ(i, points[visiblePoints]?.x || 0, points[visiblePoints]?.y || 0, points[visiblePoints]?.z || 0)
        }
      }
      positions.needsUpdate = true
    }
  })

  return (
    <line ref={lineRef as any} geometry={geometry}>
      <lineBasicMaterial color="#dc2626" linewidth={2} transparent opacity={0.8} />
    </line>
  )
}

// Minimum point marker
function MinimumMarker({ progress }: { progress: number }) {
  const isConverged = progress > 0.95

  return (
    <group position={[0, 0.02, 0]}>
      {/* Glow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.15, 32]} />
        <meshBasicMaterial
          color={isConverged ? "#22c55e" : "#22c55e"}
          transparent
          opacity={isConverged ? 0.8 : 0.4}
        />
      </mesh>
      {/* Center dot */}
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>
    </group>
  )
}

// Main 3D Scene
function Scene({ progress }: { progress: number }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#dc2626" />

      <LossSurface />
      <SurfaceWireframe />
      <MinimumMarker progress={progress} />
      <DescentTrail progress={progress} />
      <DescentBall progress={progress} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 3.5}
      />
    </>
  )
}

export function GradientDescentViz() {
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [displayLoss, setDisplayLoss] = useState(1.0)
  const [displayStatus, setDisplayStatus] = useState("initializing...")

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (scrollValue) => {
      const p = Math.min(scrollValue / 0.9, 1)
      setProgress(p)

      const loss = 1.0 - p * 0.999
      setDisplayLoss(loss)

      if (p > 0.95) {
        setDisplayStatus("converged")
      } else if (p > 0.5) {
        setDisplayStatus("optimizing...")
      } else if (p > 0.05) {
        setDisplayStatus("descending...")
      } else {
        setDisplayStatus("initializing...")
      }
    })

    return () => unsubscribe()
  }, [smoothProgress])

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
    >
      <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-4 border border-gray-800 shadow-2xl">
        {/* Header */}
        <div className="text-xs font-mono text-gray-400 mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          gradient_descent.py
        </div>

        {/* 3D Canvas */}
        <div className="w-[220px] h-[200px] rounded-lg overflow-hidden">
          <Canvas
            camera={{ position: [2.5, 4, 2.5], fov: 40 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Scene progress={progress} />
          </Canvas>
        </div>

        {/* Loss value display */}
        <div className="mt-3 font-mono text-xs">
          <div className="flex justify-between text-gray-400">
            <span>loss:</span>
            <span
              className="transition-colors duration-300"
              style={{
                color: displayLoss < 0.1 ? "#22c55e" : displayLoss < 0.5 ? "#eab308" : "#dc2626"
              }}
            >
              {displayLoss.toFixed(4)}
            </span>
          </div>
          <div className="flex justify-between text-gray-500 mt-1">
            <span>epoch:</span>
            <span className="text-gray-400">{Math.floor(progress * 100)}/100</span>
          </div>
          <div className="flex justify-between text-gray-500 mt-1">
            <span>status:</span>
            <span className={displayStatus === "converged" ? "text-green-500" : "text-gray-400"}>
              {displayStatus}
              {displayStatus === "converged" && " ✓"}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Funny remark */}
        <div className="mt-3 text-[10px] text-gray-500 text-center italic">
          {displayStatus === "converged"
            ? "you did it. mass respect."
            : "keep scrolling to reach global minima :)"}
        </div>
      </div>
    </motion.div>
  )
}
