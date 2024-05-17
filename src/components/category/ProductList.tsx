import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Button,
  Modal,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import ProductItem from './ProductItem';
import '../../styles/category/productWrap.scss';
import { useMediaQuery } from '@mui/material';
import FilterCompo from './FilterCompo';
import { useDispatch, useSelector } from 'react-redux';
import getSelectedValue from '../../utils/getSelectedValue';
import {
  setSelectedCategory,
  setSelectedSubCategory,
} from '../../redux/slices/categorySlice';
import useSort from '../../hooks/shop/useSort';
import { SortOption, SubCategory } from '../../types/productTypes';
import { RootState } from '../../redux/config';
import FilterChips from './FilterChips';

const ProductList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryName = queryParams.get('category');
  const subCategoryName = queryParams.get('subCategory');

  // categoryName과 subCategoryName이 null이 아닐 때만 dispatch
  useEffect(() => {
    if (categoryName && subCategoryName) {
      dispatch(setSelectedCategory(categoryName));
      dispatch(setSelectedSubCategory(subCategoryName));
    }
  }, [dispatch, categoryName, subCategoryName]);

  const isMobile = useMediaQuery('(max-width:768px)');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [sort, setSort] = useState<string>('인기순');

  // renderingStart 상태값 가져오기
  const renderingStart = useSelector(
    (state: RootState) => state.category.renderingStart
  );

  // 정렬된 상품 목록
  const sortedProducts = useSort(
    getSelectedValue((state: RootState) => state.category.products),
    sort as SortOption
  );

  // 선택한 카테고리와 서브 카테고리
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );
  const selectedSubCategory = useSelector(
    (state: RootState) => state.category.selectedSubCategory
  );
  // 카테고리 데이터
  const categoryData = useSelector(
    (state: RootState) => state.category.categoryData
  );

  // 필터된 상품 목록 가져오기
  const filteredProducts = useSelector((state: RootState) => {
    const allProducts = state.category.products;
    const selectedFilters = state.category.selectedFilters || {};
    const {
      brands = [],
      colors = [],
      prices = [],
      themes = [],
    } = selectedFilters;

    const filteredProducts = allProducts.filter(product => {
      if (brands.length > 0 && !brands.includes(product.brand)) {
        return false;
      }
      if (
        colors.length > 0 &&
        !product.colors.some(color => colors.includes(color))
      ) {
        return false;
      }
      // prices 필터 적용
      if (prices.length > 0) {
        // prices 배열에서 최소값(minPrice)과 최대값(maxPrice) 추출
        const [minPrice, maxPrice] = prices;
        // 상품의 가격이 minPrice와 maxPrice 사이에 있는지 확인
        if (product.price < minPrice || product.price > maxPrice) {
          return false;
        }
      }

      if (
        themes.length > 0 &&
        !product.concepts.some(theme => themes.includes(theme))
      ) {
        return false;
      }

      return true;
    });

    return filteredProducts;
  });

  // 정렬된 필터된 상품 목록
  const sortedFilteredProducts = useSort(filteredProducts, sort as SortOption);
  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  // 현재 페이지의 마지막 아이템 인덱스는 12배수
  const indexOfLastItem = currentPage * itemsPerPage;
  // 현재 페이지의 첫번째 아이템 인덱스는 마지막에서 12를 뺀 값
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //페이지네이션 :페이지이동 핸들러
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  // 필터 버튼 클릭 핸들러
  const handleFilterButtonClick = () => {
    setIsFilterModalOpen(true);
  };

  // 필터 모달 닫기 핸들러
  const handleFilterModalClose = () => {
    setIsFilterModalOpen(false);
  };

  // 검색 버튼 클릭 핸들러
  const handleApplyFilters = () => {
    // 필터 적용 후 모달 닫기
    setIsFilterModalOpen(false);
  };

  const subCategories: SubCategory[] = (
    selectedCategory
      ? categoryData.find(category => category.name === selectedCategory)
          ?.subCategories
      : []
  ) as SubCategory[];

  // 서브 카테고리 클릭 핸들러
  const handleSubCategoryClick = (subCategory: string) => {
    dispatch(setSelectedSubCategory(subCategory));
  };

  return (
    <div className='prod-container'>
      {/* 카테고리 선택 */}
      <div className='prod-selec-value'>
        <div className='select-categories'>
          {!isMobile && <div className='category-1'>{selectedCategory}</div>}
          <div className='category-2'>
            {subCategories &&
              subCategories.map(subCategory => (
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
                    <div className='icon-nav' style={{}}>
                      <div
                        style={{
                          backgroundImage: `url(${subCategory.imagePath})`,
                          backgroundSize: 'cover',
                          width: '80px',
                          height: '80px',
                          borderRadius: '10px',
                          // border: '1px solid black',
                        }}
                      ></div>
                      <div className='iconName'>
                        <span className='iconSpan'> {subCategory.name}</span>
                      </div>
                    </div>
                  ) : (
                    subCategory.name
                  )}
                </Box>
              ))}
          </div>
        </div>

        {/* 선택한 필터링 데이터 */}
        <div className='select-filtering-values'>
          <FilterChips />
          {/* 정렬기준 */}
          <div className='sort-box'>
            {/* 모바일 환경에서 필터링 버튼 */}
            {isMobile && (
              <div className='filterBtn'>
                <Button
                  onClick={handleFilterButtonClick}
                  sx={{
                    width: '90%',
                    color: '#323232',
                    fontSize: '12.3px',
                    border: '1px solid rgb(197, 197, 197)',
                    paddingTop: '4.5px',
                    paddingBottom: '4.5px',
                    paddingLeft: '9px',
                    paddingRight: '9px',
                    marginTop: '14px',
                    marginRight: '10px',
                    '&:hover': {
                      backgroundColor: 'white',
                      border: '1px solid gray',
                    },
                  }}
                >
                  필터링
                </Button>
              </div>
            )}

            {/* 모달 */}
            {isMobile && (
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
                    overflowY: 'scroll',
                    scrollwidth: 'none',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  {/* 모바일 환경에서만 FilterCompo 렌더링 */}
                  <FilterCompo onApplyFilters={handleApplyFilters} />
                </Box>
              </Modal>
            )}

            <FormControl
              sx={{
                m: '8px 0',
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
                <MenuItem
                  sx={{ fontSize: isMobile ? '12px' : '14px' }}
                  value='인기순'
                >
                  인기순
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: isMobile ? '12px' : '14px' }}
                  value='리뷰많은순'
                >
                  리뷰많은순
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: isMobile ? '12px' : '14px' }}
                  value='낮은가격순'
                >
                  낮은가격순
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: isMobile ? '12px' : '14px' }}
                  value='높은가격순'
                >
                  높은가격순
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: isMobile ? '12px' : '14px' }}
                  value='할인율높은순'
                >
                  할인율높은순
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      {/* 상품 목록 */}
      <div className='prod-wrapper'>
        {renderingStart
          ? sortedFilteredProducts
              .filter(
                product =>
                  product.category1 === selectedCategory &&
                  (selectedSubCategory === 'ALL' ||
                    product.category2 === selectedSubCategory)
              )
              .slice(indexOfFirstItem, indexOfLastItem)
              .map(prod => <ProductItem key={prod.productId} prod={prod} />)
          : sortedProducts
              .filter(
                product =>
                  product.category1 === selectedCategory &&
                  (selectedSubCategory === 'ALL' ||
                    product.category2 === selectedSubCategory)
              )
              .slice(indexOfFirstItem, indexOfLastItem)
              .map(prod => <ProductItem key={prod.productId} prod={prod} />)}
      </div>

      {!isMobile && (
        <div style={{ marginLeft: '38.9%' }}>
          <Pagination
            count={Math.ceil(filteredProducts.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;
