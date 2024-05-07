import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LoginIcon from '../../assets/images/icon-login.png';
import Notification1 from '../../assets/images/notification1.png';
import Cart1 from '../../assets/images/cart2.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Badge from '@mui/material/Badge';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { useMediaQuery } from '@mui/material';
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
    },
    secondary: {
      main: '#5FF531',
      light: '#F5EBFF',
    },
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export default function Header(props: HeaderProps) {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { sections, title } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const classes = useStyles();
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
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
            width: '100dvw',
            position: 'fixed',
            bgcolor: 'background.paper',
            zIndex: 'appBar',
            // borderRadius: 1,
          }}
        >
          {isMobile && (
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
                style={{ width: '24px', padding: 2 }}
              />
            </IconButton>
          )}

          <Typography
            component='h2'
            variant='h5'
            color='inherit'
            align='center'
            noWrap
            style={{ position: 'sticky', top: '0' }}
          >
            {title}
            {isMobile ? null : (
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
                disableRipple
              >
                쇼핑
              </Button>
            )}
            {isMobile ? null : (
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
                disableRipple
              >
                커뮤니티
              </Button>
            )}
          </Typography>
          <Box>
            {isMobile ? null : (
              <IconButton disableRipple>
                <Paper
                  component='form'
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: 180,
                    height: 28,
                    boxShadow: '0',
                    border: '1px solid #e5e5e5',
                  }}
                >
                  <InputBase
                    sx={{
                      ml: 1,
                      flex: 1,
                    }}
                    // placeholder='Search Google Maps'
                  />
                  <IconButton
                    type='button'
                    sx={{ p: '3px' }}
                    aria-label='search'
                    disableRipple
                  >
                    <SearchIcon sx={{ fontSize: '22px' }} />
                  </IconButton>
                </Paper>
              </IconButton>
            )}
            {isMobile ? null : (
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
            )}
            {isMobile ? null : (
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
                    marginLeft: '-24px',
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
            )}
            {isMobile && (
              <IconButton
                type='button'
                sx={{ p: '3px' }}
                aria-label='search'
                disableRipple
              >
                <SearchIcon sx={{ fontSize: '22px' }} />
              </IconButton>
            )}
            {isMobile ? null : (
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
                  style={{ width: '24px', padding: 2 }}
                />
              </IconButton>
            )}
            <Badge
              badgeContent={5}
              color='secondary'
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: 9,
                  height: 15,
                  minWidth: 10,
                  right: 8,
                  top: 11,
                  padding: '0 4px',
                  border: '2px solid white',
                },
              }}
            >
              <IconButton
                sx={{
                  '&.MuiButtonBase-root:hover': {
                    bgcolor: 'transparent',
                  },
                }}
              >
                <img src={Cart1} alt='Logo' style={{ width: '24px' }} />
              </IconButton>
            </Badge>
          </Box>
        </Toolbar>
        {isMobile ? null : (
          <Toolbar
            component='nav'
            variant='dense'
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              position: 'fixed',
              mt: '64px',
              background: 'white',
              width: '100dvw',
              zIndex: 'appBar',
            }}
          >
            {sections.map(section => (
              <Link
                color='inherit'
                noWrap
                key={section.title}
                variant='body2'
                href={section.url}
                sx={{
                  flexShrink: 0,
                  border: 0,
                  pl: '70px',
                  // ml: '60px',
                }}
                style={{ textDecoration: 'none' }}
              >
                {section.title}
              </Link>
            ))}
          </Toolbar>
        )}
      </React.Fragment>
    </ThemeProvider>
  );
}
