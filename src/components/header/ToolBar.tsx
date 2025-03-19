import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import CustomLink from './CustomLink';
import CategoryDropDown from './CategoryDropDown';

const ToolBar: React.FC = () => {
  const [isShoppingHovered, setIsShoppingHovered] = useState(false);

  return (
    <Toolbar variant='dense'>
      {/* <CustomLink to='/'>
        <a style={{ fontWeight: '500' }}>쇼핑홈</a>
      </CustomLink> */}
      <div
        style={{ position: 'relative', display: 'inline-block' }}
        onMouseEnter={() => setIsShoppingHovered(true)}
        onMouseLeave={() => setIsShoppingHovered(false)}
      >
        <CustomLink to='/shop' hoverColor='#5FF531'>
          Category
        </CustomLink>
        {isShoppingHovered && <CategoryDropDown />}
      </div>
      <CustomLink to='/shop/best'>Best</CustomLink>
      <CustomLink to='/shop/sale'>Mentors</CustomLink>
    </Toolbar>
  );
};

export default ToolBar;
