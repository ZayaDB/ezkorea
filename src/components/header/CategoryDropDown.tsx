import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import {
  setSelectedCategory,
  setSelectedSubCategory,
} from '../../redux/slices/categorySlice';
import { getData } from '../../utils/getData';
import { CategoryData } from '../../types/productTypes';

const DropdownContainer = styled('div')({
  position: 'absolute',
  top: '100%',
  left: 0,
  minWidth: '120px',
  backgroundColor: 'white',
  boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
  borderRadius: '3px',
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  fontSize: '14px',
  marginLeft: '-32px',
});

const LinkItem = styled(NavLink)({
  padding: '8px 12px',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  color: '#000000',
  '&:hover': {
    backgroundColor: '#ffffff',
    borderRadius: '3px',
    color: '#5ff531',
  },
});

const CategoryDropDown: React.FC = () => {
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { categoryData } = await getData('/data/categoryData.json');
        setCategoryData(categoryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubCategoryClick = (
    categoryName: string,
    subCategoryName: string
  ) => {
    dispatch(setSelectedCategory(categoryName));
    dispatch(setSelectedSubCategory(subCategoryName));
  };

  return (
    <DropdownContainer>
      {categoryData.map((category, index) => (
        <div key={index} color='inherit'>
          {/* ALL이 아닌 subCategories의 이름만 필터링하여 렌더링 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '600px',
              padding: '15px 12px',
            }}
          >
            <div style={{ width: '20%', fontWeight: 700 }}>{category.name}</div>
            <div style={{ width: '80%' }}>
              {category.subCategories
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
                    } // 카테고리 클릭 시 dispatch
                  >
                    {subCategory.name}
                  </LinkItem>
                ))}
            </div>
          </div>
        </div>
      ))}
    </DropdownContainer>
  );
};

export default CategoryDropDown;