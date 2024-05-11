import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import { Favorite, Visibility, FavoriteBorder } from '@mui/icons-material';
import ColorFilter from './../components/community/main/ColorFilter';
import StyleFilter from './../components/community/main/StyleFilter';
import SkeletonFeed from './../components/community/main/SkeletonFeed';
import SortSelect from '../components/community/main/SortSelect';
import './../styles/community/main.scss';
import { FeedData } from './../types/communityTypes';
import { Link } from 'react-router-dom';

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
  const [sort, setSort] = useState<string>('조회수순');

  useEffect(() => {
    const fetchDataWithFilters = async () => {
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
        const sortedData = applySort(filteredData, sort);
        setFilterData(sortedData);
        setIsLoading(false);
        setIsError(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchDataWithFilters();
  }, [selectedColorIndexes, selectedStyleIndexes, sort]);

  const applySort = (data: FeedData[], sort: string) => {
    const sortedData = [...data];
    switch (sort) {
      case '조회수순':
        sortedData.sort((a, b) => b.views - a.views);
        break;
      case '좋아요순':
        sortedData.sort((a, b) => b.likes - a.likes);
        break;
      case '댓글순':
        sortedData.sort((a, b) => b.commentCount - a.commentCount);
        break;
      case '최신순':
        sortedData.sort(
          (a, b) =>
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime()
        );
        break;
      default:
        break;
    }
    return sortedData;
  };

  const handleLike = useCallback(
    (feedId: number) => {
      setFilterData(prevFilterData => {
        return prevFilterData.map(item => {
          if (item.feedId === feedId) {
            const isLiked = !likedItems.includes(feedId);
            const newLikes = isLiked ? item.likes + 1 : item.likes - 1;
            return { ...item, likes: newLikes };
          }
          return item;
        });
      });

      setLikedItems(prevLikedItems => {
        if (prevLikedItems.includes(feedId)) {
          return prevLikedItems.filter(id => id !== feedId);
        } else {
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
    setSelectedColorIndexes(prevIndexes =>
      prevIndexes.includes(color)
        ? prevIndexes.filter(c => c !== color)
        : [...prevIndexes, color]
    );
  }, []);

  const handleStyleButtonClick = useCallback((style: string) => {
    setSelectedStyleIndexes(prevIndexes =>
      prevIndexes.includes(style)
        ? prevIndexes.filter(s => s !== style)
        : [...prevIndexes, style]
    );
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
          <Button>
            <Link
              to='/community/post'
              style={{ textDecoration: 'none', color: 'unset' }}
            >
              글 쓰기
            </Link>
          </Button>
        </div>
      </Grid>
      <div className='line'></div>
      <SortSelect sort={sort} setSort={setSort} />
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
