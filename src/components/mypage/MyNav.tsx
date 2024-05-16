import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../../styles/mypage/mynav.scss';
import Profile from './Profile';
import MyShopNav from './MyShopNav';
import MyFeedNav from './MyFeedNav';
import MyReviewNav from './MyReviewNav';
import { useMediaQuery } from '@mui/material';
import { useLocation } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, padding: '0px' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MyNav() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab =
    queryParams.get('tab') === 'wishlist'
      ? 1
      : queryParams.get('tab') === 'feeds'
      ? 2
      : queryParams.get('tab') === 'comments'
      ? 3
      : queryParams.get('tab') === 'likes'
      ? 4
      : 0;
  const [value, setValue] = React.useState<number>(initialTab);
  const isSmallScreen = useMediaQuery('(max-width:615px)');
  const isMobile = useMediaQuery('(max-width:480px)');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ justifyContent: 'center', m: 'auto' }}>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: 1,
            borderColor: 'divider',

            // width: '100%',
          }}
        >
          <Tabs
            centered
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
            sx={{
              '& .MuiTab-root': {
                color: 'black',
                fontSize: isMobile ? '15px' : isSmallScreen ? '17px' : '17px',
                m: isMobile ? 0 : isSmallScreen ? '3px' : '6px',
                p: isMobile ? 0 : isSmallScreen ? '4px' : '6px',
                minWidth: isMobile ? '70px' : '80px',
                '&.Mui-selected': {
                  color: '#5ff531',
                  fontWeight: 'bold',
                },
              },
            }}
          >
            <Tab label='프로필' {...a11yProps(0)} />
            <Tab label='나의쇼핑' {...a11yProps(1)} />
            <Tab label='나의피드' {...a11yProps(2)} />
            <Tab label='리뷰&문의' {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Profile />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <MyShopNav />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <MyFeedNav />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <MyReviewNav />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
