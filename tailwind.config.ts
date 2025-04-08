
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
           DEFAULT: "#4A9270", // New medical-feeling green
           foreground: "#ffffff", // White text on primary
           dark: "#3A7258", // Darker variant
           light: "#E8F4EF", // Very light green for backgrounds
           medium: "#6AB187", // Complementary lighter green
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
           DEFAULT: "#E09F5A", // Warm accent for important actions
           foreground: "#ffffff", // White text on accent
         },
         // Secondary accent (lighter green)
         "secondary-accent": {
           DEFAULT: "#6AB187", // Complementary lighter green
           foreground: "#ffffff", // White text on secondary accent
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
           green: "#4A9270", // Match new primary
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
         // Updated palette with new colors
         perplexity: {
           teal: {
             DEFAULT: '#4A9270', // Match new primary
             light: '#6AB187', // Match new secondary
             dark: '#3A7258', // Match new primary dark
             bg: '#F4F7F5', // Updated active/selected background
           },
           purple: { // Keep for compatibility
             DEFAULT: '#5436DA', 
           },
           accentSecondary: { // New warm accent
             DEFAULT: '#E09F5A',
             foreground: '#FFFFFF',
           },
           text: {
             primary: '#2D3C35', // Dark green-gray for primary text
             secondary: '#5A6D64', // Medium green-gray for secondary text
             tertiary: '#92A69B', // Muted text
           },
           bg: {
             main: '#fafbfa', // Subtle green tint for body
             sidebar: '#F4F7F5', // Light green-tinted background
             hover: '#E8F4EF', // Hover background
             active: '#E8F4EF', // Active background
           },
           border: '#E1EAE5', // Light green-tinted border
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
        morph: {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "25%": { transform: "scale(1.1) rotate(5deg)" },
          "50%": { transform: "scale(0.9) rotate(-5deg)" },
          "75%": { transform: "scale(1.05) rotate(3deg)" },
          "100%": { transform: "scale(1) rotate(0deg)" },
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
        morph: "morph 3s ease-in-out infinite",
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
        'gradient-green': 'linear-gradient(135deg, #E8F4EF 0%, #F4F7F5 100%)',
        'gradient-warm': 'linear-gradient(135deg, rgba(224, 159, 90, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
        'texture-dots': 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%234a9270\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
        'childish-scribbles': `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent('<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><path d="M10 10 C 20 20, 40 0, 50 10 S 70 0, 80 10" stroke="#4A9270" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-opacity="0.6" /><path d="M10 30 C 20 40, 40 20, 50 30 S 70 20, 80 30" stroke="#6AB187" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-opacity="0.6" /><path d="M10 50 C 20 60, 40 40, 50 50 S 70 40, 80 50" stroke="#E09F5A" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-opacity="0.6" /><circle cx="20" cy="70" r="5" fill="none" stroke="#4A9270" stroke-width="1.5" stroke-opacity="0.6" /><circle cx="50" cy="80" r="3" fill="#6AB187" fill-opacity="0.3" /><circle cx="80" cy="70" r="4" fill="none" stroke="#E09F5A" stroke-width="1.5" stroke-opacity="0.6" /><rect x="65" y="15" width="10" height="10" rx="2" fill="none" stroke="#4A9270" stroke-width="1.5" transform="rotate(15 70 20)" stroke-opacity="0.6" /></svg>')}")`, 
        // New scattered pattern - Reduced opacity
        'scattered-shapes': `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent('<svg width="250" height="250" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="40" r="8" fill="none" stroke="#4A9270" stroke-width="1.5" stroke-opacity="0.2" /><rect x="150" y="20" width="15" height="15" rx="3" fill="#6AB187" fill-opacity="0.1" transform="rotate(25 157.5 27.5)" /><path d="M50 180 Q 70 150, 90 180 T 130 180" stroke="#E09F5A" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-opacity="0.2" /><circle cx="200" cy="210" r="5" fill="#4A9270" fill-opacity="0.1" /><rect x="80" y="90" width="12" height="12" fill="none" stroke="#E09F5A" stroke-width="1.5" stroke-opacity="0.2" transform="rotate(-10 86 96)" /><path d="M220 50 L230 70 L210 70 Z" fill="#6AB187" fill-opacity="0.1" /></svg>')}")`,
      }
    },
  },
  plugins: [tailwindcssAnimate], // Use the imported plugin
} satisfies Config;
