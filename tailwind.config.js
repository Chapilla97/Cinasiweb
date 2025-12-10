/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        "bounce-once": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shine: {
          "100%": { left: "125%" },
        },
        // TU ANIMACIÓN PERSONALIZADA:
        // 0% a 50% (3 seg): Crece a 1.5 (150%)
        // 50% a 100% (3 seg): Regresa a 1
        breathing: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.5)" },
        },
      },
      animation: {
        "bounce-once": "bounce-once 0.5s ease-in-out",
        "fade-in": "fade-in 0.5s ease-out",
        shine: "shine 3s infinite",
        // 6 segundos total (3 subida + 3 bajada)
        breathing: "breathing 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
