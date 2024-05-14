import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink } from 'react-router-dom';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // const theme = createTheme({
  //   zIndex: {
  //     appBar: 1200,
  //     drawer: 1100,
  //   },
  // });

  return (
    <BottomNavigation
      sx={{ width: '100vw', position: 'fixed', bottom: '0', zIndex: '9000' }}
      showLabels
      value={value}
      onChange={handleChange}
    >
      <NavLink to='/'>
        <BottomNavigationAction
          label='Home'
          value='recents'
          icon={<RestoreIcon />}
        />
      </NavLink>
      <NavLink to='/shop'>
        <BottomNavigationAction
          label='Shopping'
          value='favorites'
          icon={<FavoriteIcon />}
        />
      </NavLink>
      <NavLink to='/community'>
        <BottomNavigationAction
          label='Community'
          value='nearby'
          icon={<LocationOnIcon />}
        />
      </NavLink>
      <NavLink to='/my'>
        <BottomNavigationAction
          label='Mypage'
          value='folder'
          icon={<FolderIcon />}
        />
      </NavLink>
    </BottomNavigation>
  );
}
