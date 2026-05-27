// src/lib/projectIcons.jsx

import {
  Brain,
  Zap,
  Link,
  Monitor,
  Palette,
  Puzzle,
  Landmark,
  Shield,
  Smartphone,
  Wrench,
  Pin,
  Box,
} from "lucide-react"

const iconMap = {
  brain: Brain,
  zap: Zap,
  link: Link,
  monitor: Monitor,
  palette: Palette,
  puzzle: Puzzle,
  landmark: Landmark,
  shield: Shield,
  smartphone: Smartphone,
  wrench: Wrench,
  pin: Pin,
}

export function ProjectIcon({ name, className = "h-5 w-5" }) {
  const Icon = iconMap[name] ?? Box

  return <Icon className={className} strokeWidth={2} />
}