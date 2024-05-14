import React from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/config';
import {
  setSelectedCategory,
  setSelectedSubCategory,
} from '../../redux/slices/categorySlice';

interface CategoryData {
  name: string;
  subCategories: { name: string; imagePath: string }[];
}

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

const IconNav: React.FC = () => {
  const dispatch = useDispatch();
  const categoryData = useSelector(
    (state: RootState) => state.category.categoryData
  );

  const handleSubCategoryClick = (
    categoryName: string,
    subCategoryName: string
  ) => {
    dispatch(setSelectedCategory(categoryName));
    dispatch(setSelectedSubCategory(subCategoryName));
  };

  return (
    <div>
      {categoryData.map((category: CategoryData) =>
        category.subCategories
          .filter(subCategory => subCategory.name !== 'ALL')
          .map((subCategory, subIndex) => (
            <LinkItem
              key={subIndex}
              to={`/shop?category=${encodeURIComponent(
                category.name
              )}&subCategory=${encodeURIComponent(subCategory.name)}`}
              color='inherit'
              onClick={() =>
                handleSubCategoryClick(category.name, subCategory.name)
              }
            >
              <img
                src={subCategory.imagePath}
                alt=''
                width='100px'
                height='100px'
              />
              {subCategory.name}
            </LinkItem>
          ))
      )}
    </div>
  );
};

export default IconNav;