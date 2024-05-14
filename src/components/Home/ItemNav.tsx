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
    <div style={{ width: '100vw' }}>
      <div
        style={{
          margin: 'auto',
          width: '1200px',
          overflowX: 'scroll',
          display: 'flex',
          flexDirection: 'row',
          scrollbarWidth: 'none',
        }}
      >
        {category.map((cate: CategoryData) =>
          cate.subCategories
            .filter(subCategory => subCategory.name !== 'ALL')
            .map((subCategory, subIndex) => (
              <LinkItem
                key={subIndex}
                to={`/shop?category=${encodeURIComponent(
                  cate.name
                )}&subCategory=${encodeURIComponent(subCategory.name)}`}
                color='inherit'
                onClick={() =>
                  handleSubCategoryClick(cate.name, subCategory.name)
                }
              >
                <img
                  src={subCategory.imagePath}
                  alt=''
                  width='120px'
                  height='120px'
                />
                {subCategory.name}
              </LinkItem>
            ))
        )}
      </div>
    </div>
  );
};

export default IconNav;
