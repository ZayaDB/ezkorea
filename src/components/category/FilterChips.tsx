import { Chip, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/config';
import { Filters } from '../../types/productTypes';
import { removeSelectedFilter } from '../../redux/slices/categorySlice';
import CloseIcon from '@mui/icons-material/Close';

const FilterChips = () => {
  const selectedFilters = useSelector(
    (state: RootState) => state.category.selectedFilters
  );
  const dispatch = useDispatch();

  const renderFilterChips = () => {
    const chips: JSX.Element[] = [];
    let chipIndex = 1;

    const onRemoveFilter = (filterType: string, value: string | number) => {
      dispatch(removeSelectedFilter({ filterType, value }));
    };

    for (const key in selectedFilters) {
      if (Object.prototype.hasOwnProperty.call(selectedFilters, key)) {
        const value = selectedFilters[key as keyof Filters];

        if (Array.isArray(value)) {
          value.forEach(item => {
            // 각 요소의 타입에 따라 칩 생성
            if (typeof item === 'number') {
              // 숫자인 경우 가격 범위 표시

              const formattedValue = formatPriceWithComma(item);
              chips.push(
                <Chip
                  key={`chip-${chipIndex++}`}
                  label={formattedValue}
                  onDelete={() => onRemoveFilter(key as string, item)}
                  deleteIcon={
                    <IconButton
                      onClick={() => onRemoveFilter(key as string, item)}
                    >
                      <CloseIcon
                        sx={{
                          width: '14px',
                          color: '#333333',
                          height: '14px;',
                        }}
                      />
                    </IconButton>
                  }
                  style={{
                    margin: '5px',
                    borderRadius: '4px',
                    padding: '7px',
                    fontSize: '12px',
                  }}
                />
              );
            } else {
              // 문자열인 경우
              chips.push(
                <Chip
                  key={`chip-${chipIndex++}`}
                  label={String(item)}
                  onDelete={() => onRemoveFilter(key as string, String(item))}
                  deleteIcon={
                    <IconButton
                      onClick={() => onRemoveFilter(key as string, item)}
                    >
                      <CloseIcon
                        sx={{
                          width: '14px',
                          color: '#333333',
                          height: '14px;',
                        }}
                      />
                    </IconButton>
                  }
                  style={{
                    margin: '5px',
                    borderRadius: '4px',
                    padding: '7px',
                    fontSize: '12px',
                  }}
                />
              );
            }
          });
        } else {
          // 배열이 아닌 경우 (단일 값)
          return ;
        }
      }
    }

    return chips;
  };

  const formatPriceWithComma = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return <div style={{ marginTop: '8px' }}>{renderFilterChips()}</div>;
};

export default FilterChips;
