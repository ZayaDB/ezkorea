import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Divider } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import SkeletonFeed from '../components/community/main/SkeletonFeed';
import { IMyLikedFeeds } from '../types/userTypes';
import { Link } from 'react-router-dom';
import './../styles/community/main.scss';
import LikeButton from '../components/community/main/LikeButton';

const CommunityLikedPage = () => {
  const [filterData, setFilterData] = useState<IMyLikedFeeds[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchDataWithFilters = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/data/userData.json');
        const data = await response.json();
        const loggedInUser = data.find(
          (user: any) => user.username === '두루루'
        ); // 현재 로그인된 사용자를 여기서 지정

        if (loggedInUser && loggedInUser.myLikedFeeds) {
          setFilterData(loggedInUser.myLikedFeeds);
        } else {
          setFilterData([]);
        }

        setIsLoading(false);
        setIsError(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchDataWithFilters();
  }, []);

  const handleLike = (feedId: number, liked: boolean) => {
    setFilterData(prevData =>
      prevData.map(item =>
        item.feedId === feedId
          ? { ...item, liked, likes: liked ? item.likes + 1 : item.likes - 1 }
          : item
      )
    );
  };

  return (
    <div className='wrap'>
      <Grid container mt={2}>
        {isLoading ? (
          [1, 2, 3, 4].map((_, index) => (
            <Grid item xs={6} md={3} key={index} className='feed'>
              <SkeletonFeed />
            </Grid>
          ))
        ) : isError ? (
          <div>Error occurred.</div>
        ) : (
          filterData.map(item => (
            <Grid item xs={6} md={3} key={item.feedId} className='feed'>
              <Box className='feed-container'>
                <Box className='feed-box'>
                  <Link
                    to={`/community/detail/${item.feedId}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <img
                      className='feed-img'
                      src={item.image}
                      alt={item.accountName}
                    />
                  </Link>
                </Box>
                <Box className='info-box'>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      className='profile-img'
                      src={item.profileImage}
                      alt={item.accountName}
                    />
                    <Typography
                      variant='body2'
                      noWrap
                      title={item.accountName}
                      style={{
                        cursor: 'pointer',
                        maxWidth: '100px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.accountName}
                    </Typography>
                  </Box>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: 'auto',
                    }}
                  >
                    <LikeButton
                      feedId={item.feedId}
                      initialLiked={true}
                      onLike={handleLike}
                    />
                    <Typography
                      variant='caption'
                      ml={0.5}
                      style={{ cursor: 'Default' }}
                    >
                      {item.likes}
                    </Typography>
                    <Divider
                      sx={{ mx: 0.5, height: 10 }}
                      orientation='vertical'
                    />
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
                      {item.views}
                    </Typography>
                  </div>
                </Box>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default CommunityLikedPage;
