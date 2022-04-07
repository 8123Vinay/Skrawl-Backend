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
          '250px':'250px',
          '350px':'350px',
          '400px':'400px',
          '500px':'500px',
          '600px':'600px',
          '700px':'700px'
        },
        screens: {
          'mine': '500px',
          'fine':'700px',
          'canvas':'840px',
        }
  
      },
    },
    plugins: [],
  }