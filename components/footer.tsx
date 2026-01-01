"use client"

import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <h3 className="text-2xl font-bold text-primary mb-2">Dibyo Chakraborty</h3>
            <p className="text-gray-400">Full Stack Developer</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 md:mb-0"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              className="rounded-full border-gray-700 hover:border-primary hover:bg-primary/10"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center"
        >
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Dibyo Chakraborty. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
