import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { getData } from '../../utils/getData';
import {
  setSelectedCategory,
  setSelectedSubCategory,
} from '../../redux/slices/categorySlice';

interface CategoryData {
  name: string;
  subCategories: { name: string; imagePath: string }[];
}

const LinkItem = styled(NavLink)({
  padding: '8px',
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
  const [category, setCategory] = useState<CategoryData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { categoryData } = await getData('/data/categoryData.json');
        setCategory(categoryData);
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
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'scroll',
          scrollbarWidth: 'none',
          maxWidth: '1150px',
        }}
      >
        {category.map((cate: CategoryData, cateIndex) =>
          cate.subCategories
            .filter(subCategory => subCategory.name !== 'ALL')
            .map((subCategory, subIndex) => {
              // 두 번째 카테고리의 첫 번째와 두 번째 아이템 크기 조절
              const isSmall =
                cateIndex === 1 && (subIndex === 0 || subIndex === 1);
              return (
                <LinkItem
                  key={subIndex}
                  to={`/shop?category=${encodeURIComponent(
                    cate.name
                  )}&subCategory=${encodeURIComponent(subCategory.name)}`}
                  color='inherit'
                  onClick={() =>
                    handleSubCategoryClick(cate.name, subCategory.name)
                  }
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={subCategory.imagePath}
                    alt={subCategory.name}
                    style={{
                      width: isSmall ? '126px' : '126px',
                      height: isSmall ? '126px' : '126px',
                    }}
                  />
                  <div style={{ textAlign: 'center' }}>{subCategory.name}</div>
                </LinkItem>
              );
            })
        )}
      </div>
    </div>
  );
};

export default IconNav;
