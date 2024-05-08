import React, { useState, useEffect } from 'react';
import {
  Box,
  Chip,
  FormControl,
  MenuItem,
  Select,
  Button,
  Modal,
  Typography,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import ClearIcon from '@mui/icons-material/Clear';
import { ProductListProps } from '../../types/typesProducts';
import ProductItem from './ProductItem';
import '../../styles/category/productWrapCss.scss';
import { useMediaQuery } from '@mui/material';
import FilterCompo from './FilterCompo';

const ProductList: React.FC<ProductListProps> = ({
  selectedCategory,
  prodData,
  categoryData,
}) => {
  const [sort, setSort] = useState<string>('인기순');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('ALL');
  const isMobile = useMediaQuery('(max-width:768px)');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const selectedCategoryIndex = categoryData.findIndex(
    category => category.name === selectedCategory
  );

  useEffect(() => {
    console.log('aa ', isMobile);
  }, [isMobile]);

  const subCategories =
    selectedCategoryIndex !== -1
      ? categoryData[selectedCategoryIndex].subCategories
      : [];

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
    // 필터링 데이터 삭제 로직
  };

  const handleFilterButtonClick = () => {
    console.log(isMobile);
    setIsFilterModalOpen(true); // 모달 열기
  };

  const handleFilterModalClose = () => {
    setIsFilterModalOpen(false); // 모달 닫기
  };

  return (
    <Box className='prod-container'>
      {/* 카테고리 선택 */}
      <Box className='prod-selec-value'>
        <Box className='select-categories'>
          <Box className='category-1'>{selectedCategory}</Box>
          <Box className='category-2'>
            {subCategories.map(subCategory => (
              <Box
                className='el-cate2'
                key={subCategory.name}
                style={{
                  marginRight: '25px',
                  fontWeight:
                    selectedSubCategory === subCategory.name
                      ? 'bold'
                      : 'normal',
                }}
                onClick={() => setSelectedSubCategory(subCategory.name)}
              >
                {isMobile ? (
                  <Box className='icon-nav'>
                    <img
                      src={subCategory.imagePath}
                      alt={subCategory.name}
                      style={{
                        width: '64px',
                        height: '64px',
                        objectFit: 'cover',
                      }}
                    />
                    <span>{subCategory.name}</span>
                  </Box>
                ) : (
                  subCategory.name
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* 모바일 환경에서 필터링 버튼 */}
        {isMobile && (
          <Button
            onClick={handleFilterButtonClick}
            style={{ marginRight: '10px' }}
          >
            필터링
          </Button>
        )}
        {/* 모달 */}
        <Modal
          open={isFilterModalOpen} // 모바일 환경에서만 모달 열림
          onClose={handleFilterModalClose}
          aria-labelledby='parent-modal-title'
          aria-describedby='parent-modal-description'
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              height: 500,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            {/* <FilterCompo /> */}
            {/* 모바일 환경에서만 FilterCompo 렌더링 */}
            <FilterCompo />
      
          </Box>
        </Modal>

        {/* 선택한 필터링 데이터 */}
        <Box className='select-filtering-values'>
          <Box className='filtering-box'>
            <Chip
              label='선택한 값'
              onDelete={handleDelete}
              style={{
                fontSize: isMobile ? '9px' : '14px',
                width: isMobile ? '75px' : '100px',
                height: isMobile ? '30px' : '37px',
                paddingLeft: isMobile ? '1px' : '2px',
                paddingRight: isMobile ? '2px' : '3px',
                paddingTop: isMobile ? '2px' : '4px',
                borderRadius: 2.8,
              }}
              deleteIcon={<ClearIcon style={{ fontSize: 16 }} />}
            />
          </Box>
          {/* 정렬기준 */}
          <Box className='sort-box'>
            <FormControl
              sx={{
                m: 1,
                minWidth: isMobile ? 40 : 120,
                maxWidth: isMobile ? 80 : 200,
                paddingTop: isMobile ? 0.76 : 0,
              }}
            >
              <Select
                labelId='sort-label'
                id='sort-select'
                value={sort}
                onChange={event => setSort(event.target.value as string)}
                sx={{
                  height: isMobile ? '32px' : '42px',
                  fontSize: isMobile ? '12px' : '14px',
                }}
              >
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
          .filter(
            product =>
              product.category1 === selectedCategory &&
              (selectedSubCategory === 'ALL' ||
                product.category2 === selectedSubCategory)
          )
          .map(prod => (
            <ProductItem key={prod.productId} prod={prod} />
          ))}
      </Box>

      {/* 페이지네이션 */}
      <Pagination count={10} />
    </Box>
  );
};

export default ProductList;
