module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        width: {
          'filled': '100rem',
        },
        spacing: {
          'last': '97vw',
          '200px':'200px',
          '350px':'350px',
          '400px':'400px'
        },
        screens: {
          'mine': '420px',
        }
  
      },
    },
    plugins: [],
  }