import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// ─────────────────────────────────────────────────────────────────────────────
// MOOD SYSTEM — opacity values for each cloud layer per section
// ─────────────────────────────────────────────────────────────────────────────
type MoodName = "hero" | "clean" | "contact"

const MOODS: Record<MoodName, { far: number; mid: number; near: number }> = {
  hero:     { far: 0.28, mid: 0.40, near: 0.48 },
  contact:  { far: 0.15, mid: 0.20, near: 0.25 },
  clean:    { far: 0.00, mid: 0.00, near: 0.00 },
}

export function AtmosphericBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const farRef       = useRef<HTMLDivElement>(null)
  const midRef       = useRef<HTMLDivElement>(null)
  const nearRef      = useRef<HTMLDivElement>(null)
  const vignetteRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // We select the elements directly from the document for the scroll triggers
    // because the scope would restrict the search to the background container div,
    // where none of the page sections exist.
    const aboutEl      = document.querySelector<HTMLElement>("#about")
    const contactEl    = document.querySelector<HTMLElement>("#contact")

    // gsap.context WITHOUT a scope parameter — we use refs for animated targets,
    // and direct element references for triggers. No scope needed.
    const ctx = gsap.context(() => {
      
      // 1. Initial idle movement (drifting clouds)
      // Different axes and scales prevent conflict with the scroll parallax
      gsap.to(farRef.current, {
        x: 10, scale: 1.02, duration: 25, repeat: -1, yoyo: true, ease: "sine.inOut"
      })
      gsap.to(midRef.current, {
        x: -12, scale: 1.04, duration: 20, repeat: -1, yoyo: true, ease: "sine.inOut"
      })
      gsap.to(nearRef.current, {
        x: 18, scale: 1.06, duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut"
      })

      // 2. Scroll Parallax Effect (Moves layers down when scrolling down)
      // This creates depth as the user scrolls the page.
      if (document.documentElement) {
        ScrollTrigger.create({
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          animation: gsap.timeline()
            .to(farRef.current,  { backgroundPosition: "50% 25%" }, 0)
            .to(midRef.current,  { backgroundPosition: "50% 25%" }, 0)
            .to(nearRef.current, { backgroundPosition: "50% 40%" }, 0),
        })
      }

      // Helper function to transition layer opacities
      const transition = (mood: MoodName) => {
        gsap.to(farRef.current,  { opacity: MOODS[mood].far,  duration: 1.5, ease: "power2.inOut" })
        gsap.to(midRef.current,  { opacity: MOODS[mood].mid,  duration: 1.5, ease: "power2.inOut" })
        gsap.to(nearRef.current, { opacity: MOODS[mood].near, duration: 1.5, ease: "power2.inOut" })
      }

      // Rhythm: HERO (full) → ABOUT and beyond (clean/black)

      if (aboutEl) {
        ScrollTrigger.create({
          trigger: aboutEl,
          start: "top 70%",
          onEnter:     () => transition("clean"),
          onLeaveBack: () => transition("hero"),
        })
      }

      if (contactEl) {
        ScrollTrigger.create({
          trigger: contactEl,
          start: "top 70%",
          onEnter:     () => transition("contact"),
          onLeaveBack: () => transition("clean"),
        })
      }
    })
    // ↑ No scope parameter — intentional. See note above.

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    // Fixed wrapper isolated behind everything else
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden bg-background"
    >
      {/* FAR LAYER */}
      <div 
        ref={farRef}
        className="absolute inset-0 bg-cover bg-no-repeat will-change-transform"
        style={{ 
          backgroundImage: "url('/assets/images/clouds-far.jpg')", 
          backgroundPosition: "50% 50%",
          opacity: MOODS.hero.far, 
          backgroundSize: "110% 110%", // Prevent edge gaps during drift/parallax
          mixBlendMode: "screen",
          filter: "brightness(0.6) contrast(1.2)"
        }}
      />
      
      {/* MID LAYER */}
      <div 
        ref={midRef}
        className="absolute inset-0 bg-cover bg-no-repeat will-change-transform"
        style={{ 
          backgroundImage: "url('/assets/images/clouds-far.jpg')", 
          backgroundPosition: "50% 50%",
          opacity: MOODS.hero.mid,
          backgroundSize: "120% 120%",
          mixBlendMode: "screen",
          filter: "brightness(0.8) contrast(1.1)"
        }}
      />

      {/* NEAR LAYER */}
      <div 
        ref={nearRef}
        className="absolute inset-0 bg-cover bg-no-repeat will-change-transform"
        style={{ 
          backgroundImage: "url('/assets/images/clouds-near.jpg')", 
          backgroundPosition: "50% 100%",
          opacity: MOODS.hero.near,
          backgroundSize: "130% 130%",
          mixBlendMode: "screen",
          filter: "brightness(1) contrast(1.1)"
        }}
      />

      {/* VIGNETTE & TINT OVERLAY */}
      <div 
        ref={vignetteRef}
        className="absolute inset-0 z-10"
        style={{
          background: `
            radial-gradient(circle at center, transparent 0%, rgba(5,5,5,0.7) 100%),
            linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.9) 80%, #050505 100%)
          `
        }}
      />
    </div>
  )
}
