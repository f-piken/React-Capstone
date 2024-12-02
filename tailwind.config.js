module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fadeIn: {
        '0%': { opacity: '0', transform: 'translateY(10px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(50px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 1s ease-out forwards',
        fadeIn: 'fadeIn 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
};
