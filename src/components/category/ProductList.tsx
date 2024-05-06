import React, { useState, useEffect } from 'react';
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import ClearIcon from '@mui/icons-material/Clear';

import { Products, CategoryData, ProductListProps } from '../../types/typesProducts';
import ProductItem from './ProductItem';
import '../../styles/category/productWrapCss.scss';

const ProductList: React.FC<ProductListProps> = ({
  selectedCategory,
  prodData,
  categoryData,
}) => {
  const [sort, setSort] = useState<string>('인기순');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('ALL');

  // 선택된 카테고리의 인덱스를 찾기
  const selectedCategoryIndex = categoryData.findIndex(category => category.name === selectedCategory);

  // 선택된 카테고리의 subCategories 가져오기
  const subCategories = selectedCategoryIndex !== -1 ? categoryData[selectedCategoryIndex].subCategories : [];

  // 초기 렌더링 시 '가구' 카테고리와 'ALL' 서브카테고리로 설정
  useEffect(() => {
    setSelectedSubCategory('ALL');
  }, [selectedCategory]); // selectedCategory가 변경될 때마다 실행

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
    // 필터링 데이터 삭제 로직
  };

  return (
    <Box className='prod-container'>
      <Box className='prod-selec-value'>
        {/* 카테고리 선택 */}
        <Box className='select-categories'>
          <Box className='category-1'>{selectedCategory}</Box>
          {/* 하위 카테고리 선택 */}
          <Box className='category-2'>
            {subCategories.map(subCategory => (
              <Box key={subCategory} style={{ marginRight: '25px' }}>
                {subCategory}
              </Box>
            ))}
          </Box>
        </Box>
        {/* 필터링 데이터 */}
        <Box className='select-filtering-values'>
          <Box className='filtering-box'>
            {/* 선택한 필터링 데이터 */}
            <Chip
              label='선택한 값'
              onDelete={handleDelete}
              style={{
                fontSize: '14px',
                height: 37,
                paddingLeft: '2px',
                paddingRight: '3px',
                borderRadius: 2.8,
              }}
              deleteIcon={<ClearIcon style={{ fontSize: 16 }} />} // 삭제 아이콘의 크기 조정
            />
          </Box>
          {/* 정렬기준 */}
          <Box className='sort-box'>
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 200 }}>
              <Select
                labelId='sort-label'
                id='sort-select'
                value={sort}
                onChange={event => setSort(event.target.value as string)}
                sx={{ height: '42px', fontSize: '14px' }}
              >
                {/* 정렬 옵션 */}
                <MenuItem value='인기순'>인기순</MenuItem>
                <MenuItem value='리뷰많은순'>리뷰많은순</MenuItem>
                <MenuItem value='낮은가격순'>낮은가격순</MenuItem>
                <MenuItem value='높은가격순'>높은가격순</MenuItem>
                <MenuItem value='할인율높은순'>할인율높은순</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      {/* 상품 목록 */}
      <Box className='prod-wrapper'>
        {prodData
          .filter(product => product.category1 === selectedCategory)
          .filter(
            product =>
              selectedSubCategory === 'ALL' || product.category2 === selectedSubCategory
          )
          .map(prod => (
            <ProductItem
              key={prod.productId}
              prod={prod}
              // 선택한 카테고리에 따라 굵은 스타일 적용
            />
          ))}
      </Box>
      {/* 페이지네이션 */}
      <Pagination count={10} />
    </Box>
  );
};

export default ProductList;
