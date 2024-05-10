import { styled } from '@mui/material/styles';

const OrderContent = styled('div')(({ theme }) => ({
  width: '100%', // 전체 너비 사용
  maxWidth: '800px', // 최대 너비 설정
  margin: 'auto', // 자동 마진으로 중앙 정렬
  padding: '0 5px', // 일반적인 양 옆 패딩
  boxSizing: 'border-box', // 패딩과 보더가 너비에 포함되도록 설정
  fontSize: theme.typography.body2.fontSize, // 기본 폰트 사이즈

  [theme.breakpoints.up('sm')]: {
    padding: '0px', // 360px 화면에서의 패딩
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    padding: '0px', // 768px 화면에서의 패딩
    width: '65%',
  },
  [theme.breakpoints.up('lg')]: {
    padding: '0 10px', // 1440px 화면에서의 패딩
    width: '70%',
  },
  [theme.breakpoints.up('xl')]: {
    width: '75%',
  },
}));

export default OrderContent;
