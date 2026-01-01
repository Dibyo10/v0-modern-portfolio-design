"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { TerminalAnimation } from "@/components/terminal-animation"

const skills = [
  { name: "HTML/CSS", level: 90 },
  { name: "JavaScript", level: 85 },
  { name: "React.js", level: 80 },
  { name: "FastAPI", level: 75 },
  { name: "PostgreSQL", level: 70 },
  { name: "Data Structures", level: 80 },
  { name: "Algorithms", level: 75 },
  { name: "AI Tools Knowledge", level: 75 },
]

export default function Skills() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Here are the technologies and skills I've acquired throughout my journey as a developer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-primary font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="relative h-2.5"
                    >
                      {/* Animated gradient background */}
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-primary to-red-800 h-2.5 rounded-full"
                        style={{
                          backgroundSize: "200% 100%",
                          animation: "gradientMove 2s linear infinite",
                        }}
                      />

                      {/* Shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 h-2.5 rounded-full"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center items-center"
          >
            <div className="relative">
              <TerminalAnimation />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {["Frontend", "Backend", "Data Structures", "Algorithms"].map((category, index) => (
            <motion.div
              key={category}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl font-bold text-primary mb-2 transition-transform">
                {["90%", "80%", "85%", "75%"][index]}
              </div>
              <div className="text-gray-600 dark:text-gray-300">{category}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Add a custom style for the gradient animation */}
      <style jsx global>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 0%;
          }
        }
      `}</style>
    </section>
  )
}
