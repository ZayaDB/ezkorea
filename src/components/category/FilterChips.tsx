import { Chip, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/config';
import { Filters } from '../../types/typesProducts'; 
import { removeSelectedFilter } from '../../redux/slices/categorySlice';

const FilterChips = () => {
  const selectedFilters = useSelector(
    (state: RootState) => state.category.selectedFilters
  );
  const dispatch = useDispatch();

  const renderFilterChips = () => {
    const chips: JSX.Element[] = [];
    let chipIndex = 1; // 각 Chip의 인덱스
    const onRemoveFilter = (filterType: string, value: string | number) => {
      dispatch(removeSelectedFilter({ filterType, value }));
    };
    for (const key in selectedFilters) {
      if (Object.prototype.hasOwnProperty.call(selectedFilters, key)) {
        const value = selectedFilters[key as keyof Filters]; // key를 keyof Filters로 타입 캐스팅
        // console.log(value);
        // 값이 배열인 경우 각 요소를 별도의 Chip으로 추가
        if (typeof value !== 'number') {
          value.forEach((item: string | number) => {
            // 문자열 또는 숫자로 타입 지정
            chips.push(
              <Chip
                key={`chip-${chipIndex++}`} // 각 Chip의 고유한 key 생성
                label={String(item)} // 문자열로 변환하여 label 설정
                onDelete={() => onRemoveFilter(key as string, String(item))} // 문자열로 변환하여 사용
                style={{ margin: '5px' }}
              />
            );
          });
        } else {
          const sortedValues = (value as number[]).sort((a, b) => a - b);
          const minValue = sortedValues[0];
          const maxValue = sortedValues[sortedValues.length - 1];
          const formattedRange = `${formatPriceWithComma(
            minValue
          )} ~ ${formatPriceWithComma(maxValue)}`;

          chips.push(
            <Chip
              key={`chip-${chipIndex++}`}
              label={formattedRange}
              onDelete={() => onRemoveFilter(key as string, value)}
              style={{ margin: '5px' }}
            />
          );
        }
      }
    }

    return chips;
  };

  const formatPriceWithComma = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return <Box>{renderFilterChips()}</Box>;
};

export default FilterChips;
