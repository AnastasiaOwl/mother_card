    // tailwind.config.js
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
      ],
     theme: {
        extend: {
        keyframes: {
            sway: {
            '0%, 100%': { transform: 'rotate(-1deg)' },
            '50%': { transform: 'rotate(1deg)' },
            },
        },
        animation: {
            sway: 'sway 2s ease-in-out infinite',
        },
        },
    },
      plugins: [],
    };