import React from 'react';
import '../../styles/category/colorFilter.scss';

export default function ColorFilter() {
  // 컬러와 이름을 매핑한 객체
  const colors = {
    white: '화이트',
    '#b7b7b7': '연한회색',
    gray: '그레이',
    red: '레드',
    orange: '오렌지',
    lightblue: '하늘',
    beige: '베이지',
    blue: '블루',
    yellow: '옐로우',
    navy: '네이비',
    cyan: '시안',
    lightgreen: '연두',
    brown: '브라운',
    green: '그린',
    black: '블랙',
    pink: '핑크',
    purple: '퍼플',
    lavender: '라벤더',
  };

  const handleClick = (colorName: string) => {
    console.log(`선택한 색상: ${colorName}`);
  };

  return (
    <div className="color-wrap">
      {Object.entries(colors).map(([color, name]) => (
        <div
          className="element-color"
          key={color}
          onClick={() => handleClick(name)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleClick(name);
            }
          }}
          role="button"
          tabIndex={0}
        >
          <div
            className={`circle-color ${color === 'white' ? 'white' : 'other-color'}`}
            style={{ backgroundColor: color }}
          ></div>
          <div className="color-text">{name}</div>
        </div>
      ))}
    </div>
  );
}
