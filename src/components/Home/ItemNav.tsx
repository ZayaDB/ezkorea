import React, { useEffect, useState } from 'react';
import { getData } from '../../utils/getData';
import { NavLink } from 'react-router-dom';
import { CategoryData } from '../../types/typesProducts';
import { styled } from '@mui/system';
// import { setSelectedCategory } from '../../redux/slices/categorySlice';
// import { useDispatch } from 'react-redux';

const ItemNav: React.FC = () => {
  const LinkItem = styled(NavLink)({
    // padding: '8px 12px',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    color: '#191919',
    '&:hover': {
      backgroundColor: '#ffffff',
      borderRadius: '3px',
      color: '#5ff531',
    },
  });

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

  return (
    <div>
      {categoryData.map((category: CategoryData) => (
        <div key={category.name}>
          <div className='subcategories-container'>
            {category.subCategories
              .filter(subCategory => subCategory.name !== 'ALL')
              .map((subCategory, subIndex) => (
                <LinkItem
                  key={subIndex}
                  to={`/${subCategory.name.toLowerCase()}`}
                  color='inherit'
                  style={{ display: 'inline-block', textAlign: 'center' }}
                >
                  <div
                    style={{
                      backgroundImage: `url(${subCategory.imagePath})`,
                      backgroundSize: 'cover',
                      width: '180px', // 원하는 너비 설정
                      height: '180px', // 원하는 높이 설정
                    }}
                  ></div>
                  <div>{subCategory.name}</div>
                </LinkItem>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemNav;
