import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useState, useEffect, ChangeEvent } from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { NavLink } from 'react-router-dom';
import { User } from '../types/userTypes';
// import { Phone } from '@mui/icons-material';

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

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const handlePhoneModalClose = () => setConfirmModalOpen(false);

  const [email, setEmail] = useState<string>('');
  const [emailValid, setEmailValid] = useState<boolean>(false);

  const [emailCheck, setEmailCheck] = useState<boolean>(false);

  const [pw1, setPw1] = useState<string>('');
  const [pwValid, setPwValid] = useState<boolean>(false);

  const [pw2, setPw2] = useState<string>('');
  const [pwCheck, setPwCheck] = useState<boolean>(false);
  const [pwTouched, setPwTouched] = useState<boolean>(false);

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(false);
  const [phoneNumCheck, setPhoneNumCheck] = useState<boolean>(false);

  const [auth, setAuth] = useState<string>('');
  const [authCheck, setAuthCheck] = useState<boolean>(true);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorModalOpen, setErrorModalOpen] = useState(false);

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
    const userEmailCheck = userData.find(user => user.email === inputEmail);

    setEmail(inputEmail);
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    setEmailValid(regex.test(inputEmail));
    if (emailValid && !userEmailCheck) {
      // 이메일 정규식도 통과되고 이미 존재하는 데이터에 없는 이메일이면 회원가입 가능
      setEmailCheck(true);
    }
  };

  const handlePassWord = (e: ChangeEvent<HTMLInputElement>) => {
    const inputPassWord: string = e.target.value;
    setPw1(inputPassWord);
    setPwTouched(true);
    setErrorMessage('');
    const regex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    setPwValid(regex.test(inputPassWord));
  };

  const handlePwChange = (e: ChangeEvent<HTMLInputElement>) => {
    const pwCheck: string = e.target.value;
    setPw2(pwCheck);
    if (pw1 === pwCheck && pwValid) {
      // 비밀번호 정규식을 통과했고 비밀번호 중복 체크까지 완료되면 회원가입 가능
      setPwCheck(true);
    }
  };

  const handlePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const inputPhoneNumber: string = e.target.value;
    setPhoneNumber(inputPhoneNumber);
    const regex = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    setIsPhoneNumberValid(regex.test(inputPhoneNumber));
  };

  const handlePhoneNumberClick = () => {
    setAuthCheck(false);
    if (isPhoneNumberValid) {
      // 정규식 통과: 모달 열기 또는 다른 작업 수행
      setConfirmModalOpen(true); // 모달 열기
      setPhoneNumCheck(true);
    }
    // else {
    // 정규식 통과 실패: 에러 메시지 표시 또는 다른 작업 수행
    // console.log('올바른 폰 번호가 아닙니다.');
    // }
  };

  const handleAuth = (e: ChangeEvent<HTMLInputElement>) => {
    const auth: string = e.target.value;
    setAuth(auth);
    if (auth == '1234') {
      setAuthCheck(true);
    }
  };

  const onClickConfirmButton = () => {
    let errorMessage = '';

    if (!authCheck) {
      errorMessage = '인증을 완료해주세요.\n';
    }
    if (!phoneNumCheck) {
      errorMessage = '전화번호를 다시 입력해주세요.\n';
    }
    if (!pwCheck) {
      errorMessage = '비밀번호를 다시 입력해주세요.\n';
    }
    if (!emailCheck) {
      errorMessage = '이메일을 다시 입력해주세요.\n';
    }
    if (errorMessage) {
      setErrorMessage(errorMessage);
      setErrorModalOpen(true); // 에러 모달 열기
    }
    // else {
    // 모든 조건이 충족되면 회원가입 완료 처리
    // console.log('회원가입 완료');
    // }
  };
  const handleErrorModalClose = () => setErrorModalOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
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
              Welcome to dururu ☺
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
              value={pw1}
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
              helperText={pw1 === pw2 ? '' : '비밀번호가 일치하지 않습니다.'}
              value={pw2}
              onChange={handlePwChange}
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
                !isPhoneNumberValid && phoneNumber.length > 0
                  ? '올바른 전화번호 10~11자리를 입력해주세요.'
                  : ''
              }
              value={phoneNumber}
              onChange={handlePhoneNumber}
            />
            {/* 인증하기 버튼 */}
            {isPhoneNumberValid && (
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
            )}

            {/* 인증번호 검사필드 */}
            <InputTextField
              required
              margin='dense'
              fullWidth
              label='인증번호'
              InputProps={{
                style: {
                  borderRadius: '2px',
                },
              }}
              value={auth}
              onChange={handleAuth}
              helperText={authCheck ? '' : '인증번호를 입력하세요'}
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

            {/* <Modal
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
            </Modal> */}

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
                    {errorMessage}
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
