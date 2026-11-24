import { useEffect, useRef } from 'react'

/**
 * BackgroundFX — the site's animated background.
 *
 * Video generation is unavailable for this account (region restriction),
 * so the motion is rendered live on a canvas instead: slow-drifting gold
 * dust, a few soft embers, and three faint light streaks gliding across a
 * still photographic backdrop (assets/aurenix-hero-bg.jpg). No video file,
 * no sound, no autoplay policy issues, near-zero bandwidth.
 *
 * Honours prefers-reduced-motion (renders nothing — the still image and
 * CSS gradients remain) and pauses when the tab is hidden.
 */

type Particle = {
  x: number
  y: number
  r: number
  vy: number
  sway: number
  swaySpeed: number
  phase: number
  twinkleSpeed: number
  alpha: number
}

type Streak = {
  y: number
  len: number
  speed: number
  x: number
  alpha: number
  tilt: number
}

function makeParticles(w: number, h: number, n: number): Particle[] {
  const out: Particle[] = []
  for (let i = 0; i < n; i++) {
    out.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 1.8,
      vy: 0.05 + Math.random() * 0.22,
      sway: 8 + Math.random() * 22,
      swaySpeed: 0.0002 + Math.random() * 0.0006,
      phase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.0006 + Math.random() * 0.0016,
      alpha: 0.25 + Math.random() * 0.55,
    })
  }
  return out
}

function makeStreaks(w: number, h: number): Streak[] {
  return [
    { y: h * 0.22, len: w * 0.42, speed: 0.016, x: -w * 0.2, alpha: 0.10, tilt: -0.06 },
    { y: h * 0.55, len: w * 0.55, speed: 0.010, x: w * 0.3, alpha: 0.08, tilt: 0.05 },
    { y: h * 0.78, len: w * 0.36, speed: 0.022, x: -w * 0.1, alpha: 0.07, tilt: -0.04 },
  ]
}

export default function BackgroundFX() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    // Non-null aliases: TS narrowing does not carry into the closures below.
    const canvasEl: HTMLCanvasElement = canvas
    const context: CanvasRenderingContext2D = ctx

    let raf = 0
    let running = true
    let w = 0
    let h = 0
    let dpr = 1
    let particles: Particle[] = []
    let streaks: Streak[] = []
    let embers: Particle[] = []

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = window.innerWidth
      h = window.innerHeight
      canvasEl.width = Math.floor(w * dpr)
      canvasEl.height = Math.floor(h * dpr)
      canvasEl.style.width = `${w}px`
      canvasEl.style.height = `${h}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(110, Math.floor((w * h) / 16000))
      particles = makeParticles(w, h, count)
      embers = makeParticles(w, h, 7).map((p) => ({ ...p, r: p.r * 3.2, alpha: p.alpha * 0.5, vy: p.vy * 0.5 }))
      streaks = makeStreaks(w, h)
    }

    function draw(t: number) {
      context.clearRect(0, 0, w, h)

      // Light streaks — long, faint gold gradients drifting sideways.
      for (const s of streaks) {
        s.x += s.speed
        if (s.x - s.len > w) s.x = -s.len
        context.save()
        context.translate(s.x, s.y)
        context.rotate(s.tilt)
        const g = context.createLinearGradient(0, 0, s.len, 0)
        g.addColorStop(0, 'rgba(245, 215, 110, 0)')
        g.addColorStop(0.5, `rgba(245, 215, 110, ${s.alpha})`)
        g.addColorStop(1, 'rgba(245, 215, 110, 0)')
        context.fillStyle = g
        context.fillRect(0, -0.75, s.len, 1.5)
        context.restore()
      }

      // Gold dust — slow rise with sway + twinkle.
      for (const p of particles) {
        p.y -= p.vy
        if (p.y < -4) {
          p.y = h + 4
          p.x = Math.random() * w
        }
        const x = p.x + Math.sin(t * p.swaySpeed + p.phase) * p.sway
        const a = p.alpha * (0.55 + 0.45 * Math.sin(t * p.twinkleSpeed + p.phase))
        context.beginPath()
        context.arc(x, p.y, p.r, 0, Math.PI * 2)
        context.fillStyle = `rgba(245, 215, 110, ${a.toFixed(3)})`
        context.fill()
      }

      // Embers — larger, softer, slower glows.
      for (const p of embers) {
        p.y -= p.vy
        if (p.y < -12) {
          p.y = h + 12
          p.x = Math.random() * w
        }
        const x = p.x + Math.sin(t * p.swaySpeed + p.phase) * p.sway
        const a = p.alpha * (0.5 + 0.5 * Math.sin(t * p.twinkleSpeed + p.phase))
        const g = context.createRadialGradient(x, p.y, 0, x, p.y, p.r * 4)
        g.addColorStop(0, `rgba(212, 175, 55, ${(a * 0.5).toFixed(3)})`)
        g.addColorStop(1, 'rgba(212, 175, 55, 0)')
        context.fillStyle = g
        context.beginPath()
        context.arc(x, p.y, p.r * 4, 0, Math.PI * 2)
        context.fill()
      }
    }

    function loop(t: number) {
      if (!running) return
      draw(t)
      raf = requestAnimationFrame(loop)
    }

    function onVisibility() {
      running = !document.hidden
      if (running) raf = requestAnimationFrame(loop)
      else cancelAnimationFrame(raf)
    }

    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} className="bg-fx-canvas" aria-hidden="true" />
}
