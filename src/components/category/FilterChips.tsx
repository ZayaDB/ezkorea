import { Chip, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/config';
import { Filters } from '../../types/productTypes';
import { removeSelectedFilter } from '../../redux/slices/categorySlice';
import CloseIcon from '@mui/icons-material/Close';

const FilterChips = () => {
  const dispatch = useDispatch();

  const selectedFilters = useSelector(
    (state: RootState) => state.category.selectedFilters
  );

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
          const firstValue = Number(value[0]);
          const secondValue = Number(value[1]);

          if (!isNaN(firstValue) && !isNaN(secondValue)) {
            if (firstValue !== secondValue) {
              const label = `${formatPriceWithComma(
                firstValue
              )} ~ ${formatPriceWithComma(secondValue)}`;

              chips.push(
                <Chip
                  key={`chip-${chipIndex++}`}
                  label={label}
                  onDelete={() =>
                    onRemoveFilter(
                      key as string,
                      Number([firstValue, secondValue])
                    )
                  }
                  deleteIcon={
                    <IconButton
                      onClick={() =>
                        onRemoveFilter(
                          key as string,
                          Number([firstValue, secondValue])
                        )
                      }
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
              // 두 숫자가 동일하면 해당 값을 출력
              const label = formatPriceWithComma(firstValue);

              chips.push(
                <Chip
                  key={`chip-${chipIndex++}`}
                  label={label}
                  onDelete={() =>
                    onRemoveFilter(key as string, Number([firstValue]))
                  }
                  deleteIcon={
                    <IconButton
                      onClick={() =>
                        onRemoveFilter(key as string, Number([firstValue]))
                      }
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
          }
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
