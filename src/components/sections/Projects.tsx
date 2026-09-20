import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowUpRight } from "lucide-react"

export function Projects() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
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
    <section id="projects" ref={containerRef} className="section-dark py-32 md:py-48 w-full relative z-10 overflow-hidden">
      {/* ── Ghost background word — editorial technique from reference ── */}
      {/* Large, low-opacity word creates presence without competing with content */}
      <div
        aria-hidden="true"
        className="ghost-word select-none pointer-events-none absolute -top-4 -left-6 md:-left-8 font-display font-bold leading-none z-0"
        style={{
          fontSize: 'clamp(8rem, 22vw, 20rem)',
          color: '#FDFBF7',
          opacity: 0.04,
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
        }}
      >
        WORK
      </div>
      <div className="px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <h2 className="text-sm uppercase tracking-widest font-bold mb-4 opacity-70">
            / Selected Work
          </h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold">
            PROJETOS EM DESTAQUE
          </h3>
        </div>

        <div className="flex flex-col gap-12 md:gap-24">
          {/* Project 1: TRI.bunal */}
          <div className="project-card group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-7 order-2 md:order-1">
              <div className="card-shell rounded-[2rem] p-2 border overflow-hidden">
                <div className="card-core w-full aspect-[4/3] rounded-[calc(2rem-0.5rem)] relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center justify-center">
                   <img src="/Tribunal.png" alt="TRI.bunal" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-5 order-1 md:order-2 flex flex-col items-start">
              <div className="flex flex-wrap gap-2 mb-6">
                {["Django", "PostgreSQL", "OpenCV", "Celery", "Redis"].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium" style={{ border: '1px solid var(--color-border)' }}>
                    {tag}
                  </span>
                ))}
              </div>
              
              <h4 className="text-3xl md:text-4xl font-display font-bold mb-4">TRI.bunal</h4>
              <p style={{ color: 'var(--color-muted-foreground)' }} className="text-lg mb-8 text-balance">
                Projeto acadêmico focado em análise avançada utilizando processamento de imagens e tarefas assíncronas. Uma solução backend robusta projetada para escalabilidade e performance.
              </p>
              
              <div className="flex items-center gap-3 font-medium opacity-40 cursor-default" aria-label="Case study em breve">
                <span>View Case Study</span>
                <div className="p-2 rounded-full" style={{ border: '1px solid var(--color-border)' }}>
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Project 2: X9 Cidadão */}
          <div className="project-card group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-5 flex flex-col items-start md:pl-8">
              <div className="flex flex-wrap gap-2 mb-6">
                {["Java", "JavaFX", "MVC", "DAO"].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium" style={{ border: '1px solid var(--color-border)' }}>
                    {tag}
                  </span>
                ))}
              </div>
              
              <h4 className="text-3xl md:text-4xl font-display font-bold mb-4">X9 Cidadão</h4>
              <p style={{ color: 'var(--color-muted-foreground)' }} className="text-lg mb-8 text-balance">
                Aplicação desktop desenvolvida para registro estruturado de problemas urbanos. Arquitetura MVC com integração de banco de dados nativa via DAO.
              </p>
              
              <div className="flex items-center gap-3 font-medium opacity-40 cursor-default" aria-label="Case study em breve">
                <span>View Case Study</span>
                <div className="p-2 rounded-full" style={{ border: '1px solid var(--color-border)' }}>
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="card-shell rounded-[2rem] p-2 border overflow-hidden">
                <div className="card-core w-full aspect-[4/3] rounded-[calc(2rem-0.5rem)] relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center justify-center">
                   <img src="/x9.jpeg" alt="X9 Cidadão" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
