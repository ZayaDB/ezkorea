import React, { useState, useEffect, useCallback } from 'react';
import {
  Avatar,
  Button,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import '../styles/community/detail.scss';
import CommentIcon from '@mui/icons-material/Comment';
import LikeButton from '../components/community/main/LikeButton';
import ReactTimeAgo from 'react-time-ago'; // react-time-ago 라이브러리를 가져옵니다.
import TimeAgo from 'javascript-time-ago'; // javascript-time-ago 라이브러리를 가져옵니다.
import koLocale from 'javascript-time-ago/locale/ko'; // 한국어 언어 파일을 가져옵니다.
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/config';

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
    <Grid
      container
      direction='column'
      alignItems='center'
      className='community-detail-page'
      sx={{ border: 'none' }}
    >
      <Grid item xs={12} className='card-container' sx={{ border: 'none' }}>
        <Card variant='outlined'>
          <div className='feed-profile'>
            <CardHeader
              avatar={<Avatar src={feed.profileImage} alt='Profile' />}
              title={feed.accountName}
              subheader={
                <ReactTimeAgo date={new Date(feed.creationDate)} locale='ko' />
              } // 한국어 형식으로 표시
            />
            <Button variant='contained'>
              <Link
                to={`/community/modify/${feed.feedId}`}
                style={{ textDecoration: 'none', color: 'unset' }}
              >
                수정하기
              </Link>
            </Button>
          </div>
          <CardContent>
            <div className='thumbnail-container'>
              <div className='main-image'>
                <img src={feed.images[selectedImageIndex]} alt='Main' />
              </div>
              <div className='thumbnail-button'>
                {feed.images.map((image: string, index: number) => (
                  <Button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    sx={{
                      m: 0,
                      p: 0,
                      border: '1px solid 5ff531',
                      '&:hover': {
                        outline: '2px solid #5ff531', // 호버 시 보더 적용
                      },
                      '&:active': {
                        outline: '5px solid blue', // 활성화 시 보더 적용
                      },
                    }}
                  >
                    <img src={image} alt='Thumbnail' />
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Typography variant='h5' className='feed-title'>
                {feed.title}
              </Typography>
              <Typography className='feed-description'>
                {feed.description}
              </Typography>
            </div>
          </CardContent>
          <dl className='icon-container'>
            <LikeButton
              feedId={feed.feedId}
              initialLiked={isLiked}
              onLike={handleLike}
              iconSize='24px'
            />
            <Typography>
              <dt className='dot d-data'>좋아요 {likes}</dt>
            </Typography>
            <CommentIcon sx={{ fontSize: '24px' }} />
            <Typography>
              <dt className='dot d-data'>댓글 {feed.commentCount}</dt>
            </Typography>
            <ShareOutlinedIcon sx={{ fontSize: '24px' }}></ShareOutlinedIcon>
            <Typography>
              <dt className='dot d-data'>공유하기</dt>
            </Typography>
          </dl>

          {/* 여기에는 컬러랑 컨셉 */}
          <div className='concept-color-tags'>
            <Typography variant='body2' color='textSecondary' gutterBottom>
              컨셉:
            </Typography>
            <div>
              {feed.concepts.map((concept: string, index: number) => (
                <span key={index} className='concept-tag'>
                  {concept}
                </span>
              ))}
            </div>
            <Typography variant='body2' color='textSecondary' gutterBottom>
              컬러:
            </Typography>
            <div>
              {feed.colors.map((color: string, index: number) => (
                <span key={index} className='color-tag'>
                  {color}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </Grid>
      {/* 여기에 상품 리스트 */}
      <Grid container direction='row' spacing={2} className='product-container'>
        {feed.selectedProducts.map((product: any) => (
          <Grid item key={product.productId}>
            <Card variant='outlined' className='product-card'>
              <CardContent>
                <img src={product.thumbnail} alt={product.productName} />
                <Typography variant='h6' gutterBottom>
                  {product.productName}
                </Typography>
                <Typography variant='body1' gutterBottom>
                  Price: {product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid item xs={12} className='comments-container'>
        <Typography variant='h6' gutterBottom>
          Comments
        </Typography>
        {feed.comments.map((comment: any) => (
          <Card
            key={comment.id}
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
              } // 한국어 형식으로 표시
            />
            <CardContent>
              <Typography variant='body1' paragraph>
                {comment.content}
              </Typography>
              {comment.replies && (
                <ul>
                  {comment.replies.map((reply: any) => (
                    <li key={reply.id}>
                      <Card variant='outlined' style={{ marginBottom: '5px' }}>
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
                          } // 한국어 형식으로 표시
                        />
                        <CardContent>
                          <Typography variant='body1' paragraph>
                            {reply.content}
                          </Typography>
                        </CardContent>
                      </Card>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </Grid>
      <Grid item xs={12}>
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
      </Grid>
    </Grid>
  );
};

export default CommunityResultPage;
