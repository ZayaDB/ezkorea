import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Review2 from '../../assets/images/review_white2.webp';
import Review4 from '../../assets/images/review_white4.webp';
import Review6 from '../../assets/images/review_white6.webp';
import Review7 from '../../assets/images/review_white7.webp';
import '../../styles/home/cardCarousel.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function MoodCarousel() {
  const navigate = useNavigate();
  const gotoCommunity = () => {
    navigate('/community');
  };

  const slides = [
    {
      id: 0,
      image: Review7,
    },
    {
      id: 1,
      image: Review2,
    },
    { id: 2, image: Review6 },
    { id: 3, image: Review4 },
    { id: 4, image: Review7 },
    { id: 5, image: Review2 },
    { id: 6, image: Review6 },
    { id: 7, image: Review4 },
    {
      id: 8,
      image: Review4,
    },
  ];

  return (
    <div style={{ width: 'auto', padding: '22px 0 18px 0' }}>
      <div className='TitleArea'>
        <Typography
          sx={{ fontSize: '30px', fontWeight: '700' }}
          onClick={gotoCommunity}
        >
          DURURU RECOMMEND
        </Typography>
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: '400',
            color: '#999999',
            letterSpacing: '0.2px',
          }}
          onClick={gotoCommunity}
        >
          {/* 두루루에서 만날 수 있는 다양한 무드의 데스크테리어 */}
          나만의 작은 공간, 책상 위에도 취향을 녹여보세요.
        </Typography>
      </div>
      <div className='mood-container'>
        <Swiper
          onClick={gotoCommunity}
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
              slidesPerView: 3,
              spaceBetween: 8,
            },
            768: {
              slidesPerView: 3,
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
