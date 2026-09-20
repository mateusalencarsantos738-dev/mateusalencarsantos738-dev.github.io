import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const experiences = [
  {
    role: "Análise e Desenvolvimento de Sistemas",
    institution: "Estudante",
    date: "Atual",
    description: "Foco aprofundado em engenharia de software, modelagem de dados e arquitetura de sistemas corporativos."
  },
  {
    role: "Especialização em Backend",
    institution: "Estudos Práticos",
    date: "Atual",
    description: "Estudo e prática de desenvolvimento backend com Java, Python e frameworks como Django, com foco em lógica, APIs e desenvolvimento de aplicações."
  },
  {
    role: "Estudos em Cloud e DevOps",
    institution: "Prática Contínua",
    date: "2026",
    description: "Estudos de fundamentos de cloud, Linux, AWS, deploy, CI/CD e práticas de DevOps."
  }
]

export function Trajectory() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".trajectory-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="trajectory" ref={containerRef} className="section-light py-24 w-full relative z-10 overflow-hidden">
      {/* ── Ghost background word — editorial depth on light surface ── */}
      {/* On light background, near-black at ~4% creates the same depth effect */}
      <div
        aria-hidden="true"
        className="select-none pointer-events-none absolute top-8 right-140 font-display font-bold leading-none z-0"
        style={{
          fontSize: 'clamp(4rem, 10vw, 9rem)',
          color: '#050505',
          opacity: 0.045,
          letterSpacing: '-0.03em',
          whiteSpace: 'nowrap',
          transform: 'translateX(6%)',
        }}
      >
        TRAJETÓRIA
      </div>
      <div className="px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
            <h2 className="text-xl uppercase tracking-widest font-bold mb-4 opacity-70 sticky top-32">
              / Trajetória
            </h2>
          </div>
          
          <div className="md:w-2/3 flex flex-col">
            {experiences.map((exp) => (
              <div 
                key={exp.role} 
                className="trajectory-item hover-row group relative flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 px-4 -mx-4 rounded-xl transition-colors duration-300"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                <div className="flex flex-col gap-2 md:w-1/2">
                  <h3 className="text-xl md:text-2xl font-display font-bold group-hover:translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    {exp.role}
                  </h3>
                  <span style={{ color: 'var(--color-muted-foreground)' }}>{exp.institution}</span>
                </div>
                
                <div className="mt-4 md:mt-0 flex flex-col md:items-end md:w-1/2 gap-2">
                  <span className="text-sm opacity-60 font-medium">{exp.date}</span>
                  <p style={{ color: 'var(--color-muted-foreground)' }} className="text-sm md:text-right max-w-sm">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
