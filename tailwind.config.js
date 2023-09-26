/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      screens: {
        sm: '640px', // Small screens and up
        md: '768px', // Medium screens and up
        lg: '1024px', // Large screens and up
        xl: '1280px', // Extra large screens and up
      },
      colors: {
        primary: {
          main: '#f44336',
          dark: '#aa2e25',
          light: '#f6685e',
        },
        secondary: {
          main: '#9c27b0',
          dark: '#7b1fa2',
          light: '#ba68c8',
        },
        error: {
          main: '#d32f2f',
          dark: '#c62828',
          light: '#ef5350',
        },
        warning: {
          main: '#ff9800',
          dark: '#f57c00',
          light: '#ffb74d',
        },
        info: {
          main: '#2196f3',
          dark: '#1976d2',
          light: '#51adf6',
        },
        success: {
          main: '#4caf50',
          dark: '#388e3c',
          light: '#81c784',
        },
        text: {
          primary: '#212121',
          secondary: '#757575',
          disabled: '#9e9e9e',
          hint: '#bdbdbd',
          contrast: '#fff',
        },
        bg: {
          primary: '#fff',
          secondary: 'rgb(239, 243, 244)',
          disabled: '#e0e0e0',
        },
        border: {
          primary: '#757575',
          secondary: 'rgb(239, 243, 244)',
        },
        hover: {
          primary: 'rgb(239, 243, 244)',
        },
      },
    },
  },
  plugins: [],
}
