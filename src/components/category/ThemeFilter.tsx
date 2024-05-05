import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import '../../styles/category/themeFilter.scss';

import { styled } from '@mui/system';


const ThemeFilter = () => {
  const themes: string[] = ['gaming', 'simple', 'modern', 'wood', 'lovely'];

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
    <div className='element-theme'>
      {themes.map((theme) => (
        <div key={theme} className='theme' >
          <BlackCheckbox
            checked={checkedThemes.includes(theme)}
            onChange={() => handleLabelClick(theme)}
            inputProps={{ 'aria-label': `${theme} checkbox` }}
          />
          <div
            className='theme-name'
            onClick={() => handleLabelClick(theme)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleLabelClick(theme);
              }
            }}
            role='button'
            tabIndex={0}
          >
            {theme}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThemeFilter;
