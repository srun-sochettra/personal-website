/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "egg-white":    "#FAF6EE",
        "yolk-gold":    "#D4A847",
        "shell-dark":   "#2C2416",
        "aged-cream":   "#9C8A6E",
        "shell-border": "#E8DFC8",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans:  ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "float-slow":    "floatSlow 6s ease-in-out infinite",
        "float-med":     "floatMed 4.5s ease-in-out infinite",
        "float-fast":    "floatFast 3.5s ease-in-out infinite",
        "bob":           "bob 3s ease-in-out infinite",
        "fade-in":       "fadeIn 0.6s ease-out forwards",
        "fade-up":       "fadeUp 0.6s ease-out forwards",
        "count-up":      "countUp 0.3s ease-out forwards",
        "crack":         "crack 0.5s ease-out forwards",
        "slide-in-right":"slideInRight 0.4s ease-out forwards",
        "pulse-soft":    "pulseSoft 2s ease-in-out infinite",
        "bounce-arrow":  "bounceArrow 1.5s ease-in-out infinite",
        "skeleton":      "skeleton 1.5s ease-in-out infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%":      { transform: "translateY(-20px) rotate(5deg)" },
        },
        floatMed: {
          "0%, 100%": { transform: "translateY(0px) rotate(-3deg)" },
          "50%":      { transform: "translateY(-15px) rotate(3deg)" },
        },
        floatFast: {
          "0%, 100%": { transform: "translateY(0px) rotate(2deg)" },
          "50%":      { transform: "translateY(-10px) rotate(-2deg)" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounceArrow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(6px)" },
        },
        skeleton: {
          "0%, 100%": { opacity: "0.4" },
          "50%":      { opacity: "0.8" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%":      { opacity: "1" },
        },
        crack: {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "60%":  { opacity: "1", transform: "scale(1.02)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideInRight: {
          "0%":   { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)",    opacity: "1" },
        },
        countUp: {
          "0%":   { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        "egg":      "0 4px 20px rgba(212, 168, 71, 0.15)",
        "egg-md":   "0 8px 30px rgba(212, 168, 71, 0.25)",
        "egg-lg":   "0 16px 50px rgba(212, 168, 71, 0.3)",
        "card":     "0 2px 12px rgba(44, 36, 22, 0.08)",
        "card-hover":"0 8px 30px rgba(44, 36, 22, 0.12)",
      },
      borderRadius: {
        "egg": "50% 50% 50% 50% / 60% 60% 40% 40%",
      },
    },
  },
  plugins: [],
}