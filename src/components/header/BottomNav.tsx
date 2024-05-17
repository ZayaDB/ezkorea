import { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArticleIcon from '@mui/icons-material/Article';

export default function LabelBottomNavigation() {
  const [value, setValue] = useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);

    switch (newValue) {
      case 'home':
        window.location.href = '/';
        break;
      case 'shop':
        window.location.href = '/shop';
        break;
      case 'community':
        window.location.href = '/community';
        break;
      case 'mypage':
        if (sessionStorage.getItem('isLoggedIn') === null) {
          window.location.href = '/login';
        } else {
          window.location.href = '/my';
        }
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation
      sx={{
        width: '100vw',
        position: 'fixed',
        bottom: '0',
        padding: '32px 0',
        zIndex: '9000',
        fontSize: 'small',
        '& .Mui-selected': {
          '& .MuiBottomNavigationAction-label': {
            fontSize: theme => theme.typography.caption,
            transition: 'none',
            // fontWeight: 'bold',
            lineHeight: '20px',
          },
          '& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label': {
            color: 'black',
          },
        },
      }}
      showLabels
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        sx={{ fontSize: '10px', color: '#2c2c2c' }}
        label='Home'
        value='home'
        icon={<HomeIcon sx={{ fill: '#212529', fontSize: '28px' }} />}
      />
      <BottomNavigationAction
        sx={{ fontSize: '10px', color: '#2c2c2c' }}
        label='Shop'
        value='shop'
        icon={<ShoppingBagIcon style={{ fill: '#212529', fontSize: '25px' }} />}
      />
      <BottomNavigationAction
        sx={{ fontSize: '10px', color: '#2c2c2c' }}
        label='Community'
        value='community'
        icon={<ArticleIcon style={{ fill: '#212529', fontSize: '24px' }} />}
      />
      <BottomNavigationAction
        sx={{ fontSize: '10px', color: '#2c2c2c' }}
        label='Mypage'
        value='mypage'
        icon={<FavoriteIcon sx={{ fill: '#212529', fontSize: '24px' }} />}
      />
    </BottomNavigation>
  );
}
