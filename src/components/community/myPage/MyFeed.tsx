import { useFetchData } from '../../../hooks/useFetchData';
import { User, IMyFeeds } from '../../../types/userTypes';
import { useEffect, useState } from 'react';
import ContentArea from '../../../styles/ContentArea';
import { Link } from 'react-router-dom';
import { Typography, Divider, Box } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import LikeButton from '../main/LikeButton';
import { Visibility } from '@mui/icons-material';

export default function MyFeed() {
  const [data, loading, error] = useFetchData<User[]>('/data/userData.json');
  const [myFeed, setMyFeed] = useState<IMyFeeds[]>([]);
  useEffect(() => {
    if (data) {
      setMyFeed(data[0].myFeeds);
      console.log(myFeed);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <ContentArea>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          paddingBottom: '80px',
          marginTop: '16px',
          gap: '20px',
        }}
      >
        {myFeed.map(feed => (
          <Link
            key={feed.feedId}
            to={`/community/detail/${feed.feedId}`}
            style={{ textDecoration: 'none' }}
          >
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '8px',
                marginBottom: '1px',
                overflow: 'hidden',
                width: '280px',
                height: '280px',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.5s ease',
                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
                '&:hover': { outline: '2px solid #5ff531' },
                boxSizing: 'border-box',
              }}
            >
              <Box
                key={feed.feedId}
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  overflow: 'hidden',
                  width: '100%',
                  height: '100%',
                  '&:hover img': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Box
                  component='img'
                  src={feed.image}
                  alt='feed-img'
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                />
              </Box>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: 'auto',
                  flexWrap: 'nowrap',
                  padding: '4px 0',
                }}
              >
                <LikeButton
                  feedId={feed.feedId}
                  initialLiked={false}
                  onLike={() => {
                    console.log('onClick');
                  }}
                />
                <Typography
                  variant='caption'
                  ml={0.5}
                  style={{ cursor: 'Default' }}
                  color='text.secondary'
                >
                  {feed.likes}
                </Typography>
                <Divider sx={{ mx: 0.5, height: 10 }} orientation='vertical' />
                <Visibility
                  sx={{
                    color: 'text.secondary',
                    fontSize: '20px',
                    cursor: 'auto',
                  }}
                />
                <Typography
                  variant='caption'
                  ml={0.5}
                  color='text.secondary'
                  style={{ cursor: 'Default' }}
                >
                  {feed.views}
                </Typography>
                <Divider sx={{ mx: 0.5, height: 10 }} orientation='vertical' />
                <CommentIcon
                  sx={{
                    color: 'text.secondary',
                    fontSize: '20px',
                    cursor: 'auto',
                  }}
                />
                <Typography
                  variant='caption'
                  ml={0.5}
                  color='text.secondary'
                  style={{ cursor: 'Default' }}
                >
                  {feed.commentCount}
                </Typography>
                <Divider sx={{ mx: 0.5, height: 10 }} orientation='vertical' />
              </div>
            </Box>
          </Link>
        ))}
      </div>
    </ContentArea>
  );
}
