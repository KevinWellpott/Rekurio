"use client"

import { useCallback, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

interface ParticlesProps {
  className?: string
  quantity?: number
  color?: string
  refresh?: boolean
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const shorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const full = hex.replace(shorthand, (_, r, g, b) => r + r + g + g + b + b)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(full)
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 255, g: 255, b: 255 }
}

export function Particles({
  className,
  quantity = 50,
  color = "#ffffff",
  refresh = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const rgb = hexToRgb(color)

  const initParticles = useCallback(
    (w: number, h: number) => {
      particlesRef.current = Array.from({ length: quantity }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.4 + 0.4,
        opacity: Math.random() * 0.45 + 0.08,
      }))
    },
    [quantity]
  )

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particlesRef.current) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        else if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        else if (p.y > h) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${p.opacity})`
        ctx.fill()
      }
    },
    [rgb.r, rgb.g, rgb.b]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles(canvas.width, canvas.height)
    }

    setSize()
    const ro = new ResizeObserver(setSize)
    ro.observe(canvas)

    const animate = () => {
      draw(ctx, canvas.width, canvas.height)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      ro.disconnect()
      cancelAnimationFrame(rafRef.current)
    }
  }, [initParticles, draw, refresh])

  return <canvas ref={canvasRef} className={cn("pointer-events-none", className)} />
}
