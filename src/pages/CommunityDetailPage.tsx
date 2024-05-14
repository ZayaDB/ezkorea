import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Container,
  Box,
} from '@mui/material';
import '../styles/community/detail.scss';
import CommentIcon from '@mui/icons-material/Comment';
import LikeButton from '../components/community/main/LikeButton';
import ReactTimeAgo from 'react-time-ago';
import ShareIcon from '@mui/icons-material/Share';
import { FeedData, Comment, SelectedProducts } from '../types/communityTypes';
import koLocale from 'javascript-time-ago/locale/ko';
import TimeAgo from 'javascript-time-ago';
import styled from '@emotion/styled';

TimeAgo.addLocale(koLocale);

const CommunityDetailPage: React.FC = () => {
  const [feed, setFeed] = useState<FeedData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [commentInput, setCommentInput] = useState<string>('');
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { feedId } = useParams<{ feedId?: string }>();

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
    <Box className='content-container'>
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
          <Box className='thumbnail-button'>
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
        <Grid container direction='row' className='product-container'>
          {feed.selectedProducts?.map(
            (
              product: SelectedProducts // 수정된 부분: Product 타입 대신 SelectedProducts 타입 사용
            ) => (
              <Grid item key={product.productName}>
                <Card variant='outlined' className='product-card'>
                  <CardContent>
                    <img src={product.thumbnail} alt={product.productName} />
                    <Typography gutterBottom>{product.productName}</Typography>
                    <Typography variant='body1' gutterBottom>
                      {product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
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
              <dt className='dot d-data'>공유하기</dt>
            </Typography>
          </Box>
          <CustomTypography variant='body1'>신고하기</CustomTypography>
        </Box>
      </Grid>

      {/* 댓글 */}
      <Typography letterSpacing={1} mt={3} mb={3}>
        <CommentIcon sx={{ fontSize: '24px', mr: 1 }} />
        댓글 {feed.commentCount}
      </Typography>
      {feed.comments?.map(
        (
          comment: Comment,
          index: number // 수정된 부분: map 콜백 함수의 인자에 index 추가
        ) => (
          <Card
            key={index} // 수정된 부분: feed.comment.id 대신 index 사용
            variant='outlined'
            style={{ marginBottom: '10px', width: '100%' }}
          >
            <CardHeader
              avatar={<Avatar src={comment.profileImage} alt='Profile' />}
              title={comment.accountName}
              subheader={
                <ReactTimeAgo
                  date={new Date(comment.creationDate)}
                  locale='ko'
                />
              }
            />
            <CardContent>
              <Typography variant='body1' paragraph>
                {comment.content}
              </Typography>

              {/* 댓글의 답글 표시 */}
              {comment.replies && (
                <ul>
                  {comment.replies.map(
                    (
                      reply: Comment,
                      replyIndex: number // 수정된 부분: map 콜백 함수의 인자에 replyIndex 추가
                    ) => (
                      <li key={replyIndex}>
                        {' '}
                        {/* 수정된 부분: reply.id 대신 replyIndex 사용 */}
                        <Card
                          variant='outlined'
                          style={{ marginBottom: '5px' }}
                        >
                          <CardHeader
                            avatar={
                              <Avatar src={reply.profileImage} alt='Profile' />
                            }
                            title={reply.accountName}
                            subheader={
                              <ReactTimeAgo
                                date={new Date(reply.creationDate)}
                                locale='ko'
                              />
                            }
                          />
                          <CardContent>
                            <Typography variant='body1' paragraph>
                              {reply.content}
                            </Typography>
                          </CardContent>
                        </Card>
                      </li>
                    )
                  )}
                </ul>
              )}
            </CardContent>
          </Card>
        )
      )}
      {/* 댓글 작성 */}
      <Container>
        <TextField
          label='Write a comment...'
          variant='outlined'
          fullWidth
          value={commentInput}
          onChange={handleCommentInputChange}
        />
        <Button
          onClick={handleCommentSubmit}
          variant='contained'
          color='primary'
        >
          Submit
        </Button>
      </Container>
    </Box>
  );
};

export default CommunityDetailPage;

const ColorCircle = styled(Box)<{ color: string }>(({ color }) => ({
  width: 15,
  height: 15,
  color: '#000000',
  borderRadius: '50%',
  border: color === 'white' ? '1px solid #E5E5E5' : 'contained',
  backgroundColor: color === 'wood' ? '#9A6322' : color,
  marginRight: '8px',
}));

const outlineButtonStyles = {
  border: '1px solid rgb(218, 221, 224)',
  color: '#2F3438',
};

const TagButton = styled(Button)`
  width: 96px;
  margin: 0 4px 0 0;
  padding: 0 12px;
  font-size: 14px; /* fontSize 속성 수정 */
  height: 32px; /* height 속성 수정 */
  border-radius: 16px; /* borderRadius 속성 수정 */
  font-weight: 600; /* fontWeight 속성 수정 */
  pointer-events: none; /* pointerEvents 속성 수정 */
  &:hover {
    background-color: initial;
  }
  ${outlineButtonStyles}/* outlineButtonStyles 추가 */
`;

const CustomTypography = styled(Typography)`
  font-weight: bold;
  color: rgb(130, 140, 148);
  font-size: 14px;
  cursor: pointer;
  &:hover {
    font-weight: 800;
    color: #5ff531;
  }
`;

const ImgButton = styled(Button)`
  margin: 0;
  padding: 0;
  height: 100px;
  overflow: hidden;
  margin-bottom: 10px;
  border-radius: 0;
  &:hover {
    outline: 2px solid #5ff531;
  }
  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
`;
