"use client"

import { motion } from "framer-motion"

const technologies = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#000000" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Python", color: "#3776AB" },
  { name: "FastAPI", color: "#009688" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "OpenAI", color: "#412991" },
  { name: "Gemini", color: "#8E44AD" },
]

export function FloatingTech() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          className="absolute rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            backgroundColor: `${tech.color}20`,
            color: tech.color,
            border: `1px solid ${tech.color}40`,
            left: `${((index * 100) % 80) + 10}%`,
            top: `${((index * 120) % 70) + 15}%`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.7, 0.9, 0.7],
            y: [0, -15, 0],
            rotate: [0, index % 2 === 0 ? 5 : -5, 0],
          }}
          transition={{
            duration: 3 + index,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 0.5,
            ease: "easeInOut",
          }}
        >
          {tech.name}
        </motion.div>
      ))}
    </div>
  )
}
