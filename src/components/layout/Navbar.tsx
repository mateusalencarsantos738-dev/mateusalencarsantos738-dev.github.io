import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Menu, X } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial reveal of navbar
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
      )
    }, navRef)

    // Progressive Theme Transition — usa scrub real do ScrollTrigger
    // Usamos setProperty direto pois GSAP não anima CSS vars nativamente sem plugin extra
    const nav = navRef.current
    if (!nav) return

    const sections = Array.from(document.querySelectorAll('section'))
    const triggers: ScrollTrigger[] = []

    sections.forEach((section, index) => {
      if (index === 0) return

      const prevSection = sections[index - 1]
      const isPrevLight = prevSection.classList.contains('section-light')
      const isCurrentLight = section.classList.contains('section-light')

      if (isPrevLight === isCurrentLight) return

      // Seção clara -> Header escuro | Seção escura -> Header claro
      const fromText = isPrevLight ? [5, 5, 5] : [255, 255, 255]
      const toText = isCurrentLight ? [5, 5, 5] : [255, 255, 255]
      const fromAlpha = isPrevLight ? 0.05 : 0.05

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top 96px",  // 24px (top offset) + 72px (altura aprox do nav)
        end: "top 24px",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress // 0 a 1
          const r = Math.round(fromText[0] + (toText[0] - fromText[0]) * p)
          const g = Math.round(fromText[1] + (toText[1] - fromText[1]) * p)
          const b = Math.round(fromText[2] + (toText[2] - fromText[2]) * p)
          const textColor = `rgb(${r}, ${g}, ${b})`
          const bgColor = `rgba(${r}, ${g}, ${b}, ${fromAlpha})`
          const borderColor = `rgba(${r}, ${g}, ${b}, 0.1)`
          nav.style.setProperty('--nav-text', textColor)
          nav.style.setProperty('--nav-bg', bgColor)
          nav.style.setProperty('--nav-border', borderColor)
          nav.style.setProperty('--nav-hover', borderColor)
        }
      })

      triggers.push(st)
    })

    return () => {
      ctx.revert()
      triggers.forEach(t => t.kill())
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      gsap.to(menuRef.current, {
        clipPath: "circle(150% at 90% 40px)",
        duration: 1,
        ease: "power4.inOut"
      })
      gsap.fromTo(".nav-item",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out", delay: 0.3 }
      )
    } else {
      // Reset to empty string to restore original value, not force "auto"
      document.body.style.overflow = ""
      gsap.to(menuRef.current, {
        clipPath: "circle(0% at 90% 40px)",
        duration: 0.8,
        ease: "power3.inOut"
      })
    }

    // Cleanup: ensure overflow is restored if component unmounts with menu open
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const links = [
    { name: "Início", href: "#" },
    { name: "Sobre", href: "#about" },
    { name: "Projetos", href: "#projects" },
    { name: "Stack", href: "#stack" },
    { name: "Contato", href: "#contact" },
  ]

  return (
    <>
      <nav 
        ref={navRef} 
        className="fixed top-6 left-0 right-0 z-50 px-4 md:px-8 mx-auto w-full max-w-7xl flex justify-between items-center pointer-events-none"
        style={{
          "--nav-text": "#FFFFFF",
          "--nav-bg": "rgba(255, 255, 255, 0.05)",
          "--nav-border": "rgba(255, 255, 255, 0.1)",
          "--nav-hover": "rgba(255, 255, 255, 0.1)",
        } as React.CSSProperties}
      >
        <div className="font-display font-bold text-xl tracking-tight pointer-events-auto text-[var(--nav-text)]">
          MA.
        </div>
        
        {/* Double-Bezel Island Nav */}
        <div className="hidden md:flex items-center backdrop-blur-md border border-[var(--nav-border)] bg-[var(--nav-bg)] rounded-full p-1.5 shadow-inner-bezel pointer-events-auto">
          <div className="flex items-center gap-1 rounded-[calc(2rem-0.375rem)] bg-[var(--nav-bg)] px-4 py-2">
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] text-[var(--nav-text)] hover:bg-[var(--nav-hover)] hover:scale-[0.98]"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          className="md:hidden pointer-events-auto backdrop-blur-md border border-[var(--nav-border)] bg-[var(--nav-bg)] rounded-full p-3 text-[var(--nav-text)]"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Fullscreen Mobile Menu */}
      <div 
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className="fixed inset-0 z-40 bg-foreground text-background md:hidden flex flex-col justify-center items-center"
        style={{ clipPath: "circle(0% at 90% 40px)" }}
      >
        <div className="flex flex-col items-center gap-8 text-3xl font-display font-bold">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="nav-item opacity-0 transition-transform active:scale-95"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
