import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../styles/theme';
import '../../styles/productDetail/inquire.scss';
import { useState, useEffect } from 'react';
import { Inquiry } from '../../types/productDetail';

export default function Inquire() {
  const [page, setPage] = useState(1);
  const [inquiryData, setInquiryData] = useState<Inquiry[]>([]);
  const inquiryPerPage = 5;

  // 리뷰 개수
  const [iqTotal, setIqTotal] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/prodInquiry.json');
        const data = await response.json();
        const inquiry = data[0].inquiry;
        const inquiryTo = data[0].inquiryTotal;
        setInquiryData(inquiry);
        setIqTotal(inquiryTo);
      } catch (error) {
        console.error('Error fetching review data:', error);
      }
    };

    fetchData();
  }, []);
  // 페이지네이션
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  // 현재 페이지에 해당하는 문의 목록 계산
  const startIndex = (page - 1) * inquiryPerPage;
  const endIndex = page * inquiryPerPage;
  const currentPageInquiries = inquiryData.slice(startIndex, endIndex);
  console.log(currentPageInquiries);

  return (
    <ThemeProvider theme={theme}>
      <div id='inquiryZone'>
        <div id='inquireTop'>
          <div id='inquireSubTop'>
            <div className='inquiryTitle'>문의</div>
            <div className='inquiryTotal'>{iqTotal}</div>
          </div>
        </div>
        <div id='writingInquiry'>
          {currentPageInquiries.map((inquiry, index) => (
            <div className='inquiryItem' key={index}>
              <div>
                <span>{inquiry.inquiryType} | </span>
                <span>{inquiry.answer}</span>
                <div className='writingInfo'>
                  <div className='type'>Q</div>
                  <div className='writingUser'>{inquiry.inUserName}</div>
                  <div className='writingDate'>{inquiry.inDate}</div>
                </div>
                <div className='reviewedContent'>{inquiry.inUserText}</div>
              </div>
              <div>
                <div className='answerInfo'>
                  <div className='type'>A</div>
                  <div className='inquiryContent'>{inquiry.inBrText}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
        >
          <Pagination
            count={Math.ceil(inquiryData.length / inquiryPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Grid>
      </div>
    </ThemeProvider>
  );
}
