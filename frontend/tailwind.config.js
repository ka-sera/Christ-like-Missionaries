/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // LAYERED BLUE PALETTE: Multi-shade system for depth and visual richness
        // Deep Navy (darkest) - Primary brand, page backgrounds
        // Navy - Secondary dark surfaces, depth layers
        // Medium Blue - Main sections, containers
        // Soft Blue - Cards, highlights, interactive states
        // Light Blue - Subtle backgrounds, accents
        // Ultra Light Blue - Near-white backgrounds
        
        navy: {
          50: '#f0f5fb',   /* Ultra light - subtle backgrounds */
          100: '#d9e5f5',  /* Very light - secondary bg */
          150: '#c4d9f0',  /* Light - card borders, subtle dividers */
          200: '#a0c1e0',  /* Soft light - hover states */
          250: '#7ba8d1',  /* Soft blue - cards & highlights */
          300: '#5a8fc3',  /* Medium-soft - sections */
          400: '#3d70a8',  /* Medium - containers */
          500: '#2b5ba8',  /* Medium-dark - panels */
          600: '#1b3a5c',  /* Dark navy - secondary surfaces */
          700: '#0f2540',  /* Darker - tertiary backgrounds */
          800: '#0B2545',  /* Deep Navy PRIMARY - main background */
          900: '#020d15',  /* Ultra dark - accents & borders */
        },
        
        // Extended light blue variants for subtle layering
        blue: {
          50: '#f5fafe',
          100: '#e8f4fd',
          200: '#c4e1f7',
          300: '#9ecbf0',
          400: '#6ba8e3',
          500: '#4a7ba7',
          600: '#3a6b99',
          700: '#2d5a8a',
          800: '#1f4470',
          900: '#142d52',
        },
        
        // Secondary: soft teal for accents and secondary CTAs
        teal: {
          50: '#e8fbfa',
          100: '#cff7f4',
          200: '#b5efe9',
          300: '#8de3dd',
          400: '#5fd5cf',
          500: '#2BA7A0',
          600: '#239086',
          700: '#1b6b63',
          800: '#154f4a',
          900: '#0e2b28',
        },
        
        // Accent: warm gold for emphasis and CTAs
        gold: {
          50: '#fff8ea',
          100: '#fff0d1',
          200: '#ffe0a3',
          300: '#ffd075',
          400: '#ffc557',
          500: '#FFC857',
          600: '#e6b84b',
          700: '#c09236',
          800: '#8f6226',
          900: '#442f12',
        },
        
        // Neutral surfaces for text and subtle elements
        surface: {
          50: '#f7f9fb',
          100: '#eef3f7',
          200: '#dfe9ef',
          300: '#cfdfe6',
          400: '#b1c1cc',
          500: '#94a2b0',
          600: '#6f7b88',
          700: '#49515a',
          800: '#2e3438',
          900: '#0f1315',
        },
      }
    },
  },
  plugins: [],
}
