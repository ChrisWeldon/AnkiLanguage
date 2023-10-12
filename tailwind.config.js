/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            "base03" : "#002b36",
            "base02" : "#073642",
            "base01" : "#586e75",
            "base00" : "#657b83",
            "base0" : "#839496",
            "base1" : "#93a1a1",
            "base2" : "#eee8d5",
            "base3" : "#fdf6e3",
            "yellow" : "#b58900",
            "orange" : "#cb4b16",
            "red" : "#dc322f",
            "magenta" : "#d33682",
            "violet" : "#6c71c4",
            "blue" : "#268bd2",
            "cyan" : "#2aa198",
            "green" : "#859900",
        },
        backgroundColor: (theme) => ({
            "app": theme('colors.base3') 
        }),
        borderColor: (theme) => ({
            "default": theme('colors.base1'),
            "hover": theme('colors.red')
        }),
        keyframes: {
            tofro: {
                '0%, 100%': { transform: 'translateX(0%)' },
                '50%': { transform: 'translateX(50%)' }
            },
            noteload:{
                '0%, 100%': { backgroundPosition: '0% 0%;' },
                '50%': { backgroundPosition: '50% 0%;' }
            }

        },
        animation: {
            tofro: 'tofro 2s ease-in-out infinite',
            noteload: 'noteload 2s ease-in-out infinite'
        },
    },
  },
  plugins: [
  ],
  variants: {
      extend: {
        backgroundColor: ['active'],

      }
  }
}
