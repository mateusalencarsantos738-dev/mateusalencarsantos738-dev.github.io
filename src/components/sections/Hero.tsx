import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"
import { MagneticButton } from "../ui/MagneticButton"
import { WHATSAPP_URL } from "../../lib/utils"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } })
    let st: ScrollTrigger | undefined

    if (!reduceMotion) {
      tl.fromTo(
        ".hero-word",
        { y: 100, opacity: 0, rotate: 5 },
        { y: 0, opacity: 1, rotate: 0, duration: 1.4, stagger: 0.1, delay: 0.2 }
      )
      .fromTo(
        ".hero-sub",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=1"
      )
      .fromTo(
        ".hero-cta",
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.8"
      )

      // Parallax on scroll
      st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
        animation: gsap.to(containerRef.current, {
          yPercent: 30,
          ease: "none",
        })
      })
    }

    return () => {
      tl.kill()
      st?.kill()
    }
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative flex flex-col justify-center min-h-[100dvh] px-4 md:px-8 max-w-7xl mx-auto pt-24"
    >
      {/* Eyebrow */}
      <div className="hero-sub mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 border border-white/10 w-max">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        Disponível para novos projetos
      </div>

      {/* Editorial Split layout: H1 left fills ~60%, right column owns text + CTAs + socials */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-10 md:gap-16">
        
        {/* Left: Massive Typography — anchors the left half */}
        <h1 className="shrink-0 text-6xl md:text-8xl lg:text-[10rem] font-display font-bold leading-[0.85] tracking-tight uppercase w-full text-center md:w-auto md:text-left">
          <div className="overflow-hidden"><span className="hero-word inline-block origin-bottom-left">Mateus</span></div>
          <div className="overflow-hidden"><span className="hero-word inline-block origin-bottom-left text-muted-foreground">Alencar</span></div>
        </h1>

        {/* Right column: description → CTAs → social links in one cohesive block */}
        <div className="flex flex-col gap-8 max-w-md w-full pb-4">
          
          {/* Description — max-w-md gives it room to breathe on 2–3 lines */}
          <p className="hero-sub text-lg md:text-xl text-balance text-muted-foreground leading-relaxed">
            Desenvolvedor em formação construindo fundações sólidas no backend e escalando aplicações web.
          </p>

          {/* Primary CTAs */}
          <div className="hero-cta flex items-center gap-4">
            <MagneticButton href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-foreground text-background px-4">
              {/* Espaçador invisível para balancear a seta e centralizar o texto perfeitamente */}
              <div className="mr-2 w-8 shrink-0" aria-hidden="true" />
              
              <span className="font-medium text-sm md:text-base whitespace-nowrap text-center">Vamos Conversar</span>
              
              <div className="ml-2 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105">
                <ArrowUpRight size={16} />
              </div>
            </MagneticButton>
            <MagneticButton href="#projects" className="bg-transparent border border-border hover:bg-white/5">
              <span>Projetos</span>
            </MagneticButton>
          </div>

          {/* Social links — horizontal row, visually lighter than the CTAs above */}
          <div className="hero-cta flex items-center gap-3">
            <a 
              href="https://github.com/mateusalencarsantos738-dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors duration-300 group"
            >
              <svg className="opacity-60 group-hover:opacity-100 transition-opacity" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="text-xs font-medium">GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/mateus-alencar-santos/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors duration-300 group"
            >
              <svg className="opacity-60 group-hover:opacity-100 transition-opacity" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="text-xs font-medium">LinkedIn</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
