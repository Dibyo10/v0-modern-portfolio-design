"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const commands = [
  "npm install",
  "git commit -m 'Add new features'",
  "docker build -t portfolio .",
  "python manage.py migrate",
  "npm run build",
  "git push origin main",
  "npm test",
  "ssh user@server",
  "sudo apt update",
  "yarn start",
]

export function TerminalAnimation() {
  const [currentCommand, setCurrentCommand] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [isTyping, setIsTyping] = useState(true)

  // Typing effect
  useEffect(() => {
    if (!isTyping) return

    const command = commands[currentIndex]

    if (charIndex < command.length) {
      const timeout = setTimeout(
        () => {
          setCurrentCommand((prev) => prev + command[charIndex])
          setCharIndex((prev) => prev + 1)
        },
        Math.random() * 50 + 50,
      ) // Random typing speed

      return () => clearTimeout(timeout)
    } else {
      // Pause at the end of typing
      const pauseTimeout = setTimeout(() => {
        setIsTyping(false)

        // Clear and move to next command
        const clearTimeout = setTimeout(() => {
          setCurrentCommand("")
          setCharIndex(0)
          setCurrentIndex((prev) => (prev + 1) % commands.length)
          setIsTyping(true)
        }, 2000)

        return () => clearTimeout(clearTimeout)
      }, 1000)

      return () => clearTimeout(pauseTimeout)
    }
  }, [charIndex, currentIndex, isTyping])

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="bg-black/90 rounded-lg p-4 font-mono text-sm text-green-500 w-full max-w-md shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="ml-2 text-xs text-gray-400">terminal</div>
      </div>
      <div className="h-24 flex items-start">
        <div className="text-blue-400 mr-2">$</div>
        <div>
          {currentCommand}
          <span
            className={`ml-0.5 inline-block w-2 h-4 bg-green-500 ${showCursor ? "opacity-100" : "opacity-0"}`}
          ></span>
        </div>
      </div>
    </motion.div>
  )
}
