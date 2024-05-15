import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../../styles/mypage/mynav.scss';
import Profile from './Profile';
import ProfileImage from './ProfileImage';
import MyShopNav from './MyShopNav';

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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ justifyContent: 'center', m: 'auto' }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab label='프로필' {...a11yProps(0)} sx={{ maxWidth: '300px' }} />
            <Tab label='나의쇼핑' {...a11yProps(1)} />
            <Tab label='나의피드' {...a11yProps(2)} />
            <Tab label='리뷰&문의' {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div style={{ maxWidth: '1200px' }}>
            <ProfileImage />
            <Profile />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <MyShopNav />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          커뮤니티 피드
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          작성한 리뷰 및 문의관리
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
