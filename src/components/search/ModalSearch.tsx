import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useMediaQuery } from '@mui/material';

interface ModalSearchProps {
  closeModal: () => void;
}

const ModalSearch: React.FC<ModalSearchProps> = ({ closeModal }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const inputRef = useRef<HTMLInputElement>(null); // useRef 생성

  const handleSearch = (keyword: string) => {
    closeModal(); 
    navigate(`/result?search=${encodeURIComponent(keyword)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      e.preventDefault();
      handleSearch(searchValue);
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  const handleKeywordHover = (selectedKeyword: string) => {
    setSearchValue(selectedKeyword); // 호버된 검색어를 입력 필드에 설정
  };

  const handleClickSearch = () => {
    const inputValue = inputRef.current?.value;
    if (inputValue) {
      setSearchValue(inputValue);
      handleSearch(inputValue);
    }
  };

  return (
    <div style={{ width: '1000px', position: 'relative' }}>
      <div
        style={{
          position: 'relative',
          marginLeft: 0,
          maxWidth: '600px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '6px solid black',
        }}
      >
        <IconButton onClick={handleClickSearch}>
          <SearchIcon />
        </IconButton>
        <InputBase
          placeholder='Search'
          inputProps={{ 'aria-label': 'search' }}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          onKeyDown={handleKeyPress}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          inputRef={inputRef} // ref 연결
          sx={{
            width: isSmallScreen ? '80%' : '100%',
            color: 'inherit',
            flexGrow: 1,
            '& .MuiInputBase-input': {
              fontSize: isSmallScreen ? '1.5rem' : '1.7rem',
              fontWeight: 'bold',
            },
            '& input::placeholder': {
              color: '#b7b7b7',
              fontWeight: 'bold',
            },
          }}
        />
      </div>

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
        {isSmallScreen ? <h2>인기검색어</h2> : <h3>인기검색어</h3>}

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
          onMouseEnter={() => handleKeywordHover('키보드')}
          onClick={() => handleSearch('키보드')}
        >
          키보드
        </Box>
        <Box
          onMouseEnter={() => handleKeywordHover('타공판')}
          onClick={() => handleSearch('타공판')}
        >
          타공판
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
