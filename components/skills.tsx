"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { TerminalAnimation } from "@/components/terminal-animation"

const skillCategories = [
  {
    name: "Go",
    capabilities: [
      "Concurrency-safe HTTP servers",
      "Rate limiters from scratch",
      "Mutexes, RWLocks, worker patterns",
    ],
  },
  {
    name: "Python",
    capabilities: [
      "FastAPI backend services",
      "Agentic workflow orchestration",
      "Data processing & validation",
    ],
  },
  {
    name: "TypeScript",
    capabilities: [
      "Production LLM system backends",
      "Type-safe API clients",
      "Streaming response handlers",
    ],
  },
  {
    name: "LLM Engineering",
    capabilities: [
      "Multi-provider tool calling (Anthropic, OpenAI)",
      "RAG pipelines with reranking",
      "Prompt caching for 70%+ cache hits",
    ],
  },
  {
    name: "Backend Systems",
    capabilities: [
      "Sliding window rate limiting with Lua",
      "Async job queues & summarization",
      "Multi-stage orchestration pipelines",
    ],
  },
  {
    name: "Databases",
    capabilities: [
      "Redis caching with Lua scripts",
      "MongoDB with repository patterns",
      "Pinecone vector store integration",
    ],
  },
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            What I've built with, not self-assessed percentages.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {skillCategories.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="font-bold text-lg text-primary mb-3">{skill.name}</h3>
                  <ul className="space-y-2">
                    {skill.capabilities.map((capability, idx) => (
                      <li key={idx} className="text-gray-600 dark:text-gray-300 text-sm flex items-start">
                        <span className="text-primary mr-2 mt-1">›</span>
                        {capability}
                      </li>
                    ))}
                  </ul>
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
      </div>
    </section>
  )
}
