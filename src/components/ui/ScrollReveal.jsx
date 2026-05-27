// ============================================
// ScrollReveal — wraps children with fade+slide
// ============================================

import { useScrollReveal } from "../../hooks/useScrollReveal"

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up", // up | left | right | none
  threshold = 0.15,
}) {
  const { ref, isVisible } = useScrollReveal({ threshold })

  const getTransform = () => {
    if (direction === "up")    return "translateY(24px)"
    if (direction === "left")  return "translateX(-24px)"
    if (direction === "right") return "translateX(24px)"
    return "none"
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    isVisible ? 1 : 0,
        transform:  isVisible ? "none" : getTransform(),
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}