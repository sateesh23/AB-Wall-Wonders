import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      maxWidth: {
        container: "1280px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Hero component brand colors
        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-foreground))",
          // AB Wall Wonders Brand Colors
          sage: {
            50: "hsl(var(--sage-50))",
            100: "hsl(var(--sage-100))",
            200: "hsl(var(--sage-200))",
            300: "hsl(var(--sage-300))",
            400: "hsl(var(--sage-400))",
            500: "hsl(var(--sage-500))",
            600: "hsl(var(--sage-600))",
            700: "hsl(var(--sage-700))",
            800: "hsl(var(--sage-800))",
            900: "hsl(var(--sage-900))",
          },
          cream: {
            50: "hsl(var(--cream-50))",
            100: "hsl(var(--cream-100))",
            200: "hsl(var(--cream-200))",
            300: "hsl(var(--cream-300))",
            400: "hsl(var(--cream-400))",
            500: "hsl(var(--cream-500))",
          },
          earth: {
            50: "hsl(var(--earth-50))",
            100: "hsl(var(--earth-100))",
            200: "hsl(var(--earth-200))",
            300: "hsl(var(--earth-300))",
            400: "hsl(var(--earth-400))",
            500: "hsl(var(--earth-500))",
            600: "hsl(var(--earth-600))",
            700: "hsl(var(--earth-700))",
            800: "hsl(var(--earth-800))",
            900: "hsl(var(--earth-900))",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        appear: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "appear-zoom": {
          "0%": {
            opacity: "0",
            transform: "scale(0.98)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' }
        },
        "marquee-vertical": {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        appear: "appear 0.5s ease-out forwards",
        "appear-zoom": "appear-zoom 0.8s ease-out forwards",
        marquee: 'marquee var(--duration) linear infinite',
        "marquee-vertical": 'marquee-vertical var(--duration) linear infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
