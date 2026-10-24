/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        apple: {
          bg: '#0a0a0c',
          panel: 'rgba(22, 22, 28, 0.72)',
          pill: 'rgba(32, 32, 40, 0.78)',
          border: 'rgba(255, 255, 255, 0.08)',
          highlight: '#38bdf8',
          subtext: '#94a3b8',
        },
        anatomy: {
          skeletal: '#e2e8f0', // Ivory bone
          muscular: '#f43f5e', // Crimson ruby muscle
          visceral: '#f59e0b', // Amber organ
          nervous: '#38bdf8',  // Cyan nerve
          vascular: '#ef4444', // Cardinal blood
          lymphatic: '#10b981',// Emerald
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: [
          '"SF Mono"',
          'ui-monospace',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      backdropBlur: {
        'apple': '24px',
      },
      boxShadow: {
        'apple-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'apple-pill': '0 4px 24px -1px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'apple-card': '0 12px 40px -4px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
        'glow-accent': '0 0 25px -5px rgba(56, 189, 248, 0.4)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.08)', opacity: '1' }
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-left': 'slideLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }
    },
  },
  plugins: [],
}
