"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Instagram, FileText } from "lucide-react"

export default function Hero() {
  const [text, setText] = useState("")
  const fullText = "AI & Backend Engineer"
  const [index, setIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const backgroundRef = useRef<HTMLDivElement>(null)

  // Typing effect
  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index])
        setIndex((prev) => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    } else {
      // When typing is complete, blink the cursor
      const blinkInterval = setInterval(() => {
        setShowCursor((prev) => !prev)
      }, 500)
      return () => clearInterval(blinkInterval)
    }
  }, [index])

  // Subtle mouse follow effect for the background gradient
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return

      const { clientX, clientY } = e
      const x = Math.round((clientX / window.innerWidth) * 100)
      const y = Math.round((clientY / window.innerHeight) * 100)

      backgroundRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, var(--light-gradient-start) 0%, var(--light-gradient-end) 50%)`
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const socialIconVariants = {
    hidden: { scale: 0 },
    visible: (i: number) => ({
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1.5 + i * 0.1,
      },
    }),
  }

  const floatingAnimation = {
    y: ["-10px", "10px"],
    transition: {
      y: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden theme-transition"
    >
      {/* Subtle background animation */}
      <div ref={backgroundRef} className="absolute inset-0 z-0 opacity-70 theme-transition"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20 theme-transition"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      <motion.div
        className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center relative z-10"
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="md:w-1/2 mb-10 md:mb-0">
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-4 text-gray-100 theme-transition"
          >
            Hi, I'm <span className="text-primary">Dibyo Chakraborty</span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="text-2xl md:text-3xl font-semibold mb-6 h-10 text-gray-100 theme-transition backdrop-blur-sm bg-gray-900/30 p-2 rounded-md inline-block"
          >
            {text}
            <span className={showCursor ? "opacity-100" : "opacity-0"}>|</span>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 mb-8 text-lg theme-transition backdrop-blur-sm bg-gray-900/30 p-4 rounded-md"
          >
            Building AI systems where correctness, cost control, and failure modes are treated as first-class citizens, not afterthoughts.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-primary to-red-800 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-300"
                animate={{
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <Button
                onClick={() => window.open("https://www.instagram.com/dibyo._.chakraborty/", "_blank")}
                className="relative bg-gray-900 hover:bg-gray-800"
              >
                <span className="relative z-10 text-primary">Contact Me</span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
              <motion.div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-300" />
              <Button
                variant="outline"
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                className="relative bg-gray-900 border-gray-700 hover:bg-gray-800"
              >
                <span className="relative z-10">View Projects</span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
              <motion.div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-red-800/50 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-300" />
              <Button
                variant="outline"
                onClick={() => window.open("https://drive.google.com/file/d/1miDmjV6DuwGqPEb-J0bT3d57-oyc_dRl/view?usp=sharing", "_blank")}
                className="relative bg-gray-900 border-gray-700 hover:bg-gray-800"
              >
                <FileText className="h-4 w-4 mr-2" />
                <span className="relative z-10">Resume</span>
              </Button>
            </motion.div>
          </motion.div>

          <div className="flex space-x-4">
            {[
              { Icon: Github, url: "https://github.com/Dibyo10" },
              { Icon: Linkedin, url: "https://www.linkedin.com/in/dibyo-chakraborty-2a7309317/" },
              { Icon: Instagram, url: "https://www.instagram.com/dibyo._.chakraborty/" },
              { Icon: Mail, url: "mailto:dibyo.dc@gmail.com" },
            ].map(({ Icon, url }, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={socialIconVariants}
                initial="hidden"
                animate="visible"
                whileHover={{
                  scale: 1.2,
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 },
                }}
                className="relative group"
              >
                <motion.div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-red-800/50 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition duration-300" />
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={Icon.name}
                  className="relative theme-transition bg-gray-900/50 backdrop-blur-sm"
                  onClick={() => window.open(url, "_blank")}
                >
                  <Icon className="h-5 w-5" />
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="md:w-1/2 flex justify-center"
        >
          <motion.div className="relative w-64 h-64 md:w-80 md:h-80">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-red-800 opacity-20 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            ></motion.div>

            {/* Glowing effect around the image */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-primary to-red-800 rounded-full opacity-30 blur-xl"
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            {/* Image container with glass effect */}
            <motion.div
              className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden relative z-10 border-4 border-gray-800 theme-transition shadow-xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img src="/images/dibyo-profile.png" alt="Dibyo Chakraborty" className="w-full h-full object-cover object-top" />

              {/* Overlay with glass effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-50"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </motion.div>

            {/* Orbiting elements */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{
                  top: "50%",
                  left: "50%",
                  x: "-50%",
                  y: "-50%",
                  transformOrigin: `${150 + i * 20}px 0px`,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

    </section>
  )
}
