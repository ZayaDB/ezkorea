import { createTheme } from '@mui/material/styles';

const pretendardFontFace = `
@font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}
`;

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // 작은 스마트폰
      sm: 360, // 일반 스마트폰
      md: 768, // 태블릿
      lg: 1440, // 맥북 및 중간 크기의 화면
      xl: 1920, // 대형 화면
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        ${pretendardFontFace}
        body {
          font-family: 'Pretendard-Regular', sans-serif;
        }
      `,
    },
  },
  typography: {
    fontFamily: 'Pretendard-Regular, sans-serif',
    fontSize: 16,
    h1: { fontSize: '24px', fontWeight: 700 }, // xxl
    h2: { fontSize: '22px', fontWeight: 500 }, // xl
    h3: { fontSize: '18px', fontWeight: 400 }, // l
    body1: { fontSize: '16px', fontWeight: 400 }, // m
    body2: { fontSize: '14px', fontWeight: 400 }, // s
    caption: { fontSize: '12px', fontWeight: 400 }, // xs
    overline: { fontSize: '11px', fontWeight: 400 }, // xxs
  },

  palette: {
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
    grey: {
      900: '#191919',
      800: '#333333',
      700: '#4C4C4C',
      600: '#666666',
      500: '#7F7F7F',
      400: '#999999',
      300: '#B2B2B2',
      200: '#CCCCCC',
      100: '#E5E5E5',
      50: '#F6F6F6',
    },
    primary: {
      main: '#5FF531', // point-500
    },
    secondary: {
      main: '#B7FF8B', // point-200
    },
  },
});

export default theme;
