import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: alpha(theme.palette.common.white, 0),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0),
  },
  marginLeft: 0,
  maxWidth: '600px',
  height: '70px',
  display: 'flex',
  alignItems: 'center',
  borderBottom: '6px solid black',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  flexGrow: 1,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 3),
    fontSize: '2rem',
    fontWeight: 'bold',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
  },
  '& input::placeholder': {
    color: '#b7b7b7',
    fontWeight: 'bold',
  },
}));
interface ModalSearchProps {
  onSearch: (selectedKeyword: string) => void;
  closeModal: () => void;
}

const ModalSearch: React.FC<ModalSearchProps> = ({ onSearch, closeModal }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (selectedKeyword: string) => {
    if (onSearch) {
      closeModal(); // 모달 닫기
      navigate(`/result?search=${encodeURIComponent(selectedKeyword)}`);
      onSearch(selectedKeyword); // 검색어 전달
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 폼 제출 동작 방지
      handleSearch(searchValue);
    }
  };

  const handleKeywordHover = (selectedKeyword: string) => {
    setSearchValue(selectedKeyword); // 호버된 검색어를 입력 필드에 설정
  };

  return (
    <div style={{ width: '1000px', position: 'relative' }}>
      <Search>
        <SearchIconWrapper>
          <IconButton edge='end' onClick={() => handleSearch(searchValue)}>
            <SearchIcon fontSize='large' />
          </IconButton>
        </SearchIconWrapper>
        <StyledInputBase
          placeholder='Search'
          inputProps={{ 'aria-label': 'search' }}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </Search>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
          '& > *': {
            padding: '3px',
            fontWeight: '700',
            cursor: 'pointer',
          },
        }}
      >
        <h2>인기검색어</h2>
        <Box
          onMouseEnter={() => handleKeywordHover('모션데스크')}
          onClick={() => handleSearch('모션데스크')}
        >
          모션데스크
        </Box>
        <Box
          onMouseEnter={() => handleKeywordHover('의자')}
          onClick={() => handleSearch('의자')}
        >
          의자
        </Box>
        <Box
          onMouseEnter={() => handleKeywordHover('모니터')}
          onClick={() => handleSearch('모니터')}
        >
          모니터
        </Box>
        <Box
          onMouseEnter={() => handleKeywordHover('마우스')}
          onClick={() => handleSearch('마우스')}
        >
          마우스
        </Box>
        <Box
          onMouseEnter={() => handleKeywordHover('조명')}
          onClick={() => handleSearch('조명')}
        >
          조명
        </Box>
        <Box
          onMouseEnter={() => handleKeywordHover('인기제품')}
          onClick={() => handleSearch('인기제품')}
        >
          인기제품
        </Box>
        <Box
          onMouseEnter={() => handleKeywordHover('세일')}
          onClick={() => handleSearch('세일')}
        >
          세일
        </Box>
        <Box
          onMouseEnter={() => handleKeywordHover('마우스패드')}
          onClick={() => handleSearch('마우스패드')}
        >
          마우스패드
        </Box>
      </Box>
    </div>
  );
};

export default ModalSearch;
