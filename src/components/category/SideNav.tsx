import React, { useState } from 'react';
import '../../styles/category/sideNavCss.scss';
import BrandFilter from './BrandFilter';
import ColorFilter from './ColorFilter';
import PriceFilter from './PriceFilter';
import ThemeFilter from './ThemeFilter';

interface CategoryMapping {
  [key: string]: string;
}

const categoryMapping: CategoryMapping = {
  가구: 'furniture',
  전자기기: 'electronics',
  '조명/인테리어': 'lighting-interior',
  '데코/식물': 'deco-plant',
};

interface CategoryData {
  name: string;
  subCategories: string[];
}

const categoryData: CategoryData[] = [
  {
    name: '가구',
    subCategories: [
      'ALL',
      '책상',
      '의자',
      '모니터암/받침대',
      '거치대',
      '서랍장',
      '선반',
    ],
  },
  {
    name: '전자기기',
    subCategories: ['ALL', '키보드', '마우스', '스피커', '멀티탭', '충전기'],
  },
  {
    name: '조명/인테리어',
    subCategories: [
      'ALL',
      '조명',
      '오브제',
      '시계',
      '캘린더',
      '트레이',
      '타공판',
      '데스크매트',
    ],
  },
  {
    name: '데코/식물',
    subCategories: ['ALL', '디퓨저', '캔들', '인센스', '식물'],
  },
];

const SideNav: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string>('가구');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');

  const categoryClick = (categoryName: string) => {
    console.log(`카테고리1번 : ${categoryName}`);

    setOpenCategory(prev => (prev === categoryName ? '' : categoryName));
    setSelectedSubCategory(''); // 카테고리를 클릭할 때 서브 카테고리 선택 상태 초기화
  };

  const subCategoryClick = (subCategoryName: string) => {
    if (subCategoryName !== selectedSubCategory) {
      console.log(`카테고리2번 : ${subCategoryName}`);
      setSelectedSubCategory(subCategoryName);
    }
  };

  return (
    <div className='side-nav'>
      {categoryData.map((category, index) => (
        <div key={index}>
          <div
            className={`nav ${categoryMapping[category.name]}`}
            onClick={() => categoryClick(category.name)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                categoryClick(category.name);
              }
            }}
            role='button'
            tabIndex={0}
          >
            <div className='nav-title'>{category.name}</div>
            <hr className='hr' />
          </div>
          {openCategory === category.name && (
            <div className={`${categoryMapping[category.name]}-box`}>
              {category.subCategories.map((subCategory, idx) => (
                <div
                  className={'sub'}
                  key={idx}
                  onClick={() => subCategoryClick(subCategory)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      subCategoryClick(subCategory);
                    }
                  }}
                  role='button'
                  tabIndex={0}
                >
                  {subCategory}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className={'filter-box'}>
        <div className='nav-title filter'>
          <div>필터 </div>
          <div className='remove-filter' > 초기화 </div>
        </div>
        <hr className='hr' />
        {/* <div className='brand-box'>
          <div className='filter-title'>브랜드</div>
          <BrandFilter />
        </div> */}
        <div className='price-box '>
          <div className='filter-title'>가격</div>
          <PriceFilter />
        </div>
        <div className='color-box'>
          <div className='filter-title'>색상</div>
          <ColorFilter />
        </div>
      </div>
      <div className='theme-box'>
        <div className='filter-title'>테마</div>
        <ThemeFilter />
      </div>
    </div>
  );
};

export default SideNav;
