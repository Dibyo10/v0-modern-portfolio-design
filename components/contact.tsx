"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Mail, MapPin, Github, Linkedin } from "lucide-react"

export default function Contact() {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-gray-300">
            Have a project in mind or want to collaborate? Feel free to reach out.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-2xl mx-auto"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <a
              href="https://github.com/Dibyo10"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-all group"
            >
              <div className="bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary/20 transition-colors">
                <Github className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-100">GitHub</h4>
                <p className="text-sm text-gray-300">See my code and contributions</p>
              </div>
              <span className="text-primary text-sm font-medium">→</span>
            </a>

            <a
              href="https://www.linkedin.com/in/dibyo-chakraborty-2a7309317/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-all group"
            >
              <div className="bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary/20 transition-colors">
                <Linkedin className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-100">LinkedIn</h4>
                <p className="text-sm text-gray-300">Connect professionally</p>
              </div>
              <span className="text-primary text-sm font-medium">→</span>
            </a>

            <a
              href="mailto:dibyo.dc@gmail.com"
              className="flex items-center p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-all group"
            >
              <div className="bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary/20 transition-colors">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-100">Email</h4>
                <p className="text-sm text-gray-300">dibyo.dc@gmail.com</p>
              </div>
              <span className="text-primary text-sm font-medium">→</span>
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-center text-sm text-gray-400 mt-8">
            <MapPin className="h-4 w-4 mr-2" />
            Bengaluru, India
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
