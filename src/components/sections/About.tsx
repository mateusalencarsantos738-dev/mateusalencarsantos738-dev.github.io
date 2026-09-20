import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      )
    }, sectionRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section-light py-24 md:py-40 w-full relative z-10">
      <div className="px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-start">
          <h2 className="text-4xl md:text-6xl font-display font-bold md:w-1/3 leading-none md:sticky md:top-32">
            SOBRE MIM.
          </h2>
          
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Asymmetrical Bento layout / Double-Bezel cards */}
            <div className="about-card col-span-1 md:col-span-2 card-shell rounded-[2rem] p-1.5 border">
              <div className="card-core rounded-[calc(2rem-0.375rem)] p-8 h-full flex flex-col justify-center">
                <h3 className="text-xl font-bold font-display mb-4">Desenvolvedor e Analista de Sistemas em formação</h3>
                <p style={{ color: 'var(--color-muted-foreground)' }} className="text-balance">
                  Estudante de Análise e Desenvolvimento de Sistemas com foco em backend e desenvolvimento de aplicações web. Desenvolvo projetos de software voltados a problemas reais, trabalhando com APIs, bancos de dados e diferentes tecnologias para transformar necessidades concretas em soluções funcionais.
                </p>
              </div>
            </div>
            
            <div className="about-card card-shell rounded-[2rem] p-1.5 border">
              <div className="card-core rounded-[calc(2rem-0.375rem)] p-8 h-full flex flex-col">
                <h4 style={{ color: 'var(--color-muted-foreground)' }} className="text-sm uppercase tracking-widest font-bold mb-4">Foco Técnico</h4>
                <ul className="flex flex-col gap-3 font-medium">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-foreground rounded-full" /> APIs RESTful</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-foreground rounded-full" /> Modelagem de Dados</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-foreground rounded-full" /> Arquitetura de Software</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-foreground rounded-full" /> Cloud AWS</li>
                </ul>
              </div>
            </div>

            <div className="about-card card-shell rounded-[2rem] p-1.5 border">
              <div className="rounded-[calc(2rem-0.375rem)] p-8 h-full flex flex-col justify-between" style={{ backgroundColor: '#111111', color: '#FDFBF7' }}>
                <h4 className="text-sm uppercase tracking-widest font-bold mb-4 opacity-70">Trajetória</h4>
                <p className="text-xl font-display leading-tight">
                  Em constante evolução acadêmica e prática, aprofundando conhecimentos e transformando desafios reais em soluções de software cada vez mais sólidas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
