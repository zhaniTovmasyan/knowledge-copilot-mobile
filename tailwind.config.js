/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#0a1f1c",
        surface: "#112820",
        card: "#1a3530",
        accent: "#00e5c8",
        "accent-muted": "rgba(0,229,200,0.12)",
        destructive: "#ff4444",
        "text-primary": "#ffffff",
        "text-secondary": "rgba(255,255,255,0.5)",
        "text-muted": "rgba(255,255,255,0.25)",
        border: "rgba(255,255,255,0.07)",
      },
    },
  },
  plugins: [],
};
