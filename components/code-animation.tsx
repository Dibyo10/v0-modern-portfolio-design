"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface CodeSymbol {
  id: number
  symbol: string
  x: number
  y: number
  size: number
  opacity: number
  rotation: number
}

const codeSymbols = [
  "</>",
  "{ }",
  "( )",
  "[]",
  "=>",
  "&&",
  "||",
  "++",
  "==",
  "===",
  "!=",
  "!==",
  "+=",
  "-=",
  "*=",
  "/=",
  "//",
  "/* */",
  "...",
  "?.",
  "??",
  "?:",
  "#",
  "$",
  "@",
]

export function CodeAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const symbols = useRef<CodeSymbol[]>([])
  const { theme } = useTheme()

  // Generate initial symbols
  useEffect(() => {
    symbols.current = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 14 + 10,
      opacity: Math.random() * 0.5 + 0.1,
      rotation: Math.random() * 360,
    }))
  }, [])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Animation loop
    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update symbols
      symbols.current.forEach((symbol) => {
        // Move symbols slowly upward
        symbol.y -= 0.2

        // Reset position if out of view
        if (symbol.y < -50) {
          symbol.y = canvas.height + 50
          symbol.x = Math.random() * canvas.width
        }

        // Slight horizontal drift
        symbol.x += Math.sin(Date.now() * 0.001 + symbol.id) * 0.3

        // Slow rotation
        symbol.rotation += 0.05

        // Draw the symbol with adjusted opacity for light mode
        ctx.save()
        ctx.translate(symbol.x, symbol.y)
        ctx.rotate((symbol.rotation * Math.PI) / 180)
        ctx.font = `${symbol.size}px monospace`
        // Reduce opacity in light mode
        const adjustedOpacity = theme === "dark" ? symbol.opacity : symbol.opacity * 0.6
        ctx.fillStyle = `rgba(220, 38, 38, ${adjustedOpacity})`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(symbol.symbol, 0, 0)
        ctx.restore()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasSize)
      cancelAnimationFrame(animationId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" aria-hidden="true" />
}
