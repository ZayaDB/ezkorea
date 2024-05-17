import { Button } from '@mui/material';
import '../../styles/mypage/profile.scss';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import { createTheme } from '@mui/material/styles';
import '../../styles/mypage/profile.scss';
import { styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)(() => ({
  ':hover': {
    color: '#5FF531',
    backgroundColor: '#000000',
  },
}));

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#000000',
//       light: '#e5e5e5',
//     },
//     secondary: {
//       main: '#5FF531',
//       light: '#F5EBFF',
//       contrastText: '#47008F',
//     },
//   },
//   components: {
//     MuiFormHelperText: {
//       styleOverrides: {
//         root: {
//           color: '#D32F2F',
//           // fontWeight: '500',
//         },
//       },
//     },
//   },
// });

// const InputTextField = styled(TextField)({
//   '& label': {
//     // placeholder text color
//     color: '#7f7f7f',
//   },
//   '& label.Mui-focused': {
//     // 해당 input focus 되었을 때 placeholder text color
//     // floatng label을 사용할 때 처리 필요
//     color: '#5FF531',
//   },
//   '& .MuiInput-underline:after': {
//     borderBottomColor: 'yellow',
//   },
//   '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//       borderColor: '#e5e5e5',
//     },
//     '&:hover fieldset': {
//       borderColor: '#c0c0c0',
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: '#000000',
//       borderWidth: '1.8px',
//     },
//   },
// });

export default function Profile() {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    navigate('/');
  };
  return (
    <div>
      <div className='profile-container'>
        <div className='profileimage'>
          <img
            src='https://i.pinimg.com/564x/de/0d/ef/de0def59d80f85f8962e9992f429e004.jpg'
            alt='profile'
          />
        </div>
      </div>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <StyledButton
          onClick={logout}
          sx={{
            width: '80%',

            backgroundColor: 'black',
            color: 'white',
            fontSize: '18px',
            marginTop: '300px',
          }}
        >
          로그아웃
        </StyledButton>
      </div>
      {/* <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <Box
            sx={{
              // marginTop: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box>회원정보</Box>
            <Box>성명</Box>
            <Box>연락처</Box>

            <Box component='form' noValidate sx={{ mt: 1 }}>
              <InputTextField
                margin='dense'
                fullWidth
                id='email'
                // label='Email Address'
                name='email'
                autoComplete='email'
                // value={userData[0].email}
                InputProps={{
                  style: {
                    borderRadius: '2px',
                  },
                }}
              />
              <InputTextField
                margin='dense'
                fullWidth
                name='password'
                type='password'
                id='password'
                autoComplete='current-password'
                InputProps={{
                  style: {
                    borderRadius: '2px',
                  },
                }}
              />
            </Box>
          </Box>
        </Container>
      </ThemeProvider> */}
    </div>
  );
}
