import '../../styles/category/productWrapCss.scss';
import { Products } from '../../types/typesProducts';
import ProductItem from './ProductItem';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
interface ProductListProps {
  prodData: Products[]; // Product 타입의 배열
}

const ProductList: React.FC<ProductListProps> = ({ prodData }) => {
  const [sort, setSort] = React.useState('인기순');

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  return (
    <div className='prod-container'>
      <div className='prod-selec-value'>
        {/* 카테고리 1번, 2번 */}
        <div className='select-categories'>
          <div>category1 〉 </div>
          <div> category 2 </div>
        </div>

        {/* 필터링데이터 */}
        <div className='select-filtering-values'>
          <div className='filtering-box'>
            <div className='select-filtered-data'>
              {/* 선택한 필터링데이터들이 추가되지만 이미 존재하는 데이터는 추가되지않음 */}
              <div className='filtering-name'> 책상 </div>
              <div className='remove-filter'>x</div>
            </div>
          </div>
          {/* 정렬기준 */}
          <div className='sort-box'>
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
                <MenuItem value={10}>인기순</MenuItem>
                <MenuItem value={21}>리뷰많은순</MenuItem>
                <MenuItem value={22}>낮은가격순</MenuItem>
                <MenuItem value={22}>높은가격순</MenuItem>
                <MenuItem value={22}>할인율높은순</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className='prod-wrapper'>
        {prodData &&
          prodData.map(prod => (
            <ProductItem key={prod.productId} prod={prod} />
          ))}
      </div>
      <Pagination count={10} />
    </div>
  );
};

export default ProductList;
