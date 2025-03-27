"use client"

import { useEffect, useRef } from "react"

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const particles: Particle[] = []
    const particleCount = 150

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      initialDistance: number
      angle: number

      constructor() {
        // Start particles at varying distances from center
        this.angle = Math.random() * Math.PI * 2
        this.initialDistance = Math.random() * 50 // Initial distance from center

        // Position based on center + initial distance in random direction
        this.x = canvas.width / 2 + Math.cos(this.angle) * this.initialDistance
        this.y = canvas.height / 2 + Math.sin(this.angle) * this.initialDistance

        // Random size for variety
        this.size = Math.random() * 4 + 1

        // Speed based on size (smaller particles move faster)
        const baseSpeed = Math.random() * 1.5 + 0.5
        this.speedX = Math.cos(this.angle) * baseSpeed
        this.speedY = Math.sin(this.angle) * baseSpeed
      }

      update(mouseX: number, mouseY: number) {
        // Move particle
        this.x += this.speedX
        this.y += this.speedY

        // Mouse interaction
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          this.x -= dx * 0.03
          this.y -= dy * 0.03
        }

        // Boundary handling - wrap around screen
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        ctx!.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update(mouseX, mouseY)
        particle.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Reposition particles after resize
      particles.forEach((particle) => {
        particle.x = (particle.x / canvas.width) * window.innerWidth
        particle.y = (particle.y / canvas.height) * window.innerHeight
      })
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full bg-gray-900" />
}

