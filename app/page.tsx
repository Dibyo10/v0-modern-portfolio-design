"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { CodeAnimation } from "@/components/code-animation"
import { ParticleBackground } from "@/components/particle-background"
import { GradientDescentViz } from "@/components/gradient-descent-viz"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-900 text-gray-800 dark:text-gray-100 theme-transition">
      {/* Particle background */}
      <ParticleBackground />

      {/* Code symbols animation in background */}
      <CodeAnimation />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            className="h-screen w-screen flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <motion.div
                className="text-4xl font-bold text-primary relative z-10"
                animate={{
                  textShadow: [
                    "0 0 8px rgba(220, 38, 38, 0)",
                    "0 0 16px rgba(220, 38, 38, 0.5)",
                    "0 0 8px rgba(220, 38, 38, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Dibyo Chakraborty
              </motion.div>
              <motion.div
                className="absolute inset-0 rounded-lg bg-primary/20 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
            <GradientDescentViz />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
