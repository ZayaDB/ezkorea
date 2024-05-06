import React, { useState } from 'react';
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';

import { Products } from '../../types/typesProducts';
import ProductItem from './ProductItem';
import '../../styles/category/productWrapCss.scss';

interface ProductListProps {
  selectedCategory: string;
  prodData: Products[];
}

const ProductList: React.FC<ProductListProps> = ({
  selectedCategory,
  prodData,
}) => {

  const [sort, setSort] = useState<string>('인기순');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('ALL');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSort(event.target.value as string);
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
    // 필터링 데이터 삭제 로직
  };

  const subCategories = prodData
    .filter(product => product.category1 === selectedCategory)
    .map(product => product.category2);

  return (
    <Box className='prod-container'>
      <Box className='prod-selec-value'>
        {/* 카테고리 선택 */}
        <Box className='select-categories'>
          <Box>{selectedCategory}</Box>
          {/* 하위 카테고리 선택 */}
          <Box>
            {subCategories.map(subCategory => (
              <Box key={subCategory}>{subCategory}</Box>
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
              sx={{ height: 50, paddingLeft: '10px', paddingRight: '10px' }}
            />
          </Box>
          {/* 정렬기준 */}
          <Box className='sort-box'>
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 200 }}>
              <InputLabel id='sort-label'>보기</InputLabel>
              <Select labelId='sort-label' id='sort-select' value={sort}>
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
              selectedSubCategory === 'ALL' ||
              product.category2 === selectedSubCategory
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
