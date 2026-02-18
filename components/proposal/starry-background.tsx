"use client"

import { useEffect, useRef } from "react"

export function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    interface Star {
      x: number
      y: number
      size: number
      speed: number
      opacity: number
      twinkleSpeed: number
      twinkleOffset: number
    }

    const stars: Star[] = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.5 + 0.5,
      speed: Math.random() * 0.3 + 0.05,
      opacity: Math.random(),
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }))

    interface ShootingStar {
      x: number
      y: number
      length: number
      speed: number
      opacity: number
      angle: number
      active: boolean
    }

    const shootingStars: ShootingStar[] = []

    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width * 0.7,
        y: Math.random() * canvas.height * 0.3,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 8 + 6,
        opacity: 1,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        active: true,
      })
    }

    let frame = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        star.opacity = 0.3 + 0.7 * Math.abs(Math.sin(frame * star.twinkleSpeed + star.twinkleOffset))
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 235, 180, ${star.opacity})`
        ctx.fill()

        if (star.size > 1.5) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 235, 180, ${star.opacity * 0.15})`
          ctx.fill()
        }
      })

      shootingStars.forEach((ss) => {
        if (!ss.active) return
        ss.x += Math.cos(ss.angle) * ss.speed
        ss.y += Math.sin(ss.angle) * ss.speed
        ss.opacity -= 0.015

        if (ss.opacity <= 0) {
          ss.active = false
          return
        }

        const tailX = ss.x - Math.cos(ss.angle) * ss.length
        const tailY = ss.y - Math.sin(ss.angle) * ss.length

        const gradient = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y)
        gradient.addColorStop(0, `rgba(255, 235, 180, 0)`)
        gradient.addColorStop(1, `rgba(255, 235, 180, ${ss.opacity})`)

        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(ss.x, ss.y)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.opacity})`
        ctx.fill()
      })

      frame++
      requestAnimationFrame(animate)
    }

    animate()

    const shootingInterval = setInterval(() => {
      if (Math.random() > 0.5) spawnShootingStar()
    }, 3000)

    return () => {
      window.removeEventListener("resize", resize)
      clearInterval(shootingInterval)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
