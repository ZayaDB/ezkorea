import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useState, ChangeEvent } from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { NavLink } from 'react-router-dom';

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
    color: '#666666',
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

export default function SignUp() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [pwValid, setPwValid] = useState<boolean>(false);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const inputEmail: string = e.target.value;
    setEmail(inputEmail);
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePassWord = (e: ChangeEvent<HTMLInputElement>) => {
    const inputPassWord: string = e.target.value;
    setPw(inputPassWord);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(pw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
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
            sx={{
              fontSize: '35px',
              fontWeight: '600',
              pb: '22px',
              textAlign: 'center',
              color: '#292929',
            }}
          >
            Welcome to Dururu ☺︎
            {/* Welcome to Dururu ! ☻  */}
            {/* Welcome to Dururu :-D */}
            {/* Sign up to Dururu ☻ */}
          </Typography>
          </NavLink>
          <Box component='form' noValidate sx={{ mt: 1 }}>
            <InputTextField
              margin='dense'
              fullWidth
              required
              id='email'
              label='이메일'
              name='email'
              autoComplete='email'
              InputProps={{
                style: {
                  borderRadius: '2px',
                },
              }}
              // error={!emailValid && email.length > 0 ? true : false}
              helperText={
                !emailValid &&
                email.length > 0 &&
                '올바른 이메일 형식이 아닙니다.'
              }
              value={email}
              onChange={handleEmail}
            />
            <InputTextField
              margin='dense'
              fullWidth
              required
              name='password'
              label='비밀번호'
              type='password'
              id='password'
              autoComplete='current-password'
              InputProps={{
                style: {
                  borderRadius: '2px',
                },
              }}
              helperText={
                !pwValid &&
                pw.length > 0 &&
                '영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.'
              }
              value={pw}
              onChange={handlePassWord}
            />
            <InputTextField
              margin='dense'
              fullWidth
              required
              name='password'
              label='비밀번호 확인'
              type='password'
              id='password'
              autoComplete='current-password'
              InputProps={{
                style: {
                  borderRadius: '2px',
                },
              }}
              helperText={
                !pwValid && pw.length > 0 && '비밀번호가 일치하지 않습니다.'
              }
              value={pw}
              onChange={handlePassWord}
            />
            <InputTextField
              margin='dense'
              fullWidth
              required
              name='password'
              label='휴대전화'
              type='password'
              id='password'
              autoComplete='current-password'
              InputProps={{
                style: {
                  borderRadius: '2px',
                },
              }}
              helperText={
                !pwValid && pw.length > 0 && '휴대폰 번호를 입력하세요.'
              }
              value={pw}
              onChange={handlePassWord}
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
              onClick={handleOpen}
            >
              회원가입하기
              {/* LOGIN */}
            </StyledButton>

            <Modal
              aria-labelledby='transition-modal-title'
              aria-describedby='transition-modal-description'
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <Typography
                    id='transition-modal-title'
                    variant='h6'
                    component='h2'
                    sx={{ textAlign: 'center', borderRadius: '10px' }}
                  >
                    회원가입 완료 ☻
                  </Typography>
                </Box>
              </Fade>
            </Modal>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
