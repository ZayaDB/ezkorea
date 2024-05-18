import { styled } from '@mui/material/styles';

const ContentArea = styled('div')(({ theme }) => ({
  width: '100%', // 전체 너비 사용
  maxWidth: '1488px', // 최대 너비 설정
  margin: 'auto', // 자동 마진으로 중앙 정렬
  padding: '0 20px 60px 0', // 일반적인 양 옆 패딩
  boxSizing: 'border-box', // 패딩과 보더가 너비에 포함 안되도록 설정
  fontSize: theme.typography.body2.fontSize, // 기본 폰트 사이즈

  [theme.breakpoints.up('sm')]: {
    padding: '0 20px 60px', // 360px 화면에서의 패딩
    fontSize: theme.typography.body2.fontSize, // 작은 화면에 맞춘 폰트 사이즈
  },
  [theme.breakpoints.up('md')]: {
    padding: '0 144px', // 768px 화면에서의 패딩
    fontSize: theme.typography.body1.fontSize, // 중간 크기 화면에 맞춘 폰트 사이즈
  },
  [theme.breakpoints.up('lg')]: {
    padding: '0 144px', // 1440px 화면에서의 패딩
    fontSize: theme.typography.h3.fontSize, // 더 큰 화면에 맞춘 폰트 사이즈
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: theme.typography.h2.fontSize, // 가장 큰 화면에 맞춘 폰트 사이즈
  },
}));

export default ContentArea;
