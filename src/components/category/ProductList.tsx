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
import { SortOption } from '../../types/typesProducts';

const ProductList: React.FC = () => {
  const selectedBrands = useSelector(
    (state: RootState) => state.category.brands
  ); // 선택한브랜드
  const selectedPrices = useSelector(
    (state: RootState) => state.category.prices
  ); //선택한 가격
  const selectedColors = useSelector(
    (state: RootState) => state.category.colors
  ); //선택한 컬러
  const selectedThemes = useSelector(
    (state: RootState) => state.category.themes
  ); // 선택한 테마
  const categoryData = useSelector(
    (state: RootState) => state.category.categoryData
  ); // 카테고리 데이터
  const prodData = useSelector((state: RootState) => state.category.products);
  // 상품데이터
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  ); // 내가 선택한 카테고리
  const selectedSubCategory = useSelector(
    (state: RootState) => state.category.selectedSubCategory
  ); // 내가 선택한 서브 카테고리

  const dispatch = useDispatch();
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
    return (
      <Box className='filter-chip-bar'>
        {values.map((value, index) => {
          const formattedLabel =
            typeof value === 'number' ? formatPrice(value) : String(value);

          return (
            <Chip
              key={`${chipType}-${index}`}
              label={formattedLabel}
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
                zIndex: 0,
              }}
              deleteIcon={<ClearIcon style={{ fontSize: 16 }} />}
            />
          );
        })}
      </Box>
    );
  };

  // 가격 포맷팅 함수 (1000 단위 콤마 추가)
  const formatPrice = (price: number): string => {
    const formatted = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `~${formatted}`; // price값 이하
  };

  // 서브 카테고리 클릭 핸들러
  const handleSubCategoryClick = (subCategory: string) => {
    dispatch(setSelectedSubCategory(subCategory));
  };

  // 삭제 핸들러
  const handleDelete = (
    chipType: string | number,
    chipValue: string | number
  ) => {
    console.info(`Deleting ${chipType} - ${chipValue}`);
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredProducts = sortedProducts.filter(
    product =>
      product.category1 === selectedCategory &&
      (selectedSubCategory === 'ALL' ||
        product.category2 === selectedSubCategory)
  );
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
          {/* 가격 필터링 */}
          {renderChips('가격', selectedPrices)}
          {/* 테마 필터링 */}
          {renderChips('테마', selectedThemes)}
          {/*             
            <Chip
              key={`${chipType}-${index}`}
              label={formattedLabel}
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
                zIndex: 0,
              }}
              deleteIcon={<ClearIcon style={{ fontSize: 16 }} />}
            /> */}

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
                  zIndex: 0,
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
      {isMobile == false ? (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <Box className='prod-wrapper'>
            {currentItems
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
          <Box style={{ margin: 'auto' }}>
            <Pagination
              count={Math.ceil(filteredProducts.length / itemsPerPage)} // Total number of pages
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      ) : (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
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
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
