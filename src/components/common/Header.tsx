import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LoginIcon from '../../assets/images/icon-login.png';
import Notification1 from '../../assets/images/notification1.png';
// import Cart from '../../assets/images/cart.png';
import Cart1 from '../../assets/images/cart2.png';
// import Notification2 from '../../assets/images/notification2.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      light: '#e5e5e5',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#5FF531',
      light: '#F5EBFF',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#47008F',
    },
  },
});

// const StyledButton = styled(Button)`
//   &:hover {
//     background-color: transparent;
//   }
// `;

export default function Header(props: HeaderProps) {
  const { sections, title } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Toolbar
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-around',
            pb: '2px',
            m: 0.5,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <Typography
            component='h2'
            variant='h5'
            color='inherit'
            //   align="center"
            noWrap
            //   sx={{ flex: 1 }}
            style={{ position: 'sticky', top: '0' }}
          >
            {title}
            <Button
              sx={{
                ml: '34px',
                fontSize: '16px',
                fontWeight: '600',
                ':hover': {
                  bgcolor: 'transparent', // theme.palette.primary.main
                  color: '#5FF531',
                },
              }}
              size='small'
            >
              쇼핑
            </Button>
            <Button
              sx={{
                fontSize: '16px',
                fontWeight: '600',
                ':hover': {
                  bgcolor: 'transparent', // theme.palette.primary.main
                  color: '#5FF531',
                },
              }}
              size='small'
            >
              커뮤니티
            </Button>
          </Typography>
          <Box>
            <IconButton
              sx={{
                '&.MuiButtonBase-root:hover': {
                  bgcolor: 'transparent',
                },
              }}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              id='fade-button'
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{
                '&.MuiButtonBase-root:hover': {
                  bgcolor: 'transparent',
                },
              }}
            >
              <img src={LoginIcon} alt='Logo' style={{ width: '28px' }} />
            </IconButton>
            <Menu
              id='fade-menu'
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              PaperProps={{
                style: {
                  marginLeft: '-23px',
                },
              }}
            >
              <MenuItem
                onClick={handleClose}
                sx={{ fontSize: '14px', fontWeight: '300' }}
              >
                마이페이지
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                sx={{ fontSize: '14px', fontWeight: '300' }}
              >
                찜한 상품
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                sx={{ fontSize: '14px', fontWeight: '300' }}
              >
                저장한 글
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                sx={{ fontSize: '14px', fontWeight: '300' }}
              >
                로그아웃
              </MenuItem>
            </Menu>

            <IconButton
              sx={{
                '&.MuiButtonBase-root:hover': {
                  bgcolor: 'transparent',
                },
              }}
            >
              <img
                src={Notification1}
                alt='Logo'
                style={{ width: '20px', padding: 2 }}
              />
            </IconButton>
            <IconButton
              sx={{
                '&.MuiButtonBase-root:hover': {
                  bgcolor: 'transparent',
                },
              }}
            >
              <img
                src={Cart1}
                alt='Logo'
                style={{ width: '24px', padding: 2 }}
              />
            </IconButton>
            {/* <img
                src={Notification2}
                alt='Logo'
                style={{ width: '31px', padding: 3 }}
              /> */}
          </Box>
        </Toolbar>
        <Toolbar
          component='nav'
          variant='dense'
          sx={{
            width: '20%',
            display: 'flex',
            justifyContent: 'space-around',
            flex: '1',
            ml: '25%',
          }}
        >
          {sections.map(section => (
            <Link
              color='inherit'
              noWrap
              key={section.title}
              variant='body2'
              href={section.url}
              sx={{ flexShrink: 0, border: 0 }}
              style={{ textDecoration: 'none' }}
            >
              {section.title}
            </Link>
          ))}
        </Toolbar>
      </React.Fragment>
    </ThemeProvider>
  );
}
