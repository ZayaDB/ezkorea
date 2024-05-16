import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import Review1 from '../../assets/images/review_white.webp';
import Review2 from '../../assets/images/review_white2.webp';
import Review3 from '../../assets/images/review_white3.webp';
import Review4 from '../../assets/images/review_white4.webp';
import Review5 from '../../assets/images/review_white5.webp';
import Review6 from '../../assets/images/review_white6.webp';
import '../../styles/home/cardCarousel.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function LeviewCarousel() {
  const slides = [
    {
      id: 2,
      title: '기록덕후의 화이트톤 데스크테리어',
      author: 'l.usxxi',
      image: Review1,
    },
    {
      id: 2,
      title: '화이트 데스크테리어족',
      author: '오또리하우스2',
      image: Review2,
    },
    { id: 3, title: '자취력 상승템', author: 'joheelife', image: Review6 },
    { id: 4, title: '옹이의 데스크 사랑', author: '비조이풀', image: Review4 },
    { id: 5, title: 'Slide 5', author: 'l.usxxi', image: Review3 },
    { id: 6, title: 'Slide 6', author: 'l.usxxi', image: Review1 },
    { id: 7, title: 'Slide 7', author: 'l.usxxi', image: Review2 },
    {
      id: 8,
      title: '기록덕후의 화이트톤 데스크테리어',
      author: 'dear_myhome',
      image: Review5,
    },
  ];

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '1200px' }}>
        <div className='TitleArea'>
          <Typography sx={{ fontSize: '30px', fontWeight: '700' }}>
            REVIEW
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '400',
              color: '#999999',
              letterSpacing: '0.2px',
            }}
          >
            #dururu #일상 #데스크테리어
          </Typography>
        </div>
        <Swiper
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
                <CardContent>
                  <Typography
                    gutterBottom
                    component='div'
                    sx={{
                      fontSize: '16px',
                      paddingTop: '5px',
                      margin: '0',
                      color: '#191919',
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <img
                    src={Review1}
                    alt='review'
                    style={{
                      borderRadius: '50%',
                      width: '15px',
                    }}
                  />
                  <span
                    style={{
                      paddingLeft: '5px',
                      fontSize: '14px',
                      color: '#7f7f7f',
                    }}
                  >
                    {slide.author}
                  </span>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ fontSize: '14px', paddingTop: '4px' }}
                  >
                    스크랩 20 ・ 조회수 130
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
