import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowUpRight } from "lucide-react"
import { MagneticButton } from "../ui/MagneticButton"
import { WHATSAPP_URL } from "../../lib/utils"

export function Contact() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={containerRef} className="section-atmospheric py-32 md:py-48 w-full relative z-10">
      <div className="px-4 md:px-8 max-w-5xl mx-auto w-full text-center">
        <div className="contact-reveal mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Disponível para novos projetos
        </div>

        <h2 className="contact-reveal text-5xl md:text-7xl lg:text-[7rem] font-display font-bold tracking-tight leading-[0.9] mb-8">
          <span className="block">TEM UM PROJETO</span>
          <span className="block text-muted-foreground opacity-80">EM MENTE?</span>
        </h2>
        
        <p className="contact-reveal text-lg md:text-xl max-w-2xl mx-auto mb-12 text-balance" style={{ color: '#A1A1AA' }}>
          Juntos podemos criar sistemas eficientes, robustos e impactantes. 
          Vamos colaborar para dar vida às suas ideias com a arquitetura certa.
        </p>

        {/* Central CTAs and Social Links */}
        <div className="contact-reveal flex flex-col items-center gap-12 md:gap-24 mb-16">
          
          {/* Primary & Secondary CTAs (Centered, high priority) */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <MagneticButton href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-foreground text-background scale-110 px-4">
              {/* Espaçador invisível para balancear a seta */}
              <div className="mr-2 w-8 shrink-0" aria-hidden="true" />
              
              <span className="font-medium text-lg text-center">Vamos Conversar</span>
              
              <div className="ml-2 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-background transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105">
                <ArrowUpRight size={16} />
              </div>
            </MagneticButton>
            <MagneticButton href="#projects" className="bg-transparent border border-border hover:bg-white/5 scale-110 px-8">
              <span className="font-medium text-lg">Projetos</span>
            </MagneticButton>
          </div>

          {/* Social Links (Horizontal row at the bottom, reference style) */}
          <div className="flex flex-wrap justify-center items-center gap-4 w-full">
            {/* Profile Badge */}
            <MagneticButton href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="!p-1.5 !pr-6 flex items-center gap-3 bg-foreground text-background hover:opacity-90">
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/10">
                <img 
                  src="/Mateus2.png" 
                  alt="Mateus Alencar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-medium">Mateus Alencar</span>
            </MagneticButton>

            <MagneticButton href="https://github.com/mateusalencarsantos738-dev" className="!px-5 !py-3 flex items-center gap-2.5 bg-transparent border border-white/10 hover:bg-white/5 group">
              <svg className="opacity-60 group-hover:opacity-100 transition-opacity" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="text-sm font-medium">GitHub</span>
            </MagneticButton>

            <MagneticButton href="https://www.linkedin.com/in/mateus-alencar-santos/" className="!px-5 !py-3 flex items-center gap-2.5 bg-transparent border border-white/10 hover:bg-white/5 group">
              <svg className="opacity-60 group-hover:opacity-100 transition-opacity" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="text-sm font-medium">LinkedIn</span>
            </MagneticButton>
          </div>

        </div>
      </div>
    </section>
  )
}
