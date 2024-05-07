import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import CustomLink from './CustomLink';
import CategoryDropDown from './CategoryDropDown';

const ToolBar: React.FC = () => {
  const [isShoppingHovered, setIsShoppingHovered] = useState(false);

  return (
    <Toolbar variant='dense'>
      <CustomLink to='/'>쇼핑홈</CustomLink>
      <div
        style={{ position: 'relative', display: 'inline-block' }}
        onMouseEnter={() => setIsShoppingHovered(true)}
        onMouseLeave={() => setIsShoppingHovered(false)}
      >
        <CustomLink to='/shop' hoverColor='#5FF531'>
          카테고리
        </CustomLink>
        {isShoppingHovered && <CategoryDropDown />}
      </div>
      <CustomLink to='/best'>베스트</CustomLink>
      <CustomLink to='/sale'>세일</CustomLink>
    </Toolbar>
  );
};

export default ToolBar;