/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,jsx,ts}",
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
      backgroundImage: {
        'footer-texture': "url('/img/footer-texture.png')",
      },
      fontFamily: {
        primaryMedium: ["Medium"],
        title: ["Montserrat"],
    },
    spacing: {
      '58': '230px',
    },
    linearGradientColors: {
      'custom-gradient': ['#69B9FF', '#0061B6'],
    },
    gradientColorStopPositions: {
      33: '33%',
    },
      colors: {
        'materit':'#69B9FF',
        'materib':'#0061B6',
        'mahab':'#80F166',
        'mahat':'#0A853C',
        'latihanb':'#FFD800',
        'latihant':'#F57B08',
        'penilaianb':'#FF79B1',
        'penilaiant':'#F5086C',
        'blue': '#10487A',
        'ground': '#FBF7F7',
        'sky': '#DAEDFF',
        'even': '#F4F3FF',
        'trash': '#CC0000',
        'edit': '#00B955',
        'batal': '#FF6666',
        'buttonx': '#ffd9d9',
        'odd': '#F4F3FF',
        'konfirmasi': '#44A7FF',
        'sulit': '#FF3333',
        'sedang': '#FFE033',
        'mudah': '#56EC33',
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("daisyui", "tailwindcss-animate",'tailwindcss-gradients')],
});