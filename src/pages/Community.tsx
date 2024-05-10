import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';
import { Favorite, Visibility, FavoriteBorder } from '@mui/icons-material';
import ColorFilter from './../components/community/main/ColorFilter';
import StyleFilter from './../components/community/main/StyleFilter';
import SkeletonFeed from './../components/community/main/SkeletonFeed'; // 추가된 부분
import './../styles/community/main.scss';
import { FeedData } from './../types/communityTypes';

const Community = () => {
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [filterData, setFilterData] = useState<FeedData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedColorIndexes, setSelectedColorIndexes] = useState<string[]>(
    []
  );
  const [selectedStyleIndexes, setSelectedStyleIndexes] = useState<string[]>(
    []
  );
  const [sort, setSort] = useState<string>('인기순');

  const fetchDataWithFilters = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/data/feed.json');
      const data: FeedData[] = await response.json();
      const filteredData = data.filter(item => {
        if (
          selectedColorIndexes.length > 0 &&
          !selectedColorIndexes.some(color => item.colors.includes(color))
        ) {
          return false;
        }
        if (
          selectedStyleIndexes.length > 0 &&
          !selectedStyleIndexes.some(style => item.concepts.includes(style))
        ) {
          return false;
        }
        return true;
      });
      setFilterData(filteredData);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }, [selectedColorIndexes, selectedStyleIndexes]);

  useEffect(() => {
    fetchDataWithFilters();
  }, [fetchDataWithFilters]);

  const handleLike = useCallback(
    (feedId: number) => {
      setFilterData(prevFilterData => {
        return prevFilterData.map(item => {
          if (item.feedId === feedId) {
            // 해당 피드의 좋아요 상태를 반전시킵니다.
            const isLiked = !likedItems.includes(feedId);
            // 좋아요 개수도 업데이트합니다.
            const newLikes = isLiked ? item.likes + 1 : item.likes - 1;
            return { ...item, likes: newLikes };
          }
          return item;
        });
      });

      setLikedItems(prevLikedItems => {
        if (prevLikedItems.includes(feedId)) {
          // 이미 좋아요한 경우 좋아요 취소
          return prevLikedItems.filter(id => id !== feedId);
        } else {
          // 좋아요하지 않은 경우 좋아요 추가
          return [...prevLikedItems, feedId];
        }
      });
    },
    [likedItems]
  );

  const handleResetFilters = useCallback(() => {
    setSelectedColorIndexes([]);
    setSelectedStyleIndexes([]);
  }, []);

  const handleColorButtonClick = useCallback((color: string) => {
    setSelectedColorIndexes(prevIndexes => {
      if (prevIndexes.includes(color)) {
        return prevIndexes.filter(c => c !== color);
      } else {
        return [...prevIndexes, color];
      }
    });
  }, []);

  const handleStyleButtonClick = useCallback((style: string) => {
    setSelectedStyleIndexes(prevIndexes => {
      if (prevIndexes.includes(style)) {
        return prevIndexes.filter(s => s !== style);
      } else {
        return [...prevIndexes, style];
      }
    });
  }, []);

  return (
    <Box className='wrap'>
      <Grid container className='button-wrap'>
        <div className='filter-container'>
          <ColorFilter
            colorIndexes={selectedColorIndexes}
            colorButtonClick={handleColorButtonClick}
          />
          <StyleFilter
            styleIndexes={selectedStyleIndexes}
            styleButtonClick={handleStyleButtonClick}
          />
          <Button onClick={handleResetFilters}>필터 초기화</Button>
          <Box className='sort-box'>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId='sort-label'
                id='sort-select'
                value={sort}
                onChange={event => setSort(event.target.value as string)}
              >
                <MenuItem value='인기순'>인기순</MenuItem>
                <MenuItem value='조회수순'>조회수순</MenuItem>
                <MenuItem value='댓글순'>댓글순</MenuItem>
                <MenuItem value='최신순'>최신순</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </Grid>
      <div className='line'></div>
      <Grid container>
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
                  <img
                    className='feed-img'
                    src={item.images[0]}
                    alt={item.title}
                  />
                </Box>
                <Box className='info-box'>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                        cursor: 'Default',
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
                      sx={{ color: 'text.secondary', fontSize: '20px' }}
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
    </Box>
  );
};

export default Community;
