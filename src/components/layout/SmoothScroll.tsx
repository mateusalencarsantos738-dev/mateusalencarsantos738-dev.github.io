import { useEffect, type ReactNode } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ ease: "power3.out", duration: 0.85 })

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduceMotion) {
      return
    }

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
    })

    lenis.on("scroll", ScrollTrigger.update)

    // Store the ticker function reference so it can be properly removed on cleanup
    const tickerFn = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      // Use the same reference to actually remove the listener
      gsap.ticker.remove(tickerFn)
    }
  }, [])

  return <>{children}</>
}
