import { useState } from 'react';
import { Box, styled } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { setThemes } from '../../redux/slices/categorySlice'; // Redux 액션 import
import '../../styles/category/sideFilter.scss';
export default function ThemeFilter() {
  const themes: string[] = ['gaming', 'simple', 'unique', 'antique', 'kitsch'];

  const [checkedThemes, setCheckedThemes] = useState<string[]>([]);
  const dispatch = useDispatch(); // useDispatch hook을 사용하여 dispatch 함수 가져오기

  const handleLabelClick = (theme: string) => {
    const newCheckedThemes = [...checkedThemes];
    const themeIndex = newCheckedThemes.indexOf(theme);

    if (themeIndex === -1) {
      newCheckedThemes.push(theme);
    } else {
      newCheckedThemes.splice(themeIndex, 1);
    }

    setCheckedThemes(newCheckedThemes);
    dispatch(setThemes(newCheckedThemes)); // 선택된 테마를 Redux 스토어에 저장
  };

  const BlackCheckbox = styled(Checkbox)({
    color: 'black',
    '&.Mui-checked': {
      color: 'black',
    },
  });

  return (
    <Box className='element-theme'>
      {themes.map(theme => (
        <Box key={theme} className='theme'>
          <BlackCheckbox
            checked={checkedThemes.includes(theme)}
            onChange={() => handleLabelClick(theme)}
            inputProps={{ 'aria-label': `${theme} checkbox` }}
            sx={{
              padding: '2px',
              '& .MuiSvgIcon-root': {
                width: '0.9em',
                height: '0.7em',
              },
            }}
          />
          <Box
            className='theme-name'
            onClick={() => handleLabelClick(theme)}
            role='button'
            tabIndex={0}
            sx={{ marginLeft: '2px', cursor: 'pointer' }}
          >
            {theme}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
