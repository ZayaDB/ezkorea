import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { NavLink } from 'react-router-dom';
import { User } from '../types/userTypes';

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: 'none',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
  borderRadius: '10px',
};

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

const StyledButton = styled(Button)(() => ({
  ':hover': {
    color: '#5FF531',
    backgroundColor: '#000000',
  },
}));

const StyledButton2 = styled(Button)(() => ({
  ':hover': {
    color: '#5FF531',
    backgroundColor: 'transparent',
  },
}));

export default function SignIn() {
  const test = {
    email: 'dururu@gmail.com',
    password: 'guest@123!!!',
  };
  const [userData, setUserData] = useState<User[]>([]);
  // const [open, setOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const handleErrorModalClose = () => setErrorModalOpen(false);
  const navigate = useNavigate();

  // const [email, setEmail] = useState<string>('');
  // const [pw, setPw] = useState<string>('');
  // email, password 초기값으로 guest 정보 넣어놓기
  const [email, setEmail] = useState<string>(test.email);
  const [pw, setPw] = useState<string>(test.password);

  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [pwValid, setPwValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [pwTouched, setPwTouched] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/userData.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const inputEmail: string = e.target.value;
    setEmail(inputEmail);
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    setEmailValid(regex.test(inputEmail));
  };

  const handlePassWord = (e: ChangeEvent<HTMLInputElement>) => {
    const inputPassWord: string = e.target.value;
    setPw(inputPassWord);
    setPwTouched(true);
    setErrorMessage('');
    const regex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    setPwValid(regex.test(inputPassWord));
  };

  const onClickConfirmButton = () => {
    if (email === test.email && pw === test.password) {
      const prevUrl = sessionStorage.getItem('prevUrl');
      if (prevUrl) {
        navigate(prevUrl);
        sessionStorage.setItem('prevUrl', '');
      } else {
        navigate('/');
      }

      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('UserData', JSON.stringify(userData));
    } else {
      if (emailValid && pwValid) {
        if (email === userData[0].email && pw === userData[0].password) {
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('UserData', JSON.stringify(userData));
          navigate('/');
        } else {
          setErrorMessage('등록되지 않은 회원입니다.');
          setErrorModalOpen(true);
        }
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <NavLink to='/' style={{ textDecoration: 'none', color: 'black' }}>
            <Typography
              variant='h5'
              color='inherit'
              sx={{ fontSize: '40px', fontWeight: '600', pb: '25px' }}
            >
              dururu
            </Typography>
          </NavLink>
          <Box component='form' noValidate sx={{ mt: 1 }}>
            <InputTextField
              margin='dense'
              fullWidth
              id='email'
              label='Email'
              name='email'
              autoComplete='email'
              InputProps={{
                style: {
                  borderRadius: '2px',
                },
              }}
              // error={!emailValid && email.length > 0 ? true : false}
              helperText={
                !emailValid && email.length > 0
                  ? '올바른 이메일 형식이 아닙니다.'
                  : ''
              }
              value={email}
              onChange={handleEmail}
            />
            <InputTextField
              margin='dense'
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              InputProps={{
                style: {
                  borderRadius: '2px',
                },
              }}
              helperText={
                pwTouched && !pwValid && pw.trim() !== ''
                  ? errorMessage || '잘못된 비밀번호 형식입니다.'
                  : ''
              }
              // error={!pwValid || !!errorMessage}
              value={pw}
              onChange={handlePassWord}
              // error={pwTouched && !pwValid}
            />
            <StyledButton
              fullWidth
              variant='contained'
              sx={{
                mt: 3,
                mb: 1.7,
                fontSize: '16px',
                padding: '14px',
                borderRadius: '2px',
                fontWeight: '800',
                backgroundColor: 'primary',
                ':hover': {
                  bgcolor: 'primary',
                  color: 'secondary',
                },
              }}
              size='large'
              onClick={onClickConfirmButton}
              // onClick={onClickConfirmButton}
            >
              로그인하기
              {/* LOGIN */}
            </StyledButton>

            <Modal
              aria-labelledby='error-modal-title'
              aria-describedby='error-modal-description'
              open={errorModalOpen}
              onClose={handleErrorModalClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={errorModalOpen}>
                <Box sx={style}>
                  <Typography
                    id='transition-modal-title'
                    variant='h6'
                    component='h2'
                    sx={{ textAlign: 'center', borderRadius: '10px' }}
                  >
                    로그인 성공 !
                  </Typography>
                </Box>
              </Fade>
            </Modal>

            <Modal
              aria-labelledby='error-modal-title'
              aria-describedby='error-modal-description'
              open={errorModalOpen}
              onClose={handleErrorModalClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={errorModalOpen}>
                <Box sx={style}>
                  <Typography
                    id='error-modal-title'
                    variant='h6'
                    component='h2'
                    sx={{
                      textAlign: 'center',
                      borderRadius: '10px',
                      padding: '18px 0 8px 0',
                    }}
                  >
                    비밀번호가 틀렸습니다 😓
                  </Typography>
                  <StyledButton
                    onClick={handleErrorModalClose}
                    sx={{
                      width: '100%',
                      backgroundColor: 'black',
                      color: 'white',
                      fontSize: '18px',
                      marginTop: '30px',
                    }}
                  >
                    확인
                  </StyledButton>
                </Box>
              </Fade>
            </Modal>

            <Grid container>
              <Grid item xs>
                <NavLink to='/login'>
                  <StyledButton2 disableRipple sx={{ fontSize: '12px' }}>
                    Forgot password?
                  </StyledButton2>
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink to='/signup'>
                  <StyledButton2 disableRipple sx={{ fontSize: '12px' }}>
                    sign up
                  </StyledButton2>
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
