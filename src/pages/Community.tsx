import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import { Favorite, Visibility, FavoriteBorder } from '@mui/icons-material';
import ColorFilter from './../components/community/ColorFilter';
import StyleFilter from './../components/community/StyleFilter';
import { useColorFilter } from './../hooks/community/useColorFilter';
import { useStyleFilter } from './../hooks/community/useStyleFilter';
import feedData from './../data/feed.json'; // 데이터 가져오기
import './../styles/community/main.scss';

const Community = () => {
  const { resetColorFilter } = useColorFilter();
  const { resetStyleFilter } = useStyleFilter();

  const [likedItems, setLikedItems] = useState<number[]>([]);

  const handleResetFilters = () => {
    resetColorFilter();
    resetStyleFilter();
  };

  const handleLike = (feedId: number) => {
    if (likedItems.includes(feedId)) {
      setLikedItems(likedItems.filter(id => id !== feedId));
    } else {
      setLikedItems([...likedItems, feedId]);
    }
  };

  return (
    <Box sx={{ padding: 5 }} className='wrap'>
      <Grid container spacing={2} className='button-wrap'>
        <ColorFilter />
        <StyleFilter />
        <Button onClick={handleResetFilters}>Reset Filters</Button>
      </Grid>
      <div className='line'></div>
      <Grid container spacing={2}>
        {feedData.map(item => (
          <Grid item xs={12} md={3} key={item.feedId} className='feed'>
            <Box className='feed-content'>
              <Box
                sx={{
                  position: 'relative',
                  height: '200px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
              <Box
                sx={{
                  padding: '8px',
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'nowrap',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  variant='body2'
                  noWrap
                  title={item.title}
                  style={{ cursor: 'Default' }}
                >
                  {item.title}
                </Typography>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: 'auto',
                  }}
                >
                  <IconButton
                    sx={{
                      color: likedItems.includes(item.feedId)
                        ? 'error.main'
                        : 'action.active',
                      margin: 0,
                      padding: 0,
                    }}
                    onClick={() => handleLike(item.feedId)}
                  >
                    {likedItems.includes(item.feedId) ? (
                      <Favorite sx={{ color: 'red', fontSize: '20px' }} />
                    ) : (
                      <FavoriteBorder sx={{ fontSize: '20px' }} />
                    )}
                  </IconButton>
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
        ))}
      </Grid>
    </Box>
  );
};

export default Community;
