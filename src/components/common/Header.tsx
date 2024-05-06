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

export default function Header(props: HeaderProps) {
  const { sections, title } = props;

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Toolbar
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-around',
            p: 1,
            m: 1,
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
          >
            {title}
            <Button sx={{ ml: '40px', fontSize: '18px' }} size='small'>
              쇼핑
            </Button>
            <Button sx={{ fontSize: '18px' }} size='small'>
              커뮤니티
            </Button>
          </Typography>
          <Box>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton>
              <img
                src={LoginIcon}
                alt='Logo'
                style={{ width: '28px', padding: 3 }}
              />
              <img
                src={LoginIcon}
                alt='Logo'
                style={{ width: '28px', padding: 3 }}
              />
              <img
                src={LoginIcon}
                alt='Logo'
                style={{ width: '28px', padding: 3 }}
              />
            </IconButton>
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
            ml: '25.5%',
          }}
        >
          {sections.map(section => (
            <Link
              color='inherit'
              noWrap
              key={section.title}
              variant='body2'
              href={section.url}
              sx={{ p: 1, flexShrink: 0 }}
            >
              {section.title}
            </Link>
          ))}
        </Toolbar>
      </React.Fragment>
    </ThemeProvider>
  );
}