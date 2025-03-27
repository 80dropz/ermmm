"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import Image from "next/image"

const songs = [
  { name: "Awesome Track", url: "/music/awesome-track.mp3" },
  { name: "Cool Vibes", url: "/music/cool-vibes.mp3" },
  { name: "Mellow Mood", url: "/music/mellow-mood.mp3" },
]

export default function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentSongIndex])

  const playPause = () => {
    setIsPlaying(!isPlaying)
  }

  const playPrevious = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length)
  }

  const playNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length)
  }

  return (
    <div className="fixed bottom-4 left-4 z-20 bg-gray-800 p-4 rounded-lg shadow-lg">
      <audio ref={audioRef} src={songs[currentSongIndex].url} />
      <div className="flex items-center space-x-4 mb-2">
        <Image src="/profile-picture.jpg" alt="Profile Picture" width={40} height={40} className="rounded-full" />
        <div className="text-white text-sm font-medium">{songs[currentSongIndex].name}</div>
      </div>
      <div className="flex items-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onHoverStart={() => setHoveredButton("previous")}
          onHoverEnd={() => setHoveredButton(null)}
          onClick={playPrevious}
          className="text-white"
        >
          <SkipBack size={24} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onHoverStart={() => setHoveredButton("playPause")}
          onHoverEnd={() => setHoveredButton(null)}
          onClick={playPause}
          className="text-white"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onHoverStart={() => setHoveredButton("next")}
          onHoverEnd={() => setHoveredButton(null)}
          onClick={playNext}
          className="text-white"
        >
          <SkipForward size={24} />
        </motion.button>
      </div>
      {hoveredButton && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute left-1/2 -translate-x-1/2 -top-8 bg-white text-black px-2 py-1 rounded text-xs"
        >
          {hoveredButton === "previous" && "Previous"}
          {hoveredButton === "playPause" && (isPlaying ? "Pause" : "Play")}
          {hoveredButton === "next" && "Next"}
        </motion.div>
      )}
    </div>
  )
}

