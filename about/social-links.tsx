"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

const socialLinks = [
  { name: "GitHub", icon: Github, url: "https://github.com/yourusername" },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com/yourusername" },
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/in/yourusername" },
  { name: "Email", icon: Mail, url: "mailto:your.email@example.com" },
]

export default function SocialLinks() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="flex justify-center space-x-6 mt-8">
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors relative"
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <link.icon size={28} />
          {hoveredIndex === index && (
            <motion.span
              className="absolute left-1/2 -translate-x-1/2 mt-1 text-sm bg-white text-black px-2 py-1 rounded"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {link.name}
            </motion.span>
          )}
        </motion.a>
      ))}
    </div>
  )
}

