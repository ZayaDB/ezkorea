import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card, CardMedia, Typography } from '@mui/material';
import Review2 from '../../assets/images/review_white2.webp';
import Review4 from '../../assets/images/review_white4.webp';
import Review6 from '../../assets/images/review_white6.webp';
import '../../styles/home/cardCarousel.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useNavigate } from 'react-router-dom';

export default function LeviewCarousel() {
  const navigate = useNavigate();
  const gotoLeview = () => {
    navigate('/shop/4');
  };
  const slides = [
    {
      id: 2,
      title: '기록덕후의 화이트톤 데스크테리어',
      author: 'l.usxxi',
      image: Review2,
    },
    { id: 2, image: Review2 },
    { id: 3, image: Review6 },
    { id: 4, image: Review4 },
    { id: 5, image: Review2 },
    { id: 6, image: Review4 },
    { id: 7, image: Review6 },
    {
      id: 8,
      image: Review6,
    },
  ];

  return (
    <div style={{ width: 'auto', padding: '8px 0 30px 0' }}>
      <div className='TitleArea'>
        <Typography
          sx={{ fontSize: '30px', fontWeight: '700' }}
          onClick={gotoLeview}
        >
          REVIEW
        </Typography>
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: '400',
            letterSpacing: '0.2px',
            color: '#999999',
          }}
          onClick={gotoLeview}
        >
          #dururu #일상 #데스크테리어
        </Typography>
      </div>
      <div className='mood-container'>
        <Swiper
          onClick={gotoLeview}
          className='swiper-container'
          centeredSlides={true} //가운데 정렬
          slidesPerView={3} //한 슬라이드에 보여줄 갯수
          spaceBetween={0} //슬라이드간 거리
          loop={true} //슬라이드 반복 여부
          autoplay={{ delay: 5000 }} //자동 슬라이드 시간
          navigation // 이동 화살표
          // pagination={{
          //   clickable: true,
          // }} //pager여부
          modules={[Navigation]}
          // 반응형
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 8,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 8,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1920: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {slides.map(slide => (
            <SwiperSlide key={slide.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  textAlign: 'center',
                  border: 'none',
                  boxShadow: 'none',
                }}
              >
                <CardMedia
                  sx={{ height: 300, borderRadius: '4px' }}
                  image={slide.image}
                  title='Slide Image'
                />
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
