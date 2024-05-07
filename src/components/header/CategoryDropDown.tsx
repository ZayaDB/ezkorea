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
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column', // 위에서 아래로 펼치도록 수정
  padding: '16px',
});

const LinkItem = styled(NavLink)({
  padding: '8px 16px',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
  },
});

const categories = [
  { name: '저장한 피드', link: '/saved-feeds' },
  { name: '카테고리1', link: '/category1' },
  { name: '카테고리2', link: '/category2' },
  { name: '카테고리3', link: '/category3' },
  { name: '카테고리4', link: '/category4' },
  { name: '카테고리5', link: '/category5' },
];

const CategoryDropDown: React.FC = () => {
  return (
    <DropdownContainer sx={{ zIndex: 3000 }}>
      {categories.map((category, index) => (
        <LinkItem
          key={index}
          color='inherit'
          to={category.link}
        >
          {category.name}
        </LinkItem>
      ))}
    </DropdownContainer>
  );
};

export default CategoryDropDown;



