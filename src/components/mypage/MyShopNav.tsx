import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../../styles/mypage/mynav.scss';
import LikesProduct from './LikesProducts';
import CartPage from '../../pages/CartPage';
import RecentViewList from './RecentViewList';
import OrderDetails from './OrderDetails';
import '../../styles/mypage/mynav.scss';
import { useMediaQuery } from '@mui/material';

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

export default function MyShopNav() {
  const [value, setValue] = React.useState(0);
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
            <Tab label='최근본상품' {...a11yProps(0)} />
            <Tab label='찜한상품' {...a11yProps(1)} />
            <Tab label='장바구니' {...a11yProps(2)} />
            <Tab label='주문내역' {...a11yProps(3)} />
          </Tabs>
        </div>
        {/* </Box> */}
        <CustomTabPanel value={value} index={0}>
          <RecentViewList />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <LikesProduct />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <CartPage />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <OrderDetails />
        </CustomTabPanel>
      </div>
    </div>
  );
}
