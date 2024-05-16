import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../../styles/mypage/mynav.scss';
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

export default function MyReviewNav() {
  const [value, setValue] = React.useState(0);
  const isSmallScreen = useMediaQuery('(max-width:615px)');
  const isMobile = useMediaQuery('(max-width:480px)');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <div>
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
            <Tab label='상품리뷰' {...a11yProps(0)} />
            <Tab label='문의내역' {...a11yProps(1)} />
          </Tabs>
        </div>
        {/* </Box> */}
        <CustomTabPanel value={value} index={0}>
          {/* 상품리뷰목록 */}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {/* 문의목록 */}
        </CustomTabPanel>
      </div>
    </div>
  );
}
