module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#0e0e0e',
        secondary: '#181818',
        third: '#121212',
        light: '#fefefe',
        danger: '#ed3134',
        pink: '#e58788',
        gold: '#f2a115',
        blue: '#1562f2',
        warning: '#cea210',
        gray: '#515151',
      },
      boxShadow: {
        danger: '0 0 10px 0 #ed3134',
        warning: '0 0 10px 0 #cea210',
      },
      gridTemplateColumns: {
        chatBox: '3fr 1fr',
      },
      gridTemplateRows: {
        full: 'min-content min-content',
      },
      height: {
        all: 'calc(100vh - 5rem)',
      },
      minHeight: {
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        24: '6rem',
      },
      maxWidth: {
        '1/2': '50%',
        '1/3': '33.33%',
        '2/3': '66.66%',
        '1/4': '25%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
