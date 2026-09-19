import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const technologies = [
  "Java", "Python", "JavaScript", "TypeScript", 
  "React", "Django", "PostgreSQL", "MySQL", 
  "Git", "GitHub", "AWS"
]

export function Stack() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tech-pill",
        { opacity: 0, scale: 0.9, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="stack" ref={containerRef} className="section-light py-24 w-full relative z-10">
      <div className="px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">A BASE TÉCNICA</h2>
          <p style={{ color: 'var(--color-muted-foreground)' }} className="text-lg mb-12">
            Tecnologias que estudo e utilizo para construir e escalar sistemas modernos, com forte ênfase no desenvolvimento backend e cloud.
          </p>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {technologies.map((tech) => (
              <div 
                key={tech} 
                className="tech-pill card-shell border rounded-full p-1 transition-transform duration-300 hover:scale-105"
              >
                <div className="card-core px-5 py-2.5 rounded-full font-medium text-sm md:text-base">
                  {tech}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
