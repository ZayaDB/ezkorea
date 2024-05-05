import { useState } from 'react';
import '../../styles/category/brandFilter.scss';
import Checkbox from '@mui/material/Checkbox';
import { Box, styled } from '@mui/system';

export default function BrandFilter() {
  const brands: string[] = [
    'ikea',
    'logitec',
    'samsung',
    '동서가구',
    '삼익가구',
  ];
  const [checkedBrands, setCheckedBrands] = useState<string[]>([]);

  const handleLabelClick = (brand: string) => {
    const newCheckedBrands = [...checkedBrands];
    const brandIndex = newCheckedBrands.indexOf(brand);

    if (brandIndex === -1) {
      newCheckedBrands.push(brand);
    } else {
      newCheckedBrands.splice(brandIndex, 1);
    }

    setCheckedBrands(newCheckedBrands);
    console.log(
      `Checkbox for brand '${brand}' toggled. Checked brands:`,
      newCheckedBrands
    );
  };

  const BlackCheckbox = styled(Checkbox)({
    color: 'black', // 체크박스 아이콘 컬러 지정
    '&.Mui-checked': {
      color: 'black', // 체크된 상태에서의 아이콘 컬러 지정
    },
  });

  return (
    <Box className='element-brand'>
      {brands.map(brand => (
        <Box key={brand} className='brand'>
          <BlackCheckbox
            checked={checkedBrands.includes(brand)}
            onChange={() => handleLabelClick(brand)}
            inputProps={{ 'aria-label': `${brand} checkbox` }}
            sx={{
              padding: '2px',
              '& .MuiSvgIcon-root': {
                width: '0.9em',
                height: '0.7em',
              },
            }}
          />
          <Box
            className='brand-name'
            onClick={() => handleLabelClick(brand)}
            role='button'
            tabIndex={0}
            sx={{ marginLeft: '2px', cursor: 'pointer' }}
          >
            {brand}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
