import React, { useState, useEffect, useCallback } from 'react';
import {
  Avatar,
  Button,
  Typography,
  Grid,
  CardHeader,
  Box,
} from '@mui/material';
import {
  ProductInfo,
  ColorCircle,
  TagButton,
  CustomTypography,
  ImgButton,
  ProductBox,
  InputTextField,
  CommentButton,
} from '../components/community/detail/StyledComponents';
import '../styles/community/detail.scss';
import CommentIcon from '@mui/icons-material/Comment';
import LikeButton from '../components/community/main/LikeButton';
import ReactTimeAgo from 'react-time-ago'; // react-time-ago 라이브러리를 가져옵니다.
import TimeAgo from 'javascript-time-ago'; // javascript-time-ago 라이브러리를 가져옵니다.
import koLocale from 'javascript-time-ago/locale/ko'; // 한국어 언어 파일을 가져옵니다.
import { Comment, SelectedProducts } from '../types/communityTypes';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/config';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ContentArea from '../styles/ContentArea';

// 한국어 로캘 설정
TimeAgo.addLocale(koLocale);

const CommunityResultPage: React.FC = () => {
  const [feed, setFeed] = useState<any>(null);
  const [isLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [commentInput, setCommentInput] = useState<string>('');
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const selectedFeed = useSelector((state: RootState) => state.community.feed);
  console.log(selectedFeed);
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat().format(price);
  };

  useEffect(() => {
    console.log(selectedFeed);
    if (selectedFeed) {
      setFeed(selectedFeed);
      setLikes(selectedFeed.likes);
      setIsError(false);
    } else {
      setIsError(true);
    }
  }, [selectedFeed]);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  const handleCommentSubmit = () => {
    console.log('Submitted comment:', commentInput);
    setCommentInput('');
  };

  const handleLike = useCallback(() => {
    setLikes(prevLikes => (isLiked ? prevLikes - 1 : prevLikes + 1));
    setIsLiked(prevIsLiked => !prevIsLiked);
  }, [isLiked]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !feed) {
    return <div>Error: Feed not found</div>;
  }

  return (
    <ContentArea sx={{ maxWidth: 1200 }}>
      <Grid container direction='column'>
        <Box className='feed-profile'>
          <CardHeader
            avatar={<Avatar src={feed.profileImage} alt='Profile' />}
            title={feed.accountName}
            subheader={
              <ReactTimeAgo date={new Date(feed.creationDate)} locale='ko' />
            }
            sx={{ p: 0 }}
          />
          <Button
            variant='contained'
            sx={{
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
              },
            }}
            component={Link}
            to={`/community/modify/${feed.feedId}`}
          >
            수정하기
          </Button>
        </Box>
        <Box className='thumbnail-container'>
          <Box className='main-image'>
            <img src={feed.images[selectedImageIndex]} alt='Main' />
          </Box>
          <Box>
            {feed.images.map((image: string, index: number) => (
              <ImgButton
                key={index}
                onClick={() => handleThumbnailClick(index)}
              >
                <img src={image} alt='Thumbnail' />
              </ImgButton>
            ))}
          </Box>
        </Box>

        {/* 상품 리스트 */}
        <Typography
          variant='body2'
          sx={{ mb: 1 }}
          display={'flex'}
          alignItems={'center'}
          fontSize={14}
        >
          <Typography mr={1} fontWeight={900} color={'#5ff531'}>
            #
          </Typography>
          상품 태그
          <Typography fontSize={14} fontWeight={700} ml={1}>
            {feed.selectedProducts ? feed.selectedProducts.length : 0}
          </Typography>
          개
        </Typography>
        <Grid
          container
          direction='row'
          sx={{ gap: '16px' }}
          width={'100%'}
          position={'relative'}
          className='product-container'
        >
          {feed.selectedProducts && feed.selectedProducts.length > 6 ? (
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={6}
              centeredSlides={false}
              style={{ marginLeft: 0, width: '100%' }}
              navigation
            >
              {feed.selectedProducts.map((product: SelectedProducts) => (
                <SwiperSlide
                  key={product.productName}
                  tag='section'
                  style={{ width: '128px' }}
                >
                  <Box width={128}>
                    <ProductBox className='product-img'>
                      <img src={product.thumbnail} alt={product.productName} />
                    </ProductBox>
                    <ProductInfo variant='body2' gutterBottom>
                      {product.productName}
                    </ProductInfo>
                    <ProductInfo fontWeight={700} variant='body2' gutterBottom>
                      {formatPrice(parseInt(product.price))}원
                    </ProductInfo>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            feed.selectedProducts &&
            feed.selectedProducts.map((product: SelectedProducts) => (
              <Box width={128} key={product.productName}>
                <ProductBox className='product-img'>
                  <img src={product.thumbnail} alt={product.productName} />
                </ProductBox>
                <ProductInfo variant='body2' gutterBottom>
                  {product.productName}
                </ProductInfo>
                <ProductInfo fontWeight={700} variant='body2' gutterBottom>
                  {formatPrice(parseInt(product.price))}원
                </ProductInfo>
              </Box>
            ))
          )}
        </Grid>

        {/* 컨셉 및 컬러 */}
        <Box className='tags'>
          <Box>
            <Typography variant='body2' color='textSecondary' sx={{ mb: 1 }}>
              Color
            </Typography>
            {feed.colors.map((color: string, index: number) => (
              <TagButton key={index}>
                <ColorCircle color={color} />
                {color}
              </TagButton>
            ))}
          </Box>
          <Box sx={{ pl: '24px' }}>
            <Typography variant='body2' color='textSecondary' sx={{ mb: 1 }}>
              Concept
            </Typography>
            {feed.concepts.map((concept: string, index: number) => (
              <TagButton key={index}>{concept}</TagButton>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant='h5' className='feed-title'>
            {feed.title}
          </Typography>
          <Typography className='feed-description'>
            {feed.description}
          </Typography>
        </Box>

        <Box
          component='section'
          justifyContent={'space-between'}
          className='icon-container'
        >
          <Box display='flex' alignItems='center'>
            <LikeButton
              feedId={feed.feedId}
              initialLiked={isLiked}
              onLike={handleLike}
              iconSize='24px'
            />
            <Typography>
              <dt className='dot d-data'>좋아요 {likes}</dt>
            </Typography>
            <ShareIcon sx={{ fontSize: '24px' }} />
            <Typography>
              <dt className='dot d-data'>공유</dt>
            </Typography>
          </Box>
          <CustomTypography variant='body1'>신고</CustomTypography>
        </Box>
      </Grid>

      {/* 댓글 작성 */}
      <Box className='comment-input-container'>
        <InputTextField
          label='댓글을 입력하세요'
          fullWidth
          value={commentInput}
          onChange={handleCommentInputChange}
          className='comment-input'
          variant='outlined'
        />
        <Button
          onClick={handleCommentSubmit}
          variant='contained'
          color='primary'
          sx={{
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          }}
        >
          입력
        </Button>
      </Box>

      {/* 댓글 */}
      <Typography letterSpacing={1} mb={1}>
        <CommentIcon sx={{ fontSize: '24px', mr: 1 }} />
        댓글 {feed.commentCount}
      </Typography>

      {feed.comments?.map((comment: Comment, index: number) => (
        <Box
          mt={2}
          pb={2}
          key={index}
          style={{
            marginBottom: '10px',
            width: '100%',
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                src={comment.profileImage}
                alt='Profile'
                sx={{ margin: '8px 0' }}
              />
            }
            title={
              <Typography variant='body1'>{comment.accountName}</Typography>
            }
            subheader={
              <ReactTimeAgo date={new Date(comment.creationDate)} locale='ko' />
            }
            sx={{ p: 0 }}
          />
          <Box>
            <Typography
              className='comment-box'
              variant='body1'
              sx={{ padding: '8px 0' }}
            >
              {comment.content}
            </Typography>

            <div className='comment-info-box'>
              <CommentButton>답글 달기</CommentButton>
              <dt className='dot'></dt>
              <CommentButton>신고</CommentButton>
            </div>

            {/* 댓글의 답글 표시 */}
            {comment.replies && (
              <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                {comment.replies.map((reply: Comment, replyIndex: number) => (
                  <li key={replyIndex}>
                    <Box
                      style={{
                        backgroundColor: 'rgb(247, 250, 247)',
                        borderRadius: '5px',
                        padding: '16px',
                        marginTop: 24,
                      }}
                    >
                      <CardHeader
                        avatar={
                          <Avatar src={reply.profileImage} alt='Profile' />
                        }
                        title={
                          <Typography variant='body1'>
                            {reply.accountName}
                          </Typography>
                        }
                        subheader={
                          <ReactTimeAgo
                            date={new Date(reply.creationDate)}
                            locale='ko'
                          />
                        }
                      />
                      <Box>
                        <Typography variant='body1' sx={{ padding: '8px 0' }}>
                          {reply.content}
                        </Typography>
                      </Box>
                      <div className='comment-info-box'>
                        <CommentButton>답글 달기</CommentButton>
                        <dt className='dot'></dt>
                        <CommentButton>신고</CommentButton>
                      </div>
                    </Box>
                  </li>
                ))}
              </ul>
            )}
          </Box>
        </Box>
      ))}
    </ContentArea>
  );
};

export default CommunityResultPage;
