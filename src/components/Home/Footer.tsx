import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import { createTheme, ThemeProvider, styled } from '@mui/material/';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5FF531',
      light: '#e5e5e5',
    },
    secondary: {
      main: '#000000',
      light: '#F5EBFF',
    },
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

const StyledButton = styled(Button)(() => ({
  ':hover': {
    color: '#5FF531',
    backgroundColor: '#000000',
  },
}));

function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary' mt={1}>
      {'Copyright © '}
      <Link href='https://mui.com/' sx={{ fontWeight: '500', color: 'rgba(0, 0, 0, 0.6)' }}>
        dururu&nbsp;
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 6, sm: 10 },
          // py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
              {/* <Box sx={{ ml: '-15px' }}> */}
              <Typography sx={{ fontSize: '26px', fontWeight: '600', color: '#212529' }}>
                dururu
              </Typography>
              {/* <img
                // src={
                //   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                // }
                style={logoStyle}
                alt='logo of sitemark'
              /> */}
              {/* </Box> */}
              <Typography
                variant='body2'
                fontWeight={600}
                gutterBottom
                sx={{ color: '#5ff531' }}
              >
                Newsletter
              </Typography>
              <Typography variant='body2' color='text.secondary' mb={2}>
                Subscribe to our newsletter for weekly updates and promotions.
              </Typography>
              <Stack direction='row' spacing={1} useFlexGap>
                <TextField
                  id='outlined-basic'
                  hiddenLabel
                  size='small'
                  variant='outlined'
                  fullWidth
                  aria-label='Enter your email address'
                  placeholder='Your email address'
                  inputProps={{
                    autoComplete: 'off',
                    'aria-label': 'Enter your email address',
                  }}
                />
                <StyledButton
                  variant='contained'
                  color='secondary'
                  sx={{
                    flexShrink: 0,
                  }}
                >
                  Subscribe
                </StyledButton>
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant='body2' fontWeight={600}>
              Product
            </Typography>
            <Link color='text.secondary'>Features</Link>
            <Link color='text.secondary'>Testimonials</Link>
            <Link color='text.secondary'>Highlights</Link>
            <Link color='text.secondary'>Pricing</Link>
            <Link color='text.secondary'>FAQs</Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant='body2' fontWeight={600}>
              Company
            </Typography>
            <Link color='text.secondary'>About us</Link>
            <Link color='text.secondary'>Careers</Link>
            <Link color='text.secondary'>Press</Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant='body2' fontWeight={600}>
              Legal
            </Typography>
            <Link color='text.secondary'>Terms</Link>
            <Link color='text.secondary'>Privacy</Link>
            <Link color='text.secondary'>Contact</Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <div>
            <Link
              sx={{
                fontSize: '14px',
                textDecoration: 'none',
                color: '#cdcdcd',
              }}
              // color='text.secondary'
            >
              이 사이트는 상업적 목적이 없는 포트폴리오 사이트임을 알립니다.
            </Link>
            <Copyright />
          </div>
          <Stack
            direction='row'
            justifyContent='left'
            spacing={1}
            useFlexGap
            sx={{
              color: 'text.secondary',
            }}
          >
            <IconButton
              color='inherit'
              href='https://github.com/Jy0042/dururu'
              aria-label='GitHub'
              sx={{ alignSelf: 'center' }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color='inherit'
              href='https://twitter.com/MaterialUI'
              aria-label='X'
              sx={{ alignSelf: 'center' }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color='inherit'
              href='https://www.linkedin.com/company/mui/'
              aria-label='LinkedIn'
              sx={{ alignSelf: 'center' }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
