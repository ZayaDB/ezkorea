import { useState } from 'react';
import '../../styles/category/themeFilter.scss';
import Checkbox from '@mui/material/Checkbox';
import { Box, styled } from '@mui/system';

export default function ThemeFilter() {
  const themes: string[] = ['gaming', 'simple', 'unique', 'antique'];

  const [checkedThemes, setCheckedThemes] = useState<string[]>([]);

  const handleLabelClick = (theme: string) => {
    const newCheckedThemes = [...checkedThemes];
    const themeIndex = newCheckedThemes.indexOf(theme);

    if (themeIndex === -1) {
      newCheckedThemes.push(theme);
    } else {
      newCheckedThemes.splice(themeIndex, 1);
    }

    setCheckedThemes(newCheckedThemes);
    console.log(`Checkbox for theme '${theme}' toggled. Checked themes:`, newCheckedThemes);
  };

  const BlackCheckbox = styled(Checkbox)({
    color: 'black', // 체크박스 아이콘 컬러 지정
    '&.Mui-checked': {
      color: 'black', // 체크된 상태에서의 아이콘 컬러 지정
    },
  });

  return (
    <Box className="element-theme">
      {themes.map((theme) => (
        <Box key={theme} className="theme">
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
            className="theme-name"
            onClick={() => handleLabelClick(theme)}
            role="button"
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
