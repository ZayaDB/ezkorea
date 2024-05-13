import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <BottomNavigation
        sx={{ width: 500, zIndex: 'appBar' }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label='HOME'
          value='home'
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          label='SHOP'
          value='shop'
          icon={<LocationOnIcon />}
        />
        <BottomNavigationAction
          label='COMMUNITY'
          value='community'
          icon={<FolderIcon />}
        />
        <BottomNavigationAction
          label='MYPAGE'
          value='mypage'
          icon={<FavoriteIcon />}
        />
      </BottomNavigation>
    </ThemeProvider>
  );
}
