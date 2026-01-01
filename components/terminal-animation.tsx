"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const commands = [
  {
    cmd: "qdrant-cli collection info embeddings",
    output: "vectors: 153421\ndim: 768\ndistance: cosine"
  },
  {
    cmd: "go test -run TestSlidingWindow -race",
    output: "PASS\nrequests/sec: 1000\nrejected: 237"
  },
  {
    cmd: "python infer.py --batch-size 64",
    output: "Processed: 3000 messages\nLatency p95: 42ms"
  },
  {
    cmd: "cat llm.log | tail -4",
    output: "[llm] prompt_tokens=1240\n[llm] cached=true\n[llm] cost=$0.0004"
  },
]

export function TerminalAnimation() {
  const [currentCommand, setCurrentCommand] = useState("")
  const [currentOutput, setCurrentOutput] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [phase, setPhase] = useState<"typing" | "output" | "pause">("typing")

  // Typing effect
  useEffect(() => {
    const { cmd, output } = commands[currentIndex]

    if (phase === "typing") {
      if (charIndex < cmd.length) {
        const timeout = setTimeout(
          () => {
            setCurrentCommand((prev) => prev + cmd[charIndex])
            setCharIndex((prev) => prev + 1)
          },
          Math.random() * 40 + 30,
        )
        return () => clearTimeout(timeout)
      } else {
        // Done typing command, show output
        const timeout = setTimeout(() => {
          setCurrentOutput(output)
          setPhase("output")
        }, 300)
        return () => clearTimeout(timeout)
      }
    } else if (phase === "output") {
      // Pause to show output
      const timeout = setTimeout(() => {
        setPhase("pause")
      }, 2500)
      return () => clearTimeout(timeout)
    } else if (phase === "pause") {
      // Move to next command
      const timeout = setTimeout(() => {
        setCurrentCommand("")
        setCurrentOutput("")
        setCharIndex(0)
        setCurrentIndex((prev) => (prev + 1) % commands.length)
        setPhase("typing")
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [charIndex, currentIndex, phase])

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="bg-black/90 rounded-lg p-4 font-mono text-xs text-green-500 w-full max-w-sm shadow-xl overflow-hidden"
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
      <div className="min-h-[100px]">
        <div className="flex items-start">
          <span className="text-blue-400 mr-2">$</span>
          <span>
            {currentCommand}
            {phase === "typing" && (
              <span
                className={`ml-0.5 inline-block w-1.5 h-3 bg-green-500 ${showCursor ? "opacity-100" : "opacity-0"}`}
              ></span>
            )}
          </span>
        </div>
        {currentOutput && (
          <div className="mt-1 text-gray-400 whitespace-pre-line">
            {currentOutput}
          </div>
        )}
      </div>
    </motion.div>
  )
}
