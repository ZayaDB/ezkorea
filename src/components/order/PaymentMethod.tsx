import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';

import Head from './Head';

/* 이미지 */
import kakao_src from '../../assets/images/bank_kakao.png';
import kb_src from '../../assets/images/bank_kb.png';
import nh_src from '../../assets/images/bank_nh.png';
import sh_src from '../../assets/images/bank_sh.png';
import kakao_card_src from '../../assets/images/card_kakao.png';
import kb_card_src from '../../assets/images/card_kb.png';
import ss_card_src from '../../assets/images/card_samsung.png';
import sh_card_src from '../../assets/images/card_sh.png';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

/* 결제수단 */
export default function PaymentMethod() {
  const [selected, setSelected] = useState<number>(0);

  return (
    <div className='payment-contianer'>
      <Head text='결제수단' />
      <div className='payment-contianer-content'>
        <label>
          <input
            type='radio'
            name='payment'
            id='account'
            defaultChecked={true}
            onClick={() => {
              setSelected(0);
            }}
          />
          계좌 간편결제
          {selected == 0 ? <PaymentCarousel method='account' /> : ''}
        </label>
        <label>
          <input
            type='radio'
            name='payment'
            id='card'
            onClick={() => {
              setSelected(1);
            }}
          />
          카드 간편결제
          {selected == 1 ? <PaymentCarousel method='card' /> : ''}
        </label>
        <label>
          <input
            type='radio'
            name='payment'
            id='general'
            onClick={() => {
              setSelected(2);
            }}
          />
          일반결제
          {selected == 2 ? <GeneralContent /> : ''}
        </label>
      </div>
    </div>
  );
}

/* 간편결제 content */
function PaymentCarousel({ method }: { method: string }) {
  let selectedItems: Array<{
    name: string;
    description?: string;
    src: string;
  }> = [];

  let imgClassName = '';

  if (method === 'account') {
    selectedItems = [
      {
        name: 'KB국민',
        src: kb_src,
      },
      {
        name: '카카오뱅크',
        src: kakao_src,
      },
      {
        name: 'NH농협',
        src: nh_src,
      },
      {
        name: '신한',
        src: sh_src,
      },
    ];
    imgClassName = 'bank_img';
  } else if (method === 'card') {
    selectedItems = [
      {
        name: 'KB국민 트래블 체크카드',
        src: kb_card_src,
      },
      {
        name: '카카오 체크카드',
        src: kakao_card_src,
      },
      {
        name: '삼성 taptap',
        src: ss_card_src,
      },
      {
        name: '신한카드 Deep Dream',
        src: sh_card_src,
      },
    ];
    imgClassName = 'card_img';
  }

  return (
    <div className='carousel-container'>
      <Carousel
        cycleNavigation={false}
        autoPlay={false}
        indicators={false}
        navButtonsAlwaysVisible={true}
        animation='slide'
        fullHeightHover={true}
        navButtonsProps={{
          style: {
            backgroundColor: '#E5E5E5',
          },
        }}
        navButtonsWrapperProps={{
          style: {
            bottom: '0',
            top: 'unset',
          },
        }}
      >
        {selectedItems.map((item, i) => (
          <Item key={i} item={item} imgClass={imgClassName} />
        ))}
      </Carousel>
    </div>
  );
}

interface ItemProps {
  item: {
    name: string;
    src: string;
  };
  imgClass: string;
}

function Item(props: ItemProps) {
  // console.log(props);

  const containerClass =
    props.imgClass === 'card_img'
      ? 'card-container'
      : 'account-content-container';

  return (
    <Paper>
      <div id='flex'>
        <div className={containerClass}>
          <img src={props.item.src} alt='bank img' className={props.imgClass} />
          <div>
            <div>{props.item.name}</div>
            <div>3333*******</div>
          </div>
        </div>
      </div>
    </Paper>
  );
}

/* 일반 결제 */
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
        <Box sx={{ p: 3 }}>
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

/* 일반 결제 content */
function GeneralContent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  /* 신용/체크카드 카드사 선택 */
  const [cardcompany, setCardcompany] = useState<string>();
  const [bank, setBank] = useState<string>();

  const handleChangeCard = (event: SelectChangeEvent) => {
    setCardcompany(event.target.value as string);
  };
  const handleChangeBank = (event: SelectChangeEvent) => {
    setBank(event.target.value as string);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='신용/체크카드' {...a11yProps(0)} />
          <Tab label='무통장입금' {...a11yProps(1)} />
          {/* <Tab label='네이버페이' {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* 신용/체크카드 */}
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>
            카드사를 선택해주세요
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={cardcompany}
            label=' 카드사를 선택해주세요 '
            onChange={handleChangeCard}
          >
            <MenuItem value={10}>KB국민카드</MenuItem>
            <MenuItem value={20}>신한카드</MenuItem>
            <MenuItem value={30}>삼성카드</MenuItem>
            <MenuItem value={40}>현대카드</MenuItem>
            <MenuItem value={50}>BC카드</MenuItem>
            <MenuItem value={60}>롯데카드</MenuItem>
            <MenuItem value={70}>KEB하나카드</MenuItem>
            <MenuItem value={80}>우리카드</MenuItem>
            <MenuItem value={90}>NH농협카드</MenuItem>
            <MenuItem value={100}>씨티카드</MenuItem>
            <MenuItem value={110}>카카오뱅크카드</MenuItem>
            <MenuItem value={120}>케이뱅크카드</MenuItem>
            <MenuItem value={130}>전북카드</MenuItem>
            <MenuItem value={140}>광주카드</MenuItem>
          </Select>
        </FormControl>
        {cardcompany != undefined ? <Installment /> : ''}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/* 무통장 입금 */}
        <FormControl fullWidth>
          <InputLabel>은행을 선택해주세요</InputLabel>
          <Select
            value={bank}
            label=' 은행을 선택해주세요'
            onChange={handleChangeBank}
          >
            <MenuItem value={10}>농협</MenuItem>
            <MenuItem value={20}>국민은행</MenuItem>
            <MenuItem value={30}>신한은행</MenuItem>
            <MenuItem value={40}>우리은행</MenuItem>
            <MenuItem value={50}>기업은행</MenuItem>
            <MenuItem value={60}>하나은행</MenuItem>
            <MenuItem value={70}>대구은행</MenuItem>
            <MenuItem value={80}>부산은행</MenuItem>
            <MenuItem value={90}>우체국</MenuItem>
            <MenuItem value={100}>SC제일은행</MenuItem>
            <MenuItem value={110}>광주은행</MenuItem>
            <MenuItem value={120}>경남은행</MenuItem>
            <MenuItem value={130}>수협</MenuItem>
            <MenuItem value={140}>케이뱅크</MenuItem>
          </Select>
        </FormControl>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {/* 네이버페이 */}
      </CustomTabPanel>
    </Box>
  );
}

function Installment() {
  const [installment, setInstallment] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setInstallment(event.target.value as string);
  };

  return (
    <div>
      <FormControl fullWidth>
        <Select
          value={installment}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value=''>일시불</MenuItem>
          <MenuItem value={2}>2개월 무이자</MenuItem>
          <MenuItem value={3}>3개월 무이자</MenuItem>
          <MenuItem value={4}>4개월</MenuItem>
          <MenuItem value={5}>5개월</MenuItem>
          <MenuItem value={6}>6개월</MenuItem>
          <MenuItem value={7}>7개월</MenuItem>
          <MenuItem value={8}>8개월</MenuItem>
          <MenuItem value={9}>9개월</MenuItem>
          <MenuItem value={10}>10개월</MenuItem>
          <MenuItem value={11}>11개월</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
