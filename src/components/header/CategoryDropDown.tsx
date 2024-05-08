import React from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/system';

const DropdownContainer = styled('div')({
  position: 'absolute',
  top: '100%',
  left: 0,
  // zIndex: 1,
  minWidth: '120px',
  backgroundColor: 'white',
  boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
  borderRadius: '3px',
  display: 'flex',
  flexDirection: 'column', // 위에서 아래로 펼치도록 수정
  padding: '16px',
  fontSize: '14px',
  marginLeft: '-32px',
});

const LinkItem = styled(NavLink)({
  padding: '8px 12px',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  color: '#191919',
  '&:hover': {
    backgroundColor: '#ffffff',
    borderRadius: '3px',
    color: '#5ff531',
  },
});

const categories = [
  { name: 'FURNITURE', link: '/saved-feeds' },
  { name: '책상', link: '/category1' },
  { name: '의자', link: '/category2' },
  { name: '모니터암/받침대', link: '/category3' },
  { name: '거치대', link: '/category4' },
  { name: '서랍장', link: '/category5' },
];

const CategoryDropDown: React.FC = () => {
  return (
    <DropdownContainer sx={{ zIndex: 3000 }}>
      {categories.map((category, index) => (
        <LinkItem key={index} color='inherit' to={category.link}>
          {category.name}
        </LinkItem>
      ))}
    </DropdownContainer>
  );
};

export default CategoryDropDown;
