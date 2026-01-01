"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

export function GradientDescentViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [displayLoss, setDisplayLoss] = useState(1.0)
  const [displayStatus, setDisplayStatus] = useState("initializing...")
  const [progressPercent, setProgressPercent] = useState(0)

  // Track scroll progress across the entire document
  const { scrollYProgress } = useScroll()

  // Smooth out the scroll progress for fluid animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Gradient descent path - starts at edge, spirals toward center
  const getPositionOnPath = (t: number) => {
    const startRadius = 80
    const endRadius = 5
    const rotations = 2.5

    const radius = startRadius * (1 - t) + endRadius * t
    const angle = t * rotations * Math.PI * 2 - Math.PI / 4

    const centerX = 100
    const centerY = 100

    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    }
  }

  // Show component after a brief delay to avoid flash
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Subscribe to scroll progress and update canvas + display values
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const unsubscribe = smoothProgress.on("change", (scrollValue) => {
      // Map scroll to animation progress (complete at 90% scroll)
      const progress = Math.min(scrollValue / 0.9, 1)

      // Update display values
      const loss = 1.0 - progress * 0.999
      setDisplayLoss(loss)
      setProgressPercent(progress * 100)

      if (progress > 0.95) {
        setDisplayStatus("converged")
      } else if (progress > 0.5) {
        setDisplayStatus("optimizing...")
      } else if (progress > 0.05) {
        setDisplayStatus("descending...")
      } else {
        setDisplayStatus("initializing...")
      }

      // Draw the visualization
      const size = 200
      const center = size / 2
      ctx.clearRect(0, 0, size, size)

      // Contour lines
      const levels = 8
      for (let i = levels; i >= 1; i--) {
        const radius = (i / levels) * 85
        const alpha = 0.15 + (1 - i / levels) * 0.3

        ctx.beginPath()
        ctx.arc(center, center, radius, 0, Math.PI * 2)

        const hue = 0 + (1 - i / levels) * 120
        ctx.strokeStyle = `hsla(${hue}, 70%, 50%, ${alpha})`
        ctx.lineWidth = 1.5
        ctx.stroke()

        ctx.fillStyle = `hsla(${hue}, 70%, 50%, ${alpha * 0.08})`
        ctx.fill()
      }

      // Draw the path taken so far
      if (progress > 0) {
        ctx.beginPath()
        ctx.strokeStyle = "rgba(220, 38, 38, 0.6)"
        ctx.lineWidth = 2

        const steps = Math.floor(progress * 50)
        for (let i = 0; i <= steps; i++) {
          const t = i / 50
          const pos = getPositionOnPath(t)
          if (i === 0) {
            ctx.moveTo(pos.x, pos.y)
          } else {
            ctx.lineTo(pos.x, pos.y)
          }
        }
        ctx.stroke()
      }

      // Draw minimum point
      ctx.beginPath()
      ctx.arc(center, center, 4, 0, Math.PI * 2)
      ctx.fillStyle = progress > 0.95 ? "rgba(34, 197, 94, 1)" : "rgba(34, 197, 94, 0.6)"
      ctx.fill()

      // Glow for minimum
      ctx.beginPath()
      ctx.arc(center, center, 10, 0, Math.PI * 2)
      ctx.fillStyle = progress > 0.95 ? "rgba(34, 197, 94, 0.3)" : "rgba(34, 197, 94, 0.15)"
      ctx.fill()

      // Draw the ball (current position)
      const ballPos = getPositionOnPath(progress)

      // Ball glow
      const gradient = ctx.createRadialGradient(
        ballPos.x, ballPos.y, 0,
        ballPos.x, ballPos.y, 15
      )
      gradient.addColorStop(0, "rgba(220, 38, 38, 0.4)")
      gradient.addColorStop(1, "rgba(220, 38, 38, 0)")
      ctx.beginPath()
      ctx.arc(ballPos.x, ballPos.y, 15, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Ball itself
      ctx.beginPath()
      ctx.arc(ballPos.x, ballPos.y, 6, 0, Math.PI * 2)
      ctx.fillStyle = progress > 0.95 ? "#22c55e" : "#dc2626"
      ctx.fill()

      // Ball highlight
      ctx.beginPath()
      ctx.arc(ballPos.x - 2, ballPos.y - 2, 2, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)"
      ctx.fill()
    })

    return () => unsubscribe()
  }, [smoothProgress])

  // Initial draw
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const size = 200
    const center = size / 2

    // Initial contour lines
    const levels = 8
    for (let i = levels; i >= 1; i--) {
      const radius = (i / levels) * 85
      const alpha = 0.15 + (1 - i / levels) * 0.3

      ctx.beginPath()
      ctx.arc(center, center, radius, 0, Math.PI * 2)

      const hue = 0 + (1 - i / levels) * 120
      ctx.strokeStyle = `hsla(${hue}, 70%, 50%, ${alpha})`
      ctx.lineWidth = 1.5
      ctx.stroke()

      ctx.fillStyle = `hsla(${hue}, 70%, 50%, ${alpha * 0.08})`
      ctx.fill()
    }

    // Minimum point
    ctx.beginPath()
    ctx.arc(center, center, 4, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(34, 197, 94, 0.6)"
    ctx.fill()

    // Initial ball position
    const ballPos = getPositionOnPath(0)
    ctx.beginPath()
    ctx.arc(ballPos.x, ballPos.y, 6, 0, Math.PI * 2)
    ctx.fillStyle = "#dc2626"
    ctx.fill()
  }, [])

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

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={200}
          height={200}
          className="rounded-lg"
        />

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
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </motion.div>
  )
}
