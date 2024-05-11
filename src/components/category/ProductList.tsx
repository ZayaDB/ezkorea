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
import getSelectedValue from '../../utils/getSelectedValue';
import {
  setSelectedSubCategory,
  removeSelectedFilter,
} from '../../redux/slices/categorySlice';
import useSort from '../../hooks/shop/useSort';
import { SortOption, SubCategory } from '../../types/typesProducts';
import { RootState } from '../../redux/config';

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:768px)');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [sort, setSort] = useState<string>('인기순');

  // 정렬된 상품 목록
  const sortedProducts = useSort(
    getSelectedValue((state: RootState) => state.category.products),
    sort as SortOption
  );
  // 내가 선택한 카테고리
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );
  // 내가 선택한 서브 카테고리
  const selectedSubCategory = useSelector(
    (state: RootState) => state.category.selectedSubCategory
  );
  // 카테고리 데이터
  const categoryData = useSelector(
    (state: RootState) => state.category.categoryData
  );

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

  // 칩 삭제 == 스토어에 저장된 필터값 삭제 핸들러
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

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  // 페이지이동 핸들러
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  // 현재 페이지의 마지막 아이템 인덱스는 12배수
  const indexOfLastItem = currentPage * itemsPerPage;
  // 현재 페이지의 첫번째 아이템 인덱스는 마지막에서 12를 뺀 값
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // 렌더링하려는 products는 정렬이 된 proditem들
  const filteredProducts = sortedProducts.filter(
    product =>
      product.category1 === selectedCategory &&
      (selectedSubCategory === 'ALL' ||
        product.category2 === selectedSubCategory)
  );
  // 현재페이지에서보여줄 정렬이 완료된 아이템을 처음~마지막만 잘라 보여줌
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

        {/* 선택한 필터링 데이터 */}
        <Box className='select-filtering-values'>
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
            {/* 모바일 환경에서 필터링 버튼 */}
            {isMobile && (
              <Box className='filterBtn'>
                <Button
                  onClick={handleFilterButtonClick}
                  sx={{
                    width: '100%',
                    color: '#505050',
                    fontSize: '12.3px',
                    border: '1px solid rgb(197, 197, 197)',
                    paddingTop: '3.7px',
                    paddingBottom: '3.7px',
                    paddingLeft: '5px',
                    paddingRight: '5px',
                    '&:hover': {
                      backgroundColor: 'white',
                      border: '1px solid gray',
                    },
                  }}
                >
                  필터링
                </Button>
              </Box>
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

                    bgcolor: 'background.paper',
                    border: '1px solid #000',
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  {/* 모바일 환경에서만 FilterCompo 렌더링 */}
                  <FilterCompo />
                </Box>
              </Modal>
            )}
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
