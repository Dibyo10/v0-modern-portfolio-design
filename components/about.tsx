"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Briefcase, GraduationCap, Code } from "lucide-react"
import { CodeBlock } from "@/components/code-block"
import { FloatingTech } from "@/components/floating-tech"

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="about" className="py-20 bg-accent/50 dark:bg-gray-800/50 theme-transition relative">
      {/* Floating tech tags in background */}
      <FloatingTech />

      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Systems-first AI & backend engineer who builds production-grade LLM-powered systems by reasoning from first principles and shipping working software.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CodeBlock />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold mb-4">What I Do</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              I build LLM-powered systems, backend infrastructure, and tools that prioritize correctness over convenience.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              CS undergrad. Long-term goal: reliable AI systems at scale — systems that fail predictably and recover gracefully.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow theme-transition"
          >
            <div className="flex items-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Technical Skills</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Go, Python, TypeScript for backend systems. LLM engineering including multi-provider tool calling, RAG with reranking, prompt caching, and conversation summarization. Redis, MongoDB, Pinecone.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow theme-transition"
          >
            <div className="flex items-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Engineering Philosophy</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Design before code. AI as an assistant, never the decision-maker. Build tools that fail loudly.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 italic">
              Example: All LLM-generated outputs are validated against schema constraints before execution.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow theme-transition"
          >
            <div className="flex items-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Current Focus</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Building production LLM systems with agentic workflows, schema validation, and self-healing execution loops. Backend infrastructure in Go with concurrency-safe patterns.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
