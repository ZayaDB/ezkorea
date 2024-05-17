import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  Typography,
  Grid,
  CardHeader,
  Box,
  useMediaQuery,
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
import ReactTimeAgo from 'react-time-ago';
import ShareIcon from '@mui/icons-material/Share';
import { FeedData, Comment, SelectedProducts } from '../types/communityTypes';
import koLocale from 'javascript-time-ago/locale/ko';
import TimeAgo from 'javascript-time-ago';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ContentArea from '../styles/ContentArea';

TimeAgo.addLocale(koLocale);

const CommunityDetailPage: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 619px) , (max-width: 1030px)');
  const [feed, setFeed] = useState<FeedData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { feedId } = useParams<{ feedId?: string }>();

  const [commentInput, setCommentInput] = useState<string>('');
  const [replyInput, setReplyInput] = useState<{ [key: string]: string }>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat().format(price);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!feedId) {
          throw new Error('Feed ID is not provided');
        }

        const response = await fetch('/data/feed.json');
        const data: FeedData[] = await response.json();
        const selectedFeed = data.find(
          (item: FeedData) => item.feedId === parseInt(feedId)
        );
        if (selectedFeed) {
          setFeed(selectedFeed);
          setComments(selectedFeed.comments || []);
          setLikes(selectedFeed.likes);
          setIsLiked(false); // 수정된 부분: liked 필드가 없으므로 항상 false로 설정
          setIsError(false);
        } else {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [feedId]);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  const handleReplyInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    commentId: string
  ) => {
    setReplyInput(prev => ({
      ...prev,
      [commentId]: e.target.value,
    }));
  };

  const handleCommentSubmit = () => {
    if (commentInput.trim() === '') return;
    const newComment: Comment = {
      id: new Date().toISOString(),
      profileImage:
        'https://i.pinimg.com/564x/de/0d/ef/de0def59d80f85f8962e9992f429e004.jpg',
      accountName: 'dururu',
      content: commentInput,
      creationDate: new Date().toISOString(),
      replies: [],
    };
    setComments(prev => [...prev, newComment]);
    setCommentInput('');
  };

  const handleReplySubmit = (commentId: string) => {
    if (!replyInput[commentId] || replyInput[commentId].trim() === '') return;
    const newReply: Comment = {
      id: new Date().toISOString(),
      profileImage:
        'https://i.pinimg.com/564x/de/0d/ef/de0def59d80f85f8962e9992f429e004.jpg',
      accountName: 'dururu',
      content: replyInput[commentId],
      creationDate: new Date().toISOString(),
      replies: [],
    };
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies
                ? [...comment.replies, newReply]
                : [newReply],
            }
          : comment
      )
    );
    setReplyInput(prev => ({
      ...prev,
      [commentId]: '',
    }));
    setReplyingTo(null);
  };

  const handleReplyClick = (commentId: string) => {
    setReplyingTo(commentId);
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
          {feed.accountName === 'dururu' && (
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
          )}
        </Box>
        <Box className='thumbnail-container'>
          <Box className='main-image'>
            <img src={feed.images[selectedImageIndex]} alt='Main' />
          </Box>
          <Box className='thumbnail-wrapper'>
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
          sx={{ gap: '16px', width: '100%' }}
          position={'relative'}
          className='product-container'
        >
          {feed.selectedProducts && feed.selectedProducts.length > 6 ? (
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={isMobile ? 4 : 6} // 화면이 619px 이하일 때는 4개, 그 이상일 때는 6개의 슬라이드를 보이도록 설정
              centeredSlides={false}
              style={{ marginLeft: 0, width: '100%' }}
              navigation
            >
              {feed.selectedProducts.map((product: SelectedProducts) => (
                <SwiperSlide
                  key={product.productId}
                  tag='section'
                  style={{ width: '128px' }}
                >
                  <Box minWidth={128} width={128}>
                    <Link to={`/shop/${product.productId}`}>
                      <ProductBox className='product-img'>
                        <img
                          src={product.thumbnail}
                          alt={product.productName}
                        />
                      </ProductBox>
                    </Link>
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
              <Box width={128} key={product.productId}>
                <Link to={`/shop/${product.productId}`}>
                  <ProductBox className='product-img'>
                    <img src={product.thumbnail} alt={product.productName} />
                  </ProductBox>
                </Link>
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

      {comments.map((comment: Comment) => (
        <Box
          mt={2}
          // pb={2}
          key={comment.id}
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
              <CommentButton onClick={() => handleReplyClick(comment.id)}>
                답글 달기
              </CommentButton>
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
                        sx={{ p: 0 }}
                      />
                      <Box>
                        <Typography variant='body1' sx={{ padding: '8px 0' }}>
                          {reply.content}
                        </Typography>
                      </Box>
                      <div className='comment-info-box'>
                        <CommentButton>신고</CommentButton>
                      </div>
                    </Box>
                  </li>
                ))}
              </ul>
            )}
            {replyingTo === comment.id && (
              <Box
                className='comment-input-container'
                sx={{ paddingLeft: '20px' }}
              >
                <InputTextField
                  label='대댓글을 입력하세요'
                  fullWidth
                  value={replyInput[comment.id] || ''}
                  onChange={e => handleReplyInputChange(e, comment.id)}
                  className='comment-input'
                  variant='outlined'
                />
                <Button
                  onClick={() => handleReplySubmit(comment.id)}
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
            )}
          </Box>
        </Box>
      ))}
    </ContentArea>
  );
};

export default CommunityDetailPage;
