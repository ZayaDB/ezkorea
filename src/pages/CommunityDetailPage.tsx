import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
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

// 한국어 로캘 설정
TimeAgo.addLocale(koLocale);

const CommunityDetailPage: React.FC = () => {
  const [feed, setFeed] = useState<any>(null);
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
        const data = await response.json();
        const selectedFeed = data.find(
          (item: any) => item.feedId === parseInt(feedId)
        );
        if (selectedFeed) {
          setFeed(selectedFeed);
          setLikes(selectedFeed.likes);
          setIsLiked(selectedFeed.liked);
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
    <Grid
      container
      direction='column'
      alignItems='center'
      className='community-detail-page'
    >
      <Grid item xs={12} className='card-container'>
        <Card variant='outlined'>
          <CardHeader
            avatar={<Avatar src={feed.profileImage} alt='Profile' />}
            title={feed.accountName}
            subheader={
              <ReactTimeAgo date={new Date(feed.creationDate)} locale='ko' />
            } // 한국어 형식으로 표시
          />
          <CardContent>
            <Typography variant='h5' gutterBottom>
              {feed.title}
            </Typography>
            <Typography variant='body1' paragraph>
              {feed.description}
            </Typography>
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
          </CardContent>
          <div className='icon-container'>
            <LikeButton
              feedId={feed.feedId}
              initialLiked={isLiked}
              onLike={handleLike}
              iconSize='32px'
            />
            <Typography>{likes}</Typography>
            <CommentIcon sx={{ fontSize: '32px' }} />
            <Typography>{feed.commentCount}</Typography>
          </div>
        </Card>
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

export default CommunityDetailPage;
