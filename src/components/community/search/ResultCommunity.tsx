import { FeedData } from '../../../types/communityTypes';
import { useFetchData } from '../../../hooks/useFetchData';
import { useState, useEffect } from 'react';
import { Grid, Box, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import LikeButton from '../main/LikeButton';
import { Visibility } from '@mui/icons-material';

interface ResultCommunityProps {
  keyword: string;
}

const ResultCommunity: React.FC<ResultCommunityProps> = ({ keyword }) => {
  const [data, loading, error] = useFetchData<FeedData[]>('/data/feed.json');
  const [resultFeed, setResultFeed] = useState<FeedData[]>([]);

  useEffect(() => {
    const lowercaseKeyword = keyword.toLowerCase();
    if (data && data.length > 0) {
      const filteredData = data.filter(
        feed =>
          feed.selectedProducts &&
          feed.selectedProducts.some(product =>
            product.productName.toLowerCase().includes(lowercaseKeyword)
          )
      );
      setResultFeed(filteredData);
    }
  }, [keyword, data]);

  if (loading) {
    return <div style={{ textAlign: 'center' }}>로딩 중 입니다...</div>;
  }

  if (error) {
    return <div>Error loading data.</div>;
  }

  return (
    <Box>
      <Grid
        container
        sx={{
          justifyContent: 'flex-start',
          '@media (max-width: 500px)': {
            justifyContent: 'center',
          },
        }}
      >
        {resultFeed.length > 0 ? (
          resultFeed.map(item => (
            <Grid item xs={6} md={3} key={item.feedId} className='feed'>
              <Box className='feed-container'>
                <Box className='feed-box'>
                  <Link
                    to={`/community/detail/${item.feedId}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <img
                      className='feed-img'
                      src={item.images[0]}
                      alt={item.title}
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
                      initialLiked={false}
                      onLike={() => {
                        console.log('clicked');
                      }}
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
        ) : (
          <div className='likes-content'>
            <div
              style={{ textAlign: 'center', width: '100%', marginTop: '100px' }}
            >
              피드 검색 결과가 없습니다.
            </div>
          </div>
        )}
      </Grid>
    </Box>
  );
};

export default ResultCommunity;
