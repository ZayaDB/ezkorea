import '../../styles/mypage/profile.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      light: '#e5e5e5',
    },
    secondary: {
      main: '#5FF531',
      light: '#F5EBFF',
      contrastText: '#47008F',
    },
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: '#D32F2F',
          // fontWeight: '500',
        },
      },
    },
  },
});

const InputTextField = styled(TextField)({
  '& label': {
    // placeholder text color
    color: '#7f7f7f',
  },
  '& label.Mui-focused': {
    // 해당 input focus 되었을 때 placeholder text color
    // floatng label을 사용할 때 처리 필요
    color: '#5FF531',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'yellow',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#e5e5e5',
    },
    '&:hover fieldset': {
      borderColor: '#c0c0c0',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#000000',
      borderWidth: '1.8px',
    },
  },
});

export default function Profile() {
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
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
    </ThemeProvider>
  );
}
