"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: "Moodify",
    description:
      "A sentiment analysis application that analyzes text to determine emotional tone. Currently building the backend infrastructure with FastAPI, databases, and OpenAI integration.",
    image: "/images/moodify-project.jpeg",
    tags: ["FastAPI", "Python", "OpenAI", "Databases"],
    github: "https://github.com/Dibyo10/Moodify",
    demo: "https://github.com/Dibyo10/Moodify",
    inProgress: true,
  },
  {
    title: "Portfolio Website",
    description: "A modern portfolio website built with Next.js and Tailwind CSS to showcase my projects and skills.",
    image: "/images/portfolio-project.jpeg",
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/",
    demo: "https://github.com/", // This will be updated to the portfolio link
  },
  {
    title: "Interactive Dictionary",
    description:
      "A feature-rich dictionary application with word definitions, pronunciations, and an AI-powered chatbot using Gemini API for language assistance.",
    image: "/images/dictionary-project.jpeg",
    tags: ["HTML/CSS", "JavaScript", "Bootstrap", "Dictionary API", "Gemini AI"],
    github: "https://github.com/Dibyo10/DictionaryApp",
    demo: "https://aidictionarypeng.netlify.app/",
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
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Here are some of the projects I've worked on. My current focus is on Moodify, a sentiment analysis
            application.
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
                  <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 dark:border-gray-700 hover:border-primary hover:bg-primary/10 transition-colors"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="sm" className="bg-primary hover:bg-red-800 transition-colors" asChild>
                      <a
                        href={project.title === "Portfolio Website" ? window.location.origin : project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
