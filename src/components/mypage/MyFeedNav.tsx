import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../../styles/mypage/mynav.scss';
import '../../styles/mypage/mynav.scss';
import { useMediaQuery } from '@mui/material';
import MyFeed from '../community/myPage/MyFeed';
import MyComments from '../community/myPage/MyComments';
import MyLikedFeeds from '../community/myPage/MyLikedFeeds';
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
        <Box>
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

export default function MyFeedNav() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab =
    queryParams.get('tab') === 'feeds'
      ? 0
      : queryParams.get('tab') === 'comments'
      ? 1
      : queryParams.get('tab') === 'likes'
      ? 2
      : 0;

  const [value, setValue] = React.useState<number>(initialTab);
  const isSmallScreen = useMediaQuery('(max-width:615px)');
  const isMobile = useMediaQuery('(max-width:480px)');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    // <Box sx={{ justifyContent: 'center', m: 'auto' }}>
    <div>
      <div>
        {/* <Box sx={{ p: 0, borderBottom: 1, borderColor: 'divider' }}>
         */}
        <div style={{ marginTop: '11px' }}>
          <Tabs
            className='MuiTabs-myshop'
            centered
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
            sx={{
              '& .MuiTab-root': {
                color: 'black',
                fontSize: isMobile ? '13px' : isSmallScreen ? '13px' : '14px',
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
            <Tab label='작성한 피드' {...a11yProps(0)} />
            <Tab label='작성한 댓글' {...a11yProps(1)} />
            <Tab label='좋아요한 피드' {...a11yProps(2)} />
          </Tabs>
        </div>
        {/* </Box> */}
        <CustomTabPanel value={value} index={0}>
          <MyFeed />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <MyComments />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <MyLikedFeeds />
        </CustomTabPanel>
      </div>
    </div>
  );
}
