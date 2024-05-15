import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '30px',
  backgroundColor: alpha(theme.palette.common.white, 0),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0),
  },
  marginLeft: 0,
  width: 'auto',
  maxWidth: '700px',
  height: '70px',
  display: 'flex',
  alignItems: 'center',
  marginRight: '50%',
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
    padding: theme.spacing(1, 1, 1, 3), // 텍스트 입력 여백 조정
    fontSize: '2rem', // 폰트 크기 조정
    fontWeight: 'bold', // 폰트 굵기 조정
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  '& input::placeholder': {
    color: '#b7b7b7',
    fontWeight: 'bold',
  },
}));

const ModalSearch = () => {
  return (
    <div style={{ width: '1000px', position: 'relative' }}>
      <Search>
        <SearchIconWrapper>
          <IconButton edge='end'>
            <SearchIcon fontSize='large' /> {/* 아이콘 크기 조정 */}
          </IconButton>
        </SearchIconWrapper>
        <StyledInputBase
          placeholder='Search'
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
      <hr
        style={{ width: '100%', margin: '20px 0', borderTop: '6px solid #000' }}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
          '& > *': {
            padding: '3px',
            fontWeight: '700',
          },
        }}
      >
        <h2>인기검색어</h2>
        <Box>모션데스크</Box>
        <Box>의자</Box>
        <Box>모니터</Box>
        <Box>마우스</Box>
        <Box>조명</Box>
        <Box>인기제품</Box>
        <Box>세일</Box>
        <Box>마우스패드</Box>
      </Box>
    </div>
  );
};

export default ModalSearch;
