import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: { center: true, padding: "1.2rem", screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        background: "hsl(var(--background))", foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))", "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))", "primary-foreground": "hsl(var(--primary-foreground))",
        border: "hsl(var(--border))", muted: "hsl(var(--muted))", "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))", ring: "hsl(var(--ring))",
      },
      borderRadius: { lg: "1rem", md: ".7rem", sm: ".5rem" },
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
