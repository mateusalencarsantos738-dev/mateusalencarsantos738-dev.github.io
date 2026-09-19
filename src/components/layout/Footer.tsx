export function Footer() {
  return (
    <footer className="py-12 px-4 md:px-8 max-w-7xl mx-auto w-full border-t border-border mt-32 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
      <div>
        &copy; {new Date().getFullYear()} Mateus Alencar. Todos os direitos reservados.
      </div>
      <div className="flex items-center gap-6">
        <a href="https://github.com/teusmateus" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors duration-300">GitHub</a>
        <a href="https://linkedin.com/in/mateusalencar" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors duration-300">LinkedIn</a>
      </div>
    </footer>
  )
}
