/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // https://www.figma.com/design/AH4N0fma2EvI30IltjBGPy/%E2%9C%A8-CDS-Styles-(Variables)?node-id=46-168
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      ocsblue: 'rgba(0, 82, 255, 1)',
      ocspink: '#FF8DCF',
      ocsyellow: '#FEE002',
      illoblack: '#0A0B0D',
      transparent: 'transparent',
      blue: {
        0: '#001033',
        5: '#011D5B',
        10: '#012A82',
        15: '#03339A',
        20: '#053BB1',
        30: '#0A48CE',
        40: '#1354E1',
        50: '#2162EE',
        60: '#3773F5',
        70: '#578BFA',
        80: '#84AAFD',
        90: '#B9CFFF',
        100: '#F5F8FF',
        400: '#688CEC',
        500: '#0455FF',
        600: '#0052FF',
      },
      gray: {
        dark: '#0F1012',
        0: '#0A0B0D',
        5: '#141519',
        10: '#1E2025',
        15: '#282B31',
        20: '#32353D',
        30: '#464B55',
        40: '#5B616E',
        50: '#727886',
        60: '#8A919E',
        70: '#A5AAB6',
        80: '#C1C6CF',
        90: '#E0E2E7',
        100: '#FFFFFF',
      },
      green: {
        0: '#F5FFFB',
        5: '#003D24',
        10: '#01472A',
        15: '#025230',
        20: '#025C37',
        30: '#067044',
        40: '#0B8552',
        50: '#159962',
        60: '#098551',
        70: '#44C28D',
        80: '#6FD6AB',
        90: '#ABEBD0',
        100: '#F5FFFB',
      },
      indigo: {
        0: '#080F33',
        5: '#0E1B5B',
        10: '#152782',
        15: '#1B2F9A',
        20: '#2138B1',
        30: '#3049CE',
        40: '#445CE1',
        50: '#5C71EE',
        60: '#798AF5',
        70: '#99A5FA',
        80: '#BBC2FD',
        90: '#DBDFFF',
        100: '#F6F7FF',
      },
      orange: {
        0: '#330D00',
        5: '#4F1400',
        10: '#6B1C01',
        15: '#832402',
        20: '#9B2C04',
        30: '#BD3B09',
        40: '#D54C12',
        50: '#E66020',
        60: '#F07836',
        70: '#F89656',
        80: '#FCB983',
        90: '#FEDBB9',
        100: '#FFFAF5',
      },
      pink: {
        0: '#330A2C',
        5: '#460E3D',
        10: '#59134E',
        15: '#6C185E',
        20: '#7E1E6F',
        30: '#9F2C8E',
        40: '#BB40AA',
        50: '#D058C1',
        60: '#E175D6',
        70: '#ED95E6',
        80: '#F6B8F3',
        90: '#FCD9FB',
        100: '#FFF5FF',
      },
      purple: {
        0: '#190D33',
        5: '#2E175B',
        10: '#422282',
        15: '#502A9A',
        20: '#5D32B1',
        30: '#7443CE',
        40: '#8956E1',
        50: '#9D6DEE',
        60: '#B388F5',
        70: '#C9A4FA',
        80: '#DDC3FD',
        90: '#EEDFFF',
        100: '#FBF7FF',
      },
      red: {
        0: '#330004',
        5: '#4F0007',
        10: '#6B010A',
        15: '#83040E',
        20: '#9B0713',
        30: '#BD1321',
        40: '#D52634',
        50: '#E6404E',
        60: '#F0616D',
        70: '#F88690',
        80: '#FCAEB5',
        90: '#FED5D8',
        100: '#FFF5F6',
      },
      teal: {
        0: '#001426',
        5: '#00203B',
        10: '#002D4F',
        15: '#003A63',
        20: '#004876',
        30: '#006399',
        40: '#007DB6',
        50: '#0095CD',
        60: '#00AADF',
        70: '#06BEEC',
        80: '#45D9F5',
        90: '#95EFFB',
        100: '#F0FEFF',
      },
      yellow: {
        0: '#000000',
        5: '#160700',
        10: '#2B0F00',
        15: '#411B00',
        20: '#582900',
        30: '#814900',
        40: '#A96D00',
        50: '#CC9200',
        60: '#E9B300',
        70: '#FFD200',
        80: '#FFDF44',
        90: '#FFED96',
        100: '#FFFCF1',
      },
      elevation: {
        level: {
          1: '#D9D9D9',
          2: '#D9D9D9',
        },
      },
      palette: {
        background: '#0A0B0D',
        backgroundAlternate: '#141519',
        backgroundOverlay: '#0A0B0D',
        foreground: '#FFFFFF',
        foregroundMuted: '#8A919E',
        line: 'rgba(91, 97, 110, 0.2)',
        lineHeavy: '#8A919E',
        negative: '#F0616D',
        negativeForeground: '#0A0B0D',
        positive: '#27AD75',
        positiveForeground: '#0A0B0D',
        primary: '#3773F5',
        primaryForeground: '#0A0B0D',
        primaryWash: '#001033',
        secondary: '#32353D',
        secondaryForeground: '#FFFFFF',
      },
      state: {
        b: {
          disabled: '#0A0B0D',
          hovered: '#0F1012',
          pressed: '#1E1F20',
        },
        bA: {
          disabled: '#0E0F12',
          hovered: '#191A1E',
          pressed: '#27282B',
        },
        f: {
          disabled: '#676869',
          hovered: '#E1E1E1',
          pressed: '#D2D2D2',
        },
        fM: {
          disabled: '#3B3E44',
          hovered: '#9299A5',
          pressed: '#999FAB',
        },
        n: {
          disabled: '#612C31',
          hovered: '#F06E79',
          pressed: '#F17780',
        },
        p: {
          disabled: '#1B3365',
          hovered: '#477EF5',
          pressed: '#5386F5',
        },
        pO: {
          disabled: '#154935',
          hovered: '#38B380',
          pressed: '#45B787',
        },
        pW: {
          disabled: '#060D1B',
          hovered: '#051537',
          pressed: '#142343',
        },
        s: {
          disabled: '#191B1F',
          hovered: '#3A3D45',
          pressed: '#474950',
        },
      },
      translucent: {
        100: 'rgba(255,255,255,0.1)',
        200: 'rgba(255,255,255,0.2)',
        300: 'rgba(255,255,255,0.3)',
        400: 'rgba(255,255,255,0.4)',
        500: 'rgba(255,255,255,0.5)',
        600: 'rgba(255,255,255,0.6)',
        700: 'rgba(255,255,255,0.7)',
        800: 'rgba(255,255,255,0.8)',
        900: 'rgba(255,255,255,0.9)',
      },
      button: {
        white: 'rgba(255, 255, 255, 1)',
        whiteHover: 'rgba(219, 221, 224, 1)',
        whiteActive: 'rgba(191, 196, 207, 1)',
        black: 'rgba(10, 11, 13, 1)',
        blackHover: 'rgba(39, 40, 42, 1)',
        blackActive: 'rgba(80, 85, 96, 1)',
      },
    },
    extend: {
      borderRadius: {
        DEFAULT: '3px',
        full: '9999px',
      },
      screens: {
        '3xl': '2048px',
      },
      spacing: {
        80: '20rem',
      },
      fontFamily: {
        display: ['var(--font-coinbase-display)', ...defaultTheme.fontFamily.sans],
        sans: ['var(--font-coinbase-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-coinbase-mono)', ...defaultTheme.fontFamily.sans],
        britney: ['var(--font-britney)', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        empowered_by_coinbase: "url('/images/empowered_by_coinbase.png')",
        bootcamp_background_image: "url('/images/bootcamp-background.png')",
      },
      transitionTimingFunction: {
        partners: 'cubic-bezier(0.25, 1, 0.25, 1)',
      },
      boxShadow: {
        'light-button-3d':
          '0px -8px 24px 0px rgba(0, 0, 0, 0.25) inset, 0px -2px 4px 0px rgba(255, 255, 255, 0) inset, 0px 2px 10px 0px rgba(35, 36, 38, 1) inset, 0px 4px 10px 0px rgba(0, 82, 255, 0.32), 0px 4px 24px 0px rgba(45, 72, 72, 0.5) inset, 0px 8px 10px 0px rgba(255, 255, 255, 0.25) inset;',
        'dark-button-3d':
          '0px 8px 24px 0px rgba(255, 255, 255, 0.5) inset, 0px -8px 24px 0px rgba(0, 0, 0, 0.25) inset, 0px -2px 4px 0px rgba(255, 255, 255, 0.25) inset, 0px 2px 10px 0px rgba(88, 89, 91, 1) inset, 0px 4px 10px 0px rgba(0, 82, 255, 0.32), 0px 4px 24px 0px rgba(155, 216, 217, 0.5) inset, 0px 8px 10px 0px rgba(255, 255, 255, 0.25) inset;',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(-2.5%)' },
          '50%': { transform: 'translateY(2.5%)' },
        },
        slide: {
          '0%': { transform: 'translateX(-10rem) rotate(6deg)' },
          '50%': { transform: 'translateX(0) rotate(6deg)' },
          '100%': { transform: 'translateX(0) rotate(6deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 3s linear infinite',
        bounce: 'bounce 1s ease-in-out infinite',
        slide: 'slide 1s linear infinite',
      },
    },
  },
  plugins: [],
};
