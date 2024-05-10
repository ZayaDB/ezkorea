import React, { useState } from 'react';
import {
  Box,
  Chip,
  FormControl,
  MenuItem,
  Select,
  Button,
  Modal,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import ClearIcon from '@mui/icons-material/Clear';
import ProductItem from './ProductItem';
import '../../styles/category/productWrap.scss';
import { useMediaQuery } from '@mui/material';
import FilterCompo from './FilterCompo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/config';
import {
  setSelectedSubCategory,
  removeSelectedFilter,
} from '../../redux/slices/categorySlice';
import useSort from '../../hooks/useSort';
import  {SortOption}  from '../../types/typesProducts';

const ProductList: React.FC = () => {
  const selectedBrands = useSelector(
    (state: RootState) => state.category.brands
  );
  const selectedPrices = useSelector(
    (state: RootState) => state.category.prices
  );
  const selectedColors = useSelector(
    (state: RootState) => state.category.colors
  );
  const selectedThemes = useSelector(
    (state: RootState) => state.category.themes
  );
  const categoryData = useSelector(
    (state: RootState) => state.category.categoryData
  );
  const prodData = useSelector((state: RootState) => state.category.products);
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );
  const selectedSubCategory = useSelector(
    (state: RootState) => state.category.selectedSubCategory
  );
  const isMobile = useMediaQuery('(max-width:768px)');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [sort, setSort] = useState<string>('인기순');
  const sortedProducts = useSort(prodData, sort as SortOption); // 정렬된 상품 목록

  // 필터 버튼 클릭 핸들러
  const handleFilterButtonClick = () => {
    setIsFilterModalOpen(true);
  };

  // 필터 모달 닫기 핸들러
  const handleFilterModalClose = () => {
    setIsFilterModalOpen(false);
  };

  // 칩 렌더링 함수
  const renderChips = (chipType: string, values: (string | number)[]) => {
    return values.map((value, index) => (
      <Chip
        key={`${chipType}-${index}`}
        label={typeof value === 'number' ? value.toString() : value}
        onDelete={() => handleDelete(chipType, value)}
        style={{
          fontSize: isMobile ? '11px' : '14px',
          width: isMobile ? '75px' : '100px',
          height: isMobile ? '30px' : '37px',
          paddingLeft: isMobile ? '1px' : '2px',
          paddingRight: isMobile ? '2px' : '3px',
          paddingTop: isMobile ? '2px' : '4px',
          borderRadius: 2.8,
          margin: '4px', // 각 칩 사이의 간격 조정
          lineHeight: '14px',
        }}
        deleteIcon={<ClearIcon style={{ fontSize: 16 }} />}
      />
    ));
  };

  // 서브 카테고리 클릭 핸들러
  const handleSubCategoryClick = (subCategory: string) => {
    dispatch(setSelectedSubCategory(subCategory));
  };

  // 삭제 핸들러
  const handleDelete = (chipType: string, chipValue: string | number) => {
    console.info(`Deleting ${chipType} - ${chipValue}`);
    // 해당 칩 값에 대한 삭제 로직을 여기에 구현
    // Redux 스토어에서 선택한 필터 제거
    switch (chipType) {
      case '브랜드':
        dispatch(
          removeSelectedFilter({ filterType: 'brands', value: chipValue })
        );
        break;
      case '가격':
        dispatch(
          removeSelectedFilter({ filterType: 'prices', value: chipValue })
        );
        break;
      case '색상':
        dispatch(
          removeSelectedFilter({ filterType: 'colors', value: chipValue })
        );
        break;
      case '테마':
        dispatch(
          removeSelectedFilter({ filterType: 'themes', value: chipValue })
        );
        break;
      default:
        break;
    }
  };

  return (
    <Box className='prod-container'>
      {/* 카테고리 선택 */}
      <Box className='prod-selec-value'>
        <Box className='select-categories'>
          <Box className='category-1'>{selectedCategory}</Box>
          <Box className='category-2'>
            {categoryData.map(subCategory => (
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
                onClick={() => handleSubCategoryClick(subCategory.name)}
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
          {/* 브랜드 필터링 */}
          {renderChips('브랜드', selectedBrands)}
          {/* 색상 필터링 */}
          {renderChips('색상', selectedColors)}
          {/* 테마 필터링 */}
          {renderChips('테마', selectedThemes)}

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
        {sortedProducts
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
