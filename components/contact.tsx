"use client"

import type React from "react"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Send, Mail, MapPin, Github, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function Contact() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Show contact options after form submission
    setTimeout(() => {
      setShowOptions(true)
      toast({
        title: "Message prepared!",
        description: "Please choose how you'd like to send your message.",
      })
      setIsSubmitting(false)
    }, 1000)
  }

  const sendEmail = () => {
    const subject = encodeURIComponent(formData.subject || "Contact from Portfolio")
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)
    window.open(`mailto:dibyo.dc@gmail.com?subject=${subject}&body=${body}`, "_blank")
    resetForm()
  }

  const sendToInstagram = () => {
    window.open("https://www.instagram.com/dibyo._.chakraborty/", "_blank")
    resetForm()
  }

  const sendToLinkedIn = () => {
    window.open("https://www.linkedin.com/in/dibyo-chakraborty-2a7309317/", "_blank")
    resetForm()
  }

  const sendViaGoogleForm = () => {
    // Create a Google Form link that pre-fills the form fields
    // This is a placeholder URL - you would need to create a real Google Form and get its prefill URL
    window.open("https://forms.gle/YourGoogleFormPrefillURL", "_blank")
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setShowOptions(false)
    toast({
      title: "Ready to send!",
      description: "Your message is ready to be sent through your chosen platform.",
    })
  }

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
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Have a project in mind or want to collaborate? Feel free to reach out to me.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <motion.h3 variants={itemVariants} className="text-2xl font-semibold mb-6">
              Contact Information
            </motion.h3>

            <motion.div variants={itemVariants} className="flex items-start mb-6">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Email</h4>
                <p className="text-gray-600 dark:text-gray-300">dibyo.dc@gmail.com</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start mb-6">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Location</h4>
                <p className="text-gray-600 dark:text-gray-300">Bengaluru, India</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10">
              <h3 className="text-2xl font-semibold mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors"
                >
                  <Github className="h-6 w-6 text-primary" />
                </a>
                <a
                  href="https://www.linkedin.com/in/dibyo-chakraborty-2a7309317/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors"
                >
                  <Linkedin className="h-6 w-6 text-primary" />
                </a>
                <a
                  href="https://www.instagram.com/dibyo._.chakraborty/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors"
                >
                  <Instagram className="h-6 w-6 text-primary" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
          >
            {!showOptions ? (
              <>
                <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="mb-6">
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full min-h-[150px]"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Preparing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="h-5 w-5 mr-2" />
                        Prepare Message
                      </span>
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <h3 className="text-2xl font-semibold mb-6">Choose How to Send</h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  Your message is ready! Choose your preferred platform to send it:
                </p>

                <div className="space-y-3">
                  <Button onClick={sendEmail} variant="outline" className="w-full justify-start">
                    <Mail className="h-5 w-5 mr-3" />
                    Send via Email
                  </Button>

                  <Button onClick={sendToInstagram} variant="outline" className="w-full justify-start">
                    <Instagram className="h-5 w-5 mr-3" />
                    Send via Instagram DM
                  </Button>

                  <Button onClick={sendToLinkedIn} variant="outline" className="w-full justify-start">
                    <Linkedin className="h-5 w-5 mr-3" />
                    Send via LinkedIn
                  </Button>

                  <Button onClick={() => setShowOptions(false)} variant="ghost" className="w-full mt-4">
                    Back to Form
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
