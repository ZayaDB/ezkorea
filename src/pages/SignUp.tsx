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
  borderRadius: '4px',
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
  const [userData, setUserData] = useState<User[]>([]);
  // const [open, setOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const handlePhoneModalClose = () => setConfirmModalOpen(false);
  const handleErrorModalClose = () => setErrorModalOpen(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
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
    const user = userData.find(user => user.email === email);

    if (emailValid && pwValid) {
      if (user) {
        if (user.password === pw) {
          console.log('success');
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('UserData', JSON.stringify(userData));
          navigate('/');
        } else {
          setErrorMessage('비밀번호가 틀렸습니다.');
          setPwValid(false);
        }
      } else {
        setErrorMessage('등록되지 않은 회원입니다.');
        setErrorModalOpen(true);
      }
    }
  };

  const [phoneNumber, setPhoneNumber] = useState<string>('');
const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(false);

const handlePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
  const inputPhoneNumber: string = e.target.value;
  setPhoneNumber(inputPhoneNumber);
  const regex = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
  setIsPhoneNumberValid(regex.test(inputPhoneNumber));
};

  const handlePhoneNumberClick = () => {
    if (isPhoneNumberValid) {
      // 정규식 통과: 모달 열기 또는 다른 작업 수행
      setConfirmModalOpen(true); // 모달 열기
    } else {
      // 정규식 통과 실패: 에러 메시지 표시 또는 다른 작업 수행
      console.log('올바른 폰 번호가 아닙니다.');
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
              sx={{ fontSize: '37px', fontWeight: '600', pb: '25px' }}
            >
              Welcome to Dururu ☺
            </Typography>
          </NavLink>
          <Box component='form' noValidate sx={{ mt: 1 }}>
            {/* email */}
            <InputTextField
              required
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
              helperText={
                !emailValid && email.length > 0
                  ? '올바른 이메일 형식이 아닙니다.'
                  : ''
              }
              value={email}
              onChange={handleEmail}
            />

            {/* password */}
            <InputTextField
              required
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
                pwTouched && !pwValid
                  ? errorMessage || '잘못된 비밀번호 형식입니다.'
                  : ''
              }
              value={pw}
              onChange={handlePassWord}
              error={pwTouched && !pwValid}
            />

            {/* confirm password */}
            <InputTextField
              required
              margin='dense'
              fullWidth
              name='confirmPassword'
              label='Confirm password'
              type='password'
              id='confirm-password'
              autoComplete='current-password'
              InputProps={{
                style: {
                  borderRadius: '2px',
                },
              }}
              helperText={
                pwTouched && !pwValid
                  ? errorMessage || '잘못된 비밀번호 형식입니다.'
                  : ''
              }
              value={pw}
              onChange={handlePassWord}
              error={pwTouched && !pwValid}
            />

            {/* phone number */}
            <InputTextField
              required
              margin='dense'
              fullWidth
              id='phone-number'
              label='Mobile Phone'
              name='phoneNumber'
              autoComplete='phone-number'
              InputProps={{
                style: {
                  borderRadius: '2px',
                },
              }}
              helperText={
                !emailValid && email.length > 0
                  ? '올바른 전화번호 10~11자리를 입력해주세요.'
                  : ''
              }
              value={phoneNumber}
              onChange={handlePhoneNumber}
              // onChange={handleEmail}
            />

            {/* 인증하기 버튼 */}
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
              onClick={handlePhoneNumberClick} 
              disabled={!isPhoneNumberValid}
            >
              인증하기
            </StyledButton>

            {/* name */}
            <InputTextField
              margin='dense'
              fullWidth
              id='email'
              label='Name'
              name='email'
              autoComplete='email'
              InputProps={{
                style: {
                  borderRadius: '2px',
                },
              }}
              helperText={
                !emailValid && email.length > 0
                  ? '올바른 이메일 형식이 아닙니다.'
                  : ''
              }
              value={email}
              onChange={handleEmail}
            />

            {/* signUp button */}
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
              회원가입하기
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
                    sx={{ textAlign: 'center', borderRadius: '10px' }}
                  >
                    등록되지 않은 회원입니다.
                  </Typography>
                </Box>
              </Fade>
            </Modal>

            <Modal
              aria-labelledby='error-modal-title'
              aria-describedby='error-modal-description'
              open={confirmModalOpen}
              onClose={handlePhoneModalClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={confirmModalOpen}>
                <Box sx={style}>
                  <Typography
                    id='error-modal-title'
                    variant='h6'
                    component='h2'
                    sx={{ textAlign: 'center', borderRadius: '10px' }}
                  >
                   핸드폰 인증하기
                  </Typography>
                  <StyledButton
                    onClick={handlePhoneModalClose}
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

            <Grid container style={{ textAlign: 'center' }}>
              <Grid item xs>
                <NavLink to='/login'>
                  <StyledButton2 disableRipple sx={{ fontSize: '12px' }}>
                    Already have an ID?
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
