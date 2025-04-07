
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate"; // Import the plugin

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
         // Add secondary-accent
         "secondary-accent": {
           DEFAULT: "hsl(var(--secondary-accent))",
           foreground: "hsl(var(--secondary-accent-foreground))",
         },
         popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        leny: {
          50: "#F0F7FF",
          100: "#E0EFFF",
          200: "#B8DBFF",
          300: "#8CC2FF",
          400: "#5AA2FF",
          500: "#0E78F9",
          600: "#0A60E0",
          700: "#0850B0",
          800: "#043A80",
          900: "#022550",
        },
        medical: {
          red: "#E63946",
          green: "#2A9D8F",
          yellow: "#F4A261",
          purple: "#6A67CE",
          blue: "#4A90E2",
          teal: "#20B2AA",
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
          selected: "hsl(var(--sidebar-accent))", // Merged selected bg here
        },
        // Removed duplicate sidebar key
        // Refined Perplexity-inspired palette
        perplexity: {
          teal: {
            DEFAULT: '#2A7D68', // Updated primary teal
            light: '#3E8C74', // Adjusted light variant
            dark: '#1F6351', // Adjusted dark variant
            bg: '#F1F8F6', // Updated active/selected background
          },
          purple: { // Original accent
            DEFAULT: '#5436DA', 
          },
          accentSecondary: { // New secondary accent
             DEFAULT: '#5969B1',
             foreground: '#FFFFFF', // Assuming white text on this
          },
          text: {
            primary: '#262626', // Updated main text
            secondary: '#6B6C7B', // Kept light text
            tertiary: '#9CA3AF', // Kept lighter text
          },
          bg: {
            main: '#FAFAF8', // Updated main background
            sidebar: '#F9FAFB', // Kept sidebar background
            hover: '#F3F4F6', // Kept hover background
            active: '#F1F8F6', // Updated active background (same as teal.bg)
          },
          border: '#E5E7EB', // Kept border color
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 5s ease-in-out infinite",
        fadeIn: "fadeIn 0.5s ease-out",
        slideUp: "slideUp 0.5s ease-out",
        slideRight: "slideRight 0.5s ease-out",
      },
      fontFamily: {
        sans: ["Inter var", "Inter", "system-ui", "sans-serif"],
        display: ["SF Pro Display", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        glass: "0 4px 20px rgba(0, 0, 0, 0.03)",
        card: "0 2px 12px 0 rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.02)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-light-blue': 'linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)',
        'gradient-blue': 'linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)',
      }
    },
  },
  plugins: [tailwindcssAnimate], // Use the imported plugin
} satisfies Config;
