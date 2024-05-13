import React from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/config';
import { useEffect } from 'react';
import { getData } from '../../utils/getData';
import { setCategoryData, setProducts } from '../../redux/slices/categorySlice';

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
  color: '#191919',
  '&:hover': {
    backgroundColor: '#ffffff',
    borderRadius: '3px',
    color: '#5ff531',
  },
});

const CategoryDropDown: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { products } = await getData('/data/prodData.json');
        const { categoryData } = await getData('/data/categoryData.json');
        // Redux 스토어에 데이터 저장
        dispatch(setCategoryData(categoryData));
        dispatch(setProducts(products));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const categoryData = useSelector(
    (state: RootState) => state.category.categoryData
  );

  return (
    <DropdownContainer>
      {categoryData.map((category, index) => (
        <div key={index} color='inherit'>
          {/* 카테고리 이름 렌더링 */}
          {category.name}
          {/* ALL이 아닌 subCategories의 이름만 필터링하여 렌더링 */}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {category.subCategories
              .filter(subCategory => subCategory.name !== 'ALL')
              .map((subCategory, subIndex) => (
                <LinkItem
                  key={subIndex}
                  to={`/${subCategory.name.toLowerCase()}`}
                  color='inherit'
                >
                  {subCategory.name}
                </LinkItem>
              ))}
          </div>
        </div>
      ))}
    </DropdownContainer>
  );
};

export default CategoryDropDown;
