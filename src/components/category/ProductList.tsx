import '../../styles/category/productWrapCss.scss';
import { Products } from '../../types/typesProducts';
import ProductItem from './ProductItem';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';

interface ProductListProps {
  prodData: Products[]; 
}

const ProductList: React.FC<ProductListProps> = ({ prodData }) => {
  const [sort, setSort] = React.useState('인기순');

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  return (
    <Box className='prod-container'>
      <Box className='prod-selec-value'>
        {/* 카테고리 1번, 2번 */}
        <Box className='select-categories'>
          <Box>category1 〉 </Box>
          <Box> category 2 </Box>
        </Box>

        {/* 필터링데이터 */}
        <Box className='select-filtering-values'>
          <Box className='filtering-box'>
            <Box className='select-filtered-data'>
              {/* 선택한 필터링 데이터들이 추가되지만 이미 존재하는 데이터는 추가되지않음 */}
              <Box className='filtering-name'> 책상 </Box>
              <Box className='remove-filter'>x</Box>
            </Box>
          </Box>
          {/* 정렬기준 */}
          <Box className='sort-box'>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id='demo-simple-select-autowidth-label'>
                보기
              </InputLabel>
              <Select
                labelId='demo-simple-select-autowidth-label'
                id='demo-simple-select-autowidth'
                value={sort}
                onChange={handleChange}
                autoWidth
                label='Age'
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>인기순</MenuItem>
                <MenuItem value={2}>리뷰많은순</MenuItem>
                <MenuItem value={3}>낮은가격순</MenuItem>
                <MenuItem value={4}>높은가격순</MenuItem>
                <MenuItem value={5}>할인율높은순</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box className='prod-wrapper'>
        {prodData &&
          prodData.map(prod => (
            <ProductItem key={prod.productId} prod={prod} />
          ))}
      </Box>
      <Pagination count={10} />
    </Box>
  );
};

export default ProductList;
