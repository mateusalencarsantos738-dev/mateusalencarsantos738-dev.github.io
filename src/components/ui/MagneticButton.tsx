import { useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { cn } from "../../lib/utils"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

export function MagneticButton({ children, className, onClick, href }: MagneticButtonProps) {
  // Use separate typed refs for button and anchor to avoid @ts-ignore
  const buttonRef = useRef<HTMLButtonElement>(null)
  const anchorRef = useRef<HTMLAnchorElement>(null)

  const getEl = () => buttonRef.current ?? anchorRef.current

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = getEl()
    if (!el) return
    const { clientX, clientY } = e
    const { height, width, left, top } = el.getBoundingClientRect()
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)

    gsap.to(el, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 1,
      ease: "power3.out",
    })
  }

  const handleMouseLeave = () => {
    const el = getEl()
    if (!el) return
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    })
  }

  const sharedProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: cn(
      "group relative flex items-center justify-center rounded-full px-6 py-3 transition-colors",
      "active:scale-[0.98] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
      className
    ),
  }

  if (href) {
    return (
      <a ref={anchorRef} href={href} {...sharedProps}>
        {children}
      </a>
    )
  }

  return (
    <button ref={buttonRef} onClick={onClick} {...sharedProps}>
      {children}
    </button>
  )
}
