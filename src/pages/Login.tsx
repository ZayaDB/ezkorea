import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
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

const User = {
  email: 'dururu@gmail.com',
  pw: 'dururu123!',
};

export default function SignIn() {
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

  // const onClickConfirmButton = () => {
  //   if (email === User.email && pw === User.pw) {
  //     setIsModalOpen(true);
  //   } else {
  //     alert('등록되지 않은 회원입니다.');
  //   }
  // };

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
          <Typography
            variant='h5'
            color='inherit'
            sx={{ fontSize: '35px', fontWeight: '600', pb: '22px' }}
          >
            LOGIN
          </Typography>
          <Box component='form' noValidate sx={{ mt: 1 }}>
            <InputTextField
              margin='dense'
              fullWidth
              id='email'
              label='Email Address'
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
                !pwValid && pw.length > 0 && '비밀번호가 일치하지 않습니다.'
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
              // onClick={onClickConfirmButton}
            >
              로그인하기
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
                    로그인 성공 !
                  </Typography>
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
