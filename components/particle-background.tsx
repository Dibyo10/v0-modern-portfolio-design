"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to full window
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Create particles
    const particles: Particle[] = []
    const particleCount = Math.min(window.innerWidth / 15, 100) // Responsive particle count
    const connectionDistance = 150 // Maximum distance for connecting particles

    const getColor = () => {
      return "#dc2626" // Red in both themes
    }

    // Initialize particles with random positions and speeds
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 1, // Random speed between -0.5 and 0.5
        speedY: (Math.random() - 0.5) * 1,
        color: getColor(),
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        // Move particles with random movement
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x > canvas.width || particle.x < 0) {
          particle.speedX *= -1
        }

        if (particle.y > canvas.height || particle.y < 0) {
          particle.speedY *= -1
        }

        // Occasionally change direction slightly for more random movement
        if (Math.random() < 0.02) {
          particle.speedX += (Math.random() - 0.5) * 0.2
          particle.speedY += (Math.random() - 0.5) * 0.2

          // Limit max speed
          const maxSpeed = 1
          const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY)
          if (currentSpeed > maxSpeed) {
            particle.speedX = (particle.speedX / currentSpeed) * maxSpeed
            particle.speedY = (particle.speedY / currentSpeed) * maxSpeed
          }
        }

        // Draw particle with adjusted opacity for light mode
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color + (theme === "dark" ? "40" : "20") // Lower opacity in light mode
        ctx.fill()
      })

      // Connect particles with lines if they're close enough
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            // Calculate opacity based on distance (closer = more opaque)
            const opacity = 1 - distance / connectionDistance

            // Adjust opacity for light mode
            const opacityValue = theme === "dark" ? Math.floor(opacity * 40) : Math.floor(opacity * 20)

            ctx.beginPath()
            ctx.strokeStyle = `${particles[i].color}${opacityValue.toString(16).padStart(2, "0")}`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />
}
