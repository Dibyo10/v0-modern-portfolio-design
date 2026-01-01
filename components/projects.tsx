"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { ExternalLink, Github, FolderGit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: "HandaUncle",
    description:
      "Production personal finance chatbot with multi-provider LLM orchestration, tool calling (calculators, charts, web search), RAG with reranking, and conversation summarization. Built from scratch during internship.",
    image: "/images/handauncle_logo.jpeg",
    tags: ["TypeScript","Hono","Zod","React","Redux","Vercel AI SDK", "Anthropic", "OpenAI", "Redis", "Pinecone", "MongoDB"],
    challenges: ["Multi-provider tool calling orchestration", "Prompt caching for 70%+ cache hits", "Sliding window rate limiting with Lua", "Async conversation summarization"],
    github: null,
    demo: "https://chat.handauncle.com",
    inProgress: false,
  },
  {
    title: "Rate Limiting from Scratch",
    description:
      "Token Bucket, Sliding Window, and Leaky Bucket algorithms implemented in Go. Part of my System Design learning series on LinkedIn.",
    image: "/images/go_rate_limit.jpg",
    tags: ["Go","System Design", "Concurrency", "Algorithms", "Backend"],
    challenges: ["Concurrency correctness", "Lazy time computation", "Algorithmic invariants"],
    github: "https://github.com/Dibyo10/System_Design_Learnings/tree/main/Rate_Limiting",
    demo: null,
    inProgress: false,
  },
  {
    title: "LLM Quality Monitoring System",
    description:
      "Internal monitoring pipeline analyzing 10k+ messages for negative sentiment, calculation errors, tool misuse, and user frustration. RoBERTa sentiment + embedding-based clustering for actionable failure categorization.",
    image: "/images/llm_monitoring_system.jpg",
    tags: ["Python", "RoBERTa", "MongoDB", "Flask", "Embeddings", "Clustering", "Unsupervised ML"],
    challenges: ["Cached inference for low-latency sentiment at scale", "Centroid + exemplar similarity clustering", "N+1 query elimination with batch/index optimization"],
    github: null,
    demo: null,
    inProgress: false,
  },
]

export default function Projects() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="projects" className="py-20 bg-gray-800/50">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-gray-300">
            Projects made in pursuit to demonstrate systems thinking, engineering depth, and production-grade implementation.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow relative group">
                {/* Subtle glow effect on hover */}
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-red-800/30 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-300"
                  style={{ zIndex: -1 }}
                />

                <div className="relative overflow-hidden">
                  {/* Image container with overlay effect */}
                  <div className="relative">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Project title overlay on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-white text-xl font-bold px-4 py-2 rounded-md backdrop-blur-sm bg-black/30"
                      >
                        {project.title}
                      </motion.div>
                    </div>
                  </div>

                  {project.inProgress && (
                    <div className="absolute top-3 right-3 z-10">
                      <Badge variant="secondary" className="bg-primary text-white shadow-lg">
                        In Progress
                      </Badge>
                    </div>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-100 group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                  {/* Engineering Challenges */}
                  {project.challenges && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Key Challenges</p>
                      <ul className="space-y-1">
                        {project.challenges.map((challenge, idx) => (
                          <li key={idx} className="text-sm text-gray-300 flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-gray-800 text-gray-200 border-gray-700 hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-start gap-3">
                  {project.github && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-700 hover:border-primary hover:bg-primary/10 transition-colors"
                        asChild={project.github !== "#"}
                        disabled={project.github === "#"}
                      >
                        {project.github === "#" ? (
                          <span className="flex items-center text-gray-400">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </span>
                        ) : (
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        )}
                      </Button>
                    </motion.div>
                  )}

                  {project.demo && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-red-800 transition-colors"
                        asChild={project.demo !== "#"}
                        disabled={project.demo === "#"}
                      >
                        {project.demo === "#" ? (
                          <span className="flex items-center">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Demo
                          </span>
                        ) : (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            See it Live
                          </a>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
              asChild
            >
              <a href="https://github.com/Dibyo10?tab=repositories" target="_blank" rel="noopener noreferrer">
                <FolderGit2 className="h-5 w-5 mr-2" />
                See All My Repos
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
