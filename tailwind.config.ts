import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))'
        }
      },
      fontFamily: {
        sans: [
          'var(--font-geist-sans)'
        ],
        mono: [
          'var(--font-geist-mono)'
        ],
        montserrat: [
          'var(--font-montserrat)'
        ],
        opensans: [
          'var(--font-opensans)'
        ]
      }
    },
    animation: {
      'slide-out-to-right': 'slideOutToRight 500ms cubic-bezier(0.37, 0, 0.63, 1) 0s 1 normal forwards',
      'slide-out-to-left': 'slideOutToLeft 500ms cubic-bezier(0.37, 0, 0.63, 1) 0s 1 normal forwards',
      'slide-in-from-left': 'slideInFromLeft 500ms cubic-bezier(0.37, 0, 0.63, 1) 0s 1 normal forwards',
      'slide-in-from-right': 'slideInFromRight 500ms cubic-bezier(0.37, 0, 0.63, 1) 0s 1 normal forwards',
      'arrow-slide': 'arrow-slide 2s ease-in-out infinite',
      'aside-slide-in': 'aside 500ms cubic-bezier(0.16, 1, 0.3, 1) 0s 1 normal forwards'
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')]
}
export default config
