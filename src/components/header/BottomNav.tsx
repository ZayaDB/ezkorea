import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

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
        window.location.href = '/my';
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
        label='Home'
        value='home'
        icon={<WidgetsIcon style={{ fill: '#000000', fontSize: '26px' }} />}
      />
      <BottomNavigationAction
        label='Shop'
        value='shop'
        icon={
          <ShoppingBagOutlinedIcon
            style={{ fill: '#000000', fontSize: '26px' }}
          />
        }
      />
      <BottomNavigationAction
        label='Community'
        value='community'
        icon={
          <ArticleOutlinedIcon style={{ fill: '#000000', fontSize: '26px' }} />
        }
      />
      <BottomNavigationAction
        label='Mypage'
        value='mypage'
        icon={
          <FavoriteBorderOutlinedIcon
            style={{ fill: '#000000', fontSize: '26px' }}
          />
        }
      />
    </BottomNavigation>
  );
}
