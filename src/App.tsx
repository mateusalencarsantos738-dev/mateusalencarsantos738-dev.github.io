import { SmoothScroll } from "./components/layout/SmoothScroll"
import { AtmosphericBackground } from "./components/layout/AtmosphericBackground"
import { Navbar } from "./components/layout/Navbar"
import { Footer } from "./components/layout/Footer"
import { Hero } from "./components/sections/Hero"
import { About } from "./components/sections/About"
import { Stack } from "./components/sections/Stack"
import { Trajectory } from "./components/sections/Trajectory"
import { Projects } from "./components/sections/Projects"
import { Contact } from "./components/sections/Contact"

function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen text-foreground selection:bg-foreground selection:text-background flex flex-col items-center">
        {/* Subtle noise texture overlay */}
        <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

        <AtmosphericBackground />

        <Navbar />
        
        <main className="w-full flex flex-col items-center">
          <Hero />
          <About />
          <Stack />
          <Projects />
          <Trajectory />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </SmoothScroll>
  )
}

export default App
