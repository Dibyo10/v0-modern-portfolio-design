"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const codeSnippet = `function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const skills = ['React', 'Next.js', 'FastAPI', 'Python'];
  
  useEffect(() => {
    // Initialize portfolio
    fetchProjects()
      .then(data => setProjects(data))
      .finally(() => setIsLoading(false));
  }, []);
  
  return (
    <main className="portfolio">
      <Header />
      <Projects data={projects} />
      <Skills list={skills} />
      <Contact />
    </main>
  );
}`

export function CodeBlock() {
  const [visibleCode, setVisibleCode] = useState("")
  const [currentLine, setCurrentLine] = useState(0)

  const codeLines = codeSnippet.split("\n")

  useEffect(() => {
    if (currentLine < codeLines.length) {
      const currentLineText = codeLines[currentLine]

      // If we're starting a new line
      if (visibleCode.split("\n").length - 1 < currentLine) {
        setVisibleCode((prev) => prev + (prev ? "\n" : ""))
      }

      // Get the current line from visibleCode
      const visibleLines = visibleCode.split("\n")
      const currentVisibleLine = visibleLines[currentLine] || ""

      // If we haven't finished typing the current line
      if (currentVisibleLine.length < currentLineText.length) {
        const timeout = setTimeout(() => {
          // Add the next character
          visibleLines[currentLine] = currentLineText.substring(0, currentVisibleLine.length + 1)
          setVisibleCode(visibleLines.join("\n"))
        }, 25) // Faster typing speed for more realistic effect

        return () => clearTimeout(timeout)
      } else {
        // Move to the next line after a pause
        const timeout = setTimeout(() => {
          setCurrentLine((prev) => prev + 1)
        }, 150)

        return () => clearTimeout(timeout)
      }
    }
  }, [currentLine, codeLines, visibleCode])

  return (
    <motion.div
      className="bg-gray-900 rounded-lg overflow-hidden shadow-xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-gray-400">portfolio.jsx</div>
        <div className="text-xs text-gray-400">JavaScript</div>
      </div>
      <div className="p-4 font-mono text-sm text-gray-300 overflow-x-auto">
        <pre className="whitespace-pre-wrap relative">
          {visibleCode}
          <span className="inline-block w-2 h-4 bg-white/70 ml-0.5 animate-blink absolute"></span>
        </pre>
      </div>
    </motion.div>
  )
}
