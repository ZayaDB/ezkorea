import React, { useState, useCallback, useEffect } from 'react';
import { Box, Grid, Typography, Button, Divider } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import ColorFilter from '../components/community/main/ColorFilter';
import ConceptFilter from '../components/community/main/ConceptFilter';
import SkeletonFeed from '../components/community/main/SkeletonFeed';
import SortSelect from '../components/community/main/SortSelect';
import './../styles/community/main.scss';
import { FeedData } from '../types/communityTypes';
import { Link } from 'react-router-dom';
import LikeButton from '../components/community/main/LikeButton';
import ProtectedButton from '../components/common/ProtectedButton';
import ContentArea from '../styles/ContentArea';

const CommunityMainPage = () => {
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [filterData, setFilterData] = useState<FeedData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedColorIndexes, setSelectedColorIndexes] = useState<string[]>(
    []
  );
  const [selectedConceptIndexes, setSelectedConceptIndexes] = useState<
    string[]
  >([]);
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
            selectedConceptIndexes.length > 0 &&
            !selectedConceptIndexes.some(concept =>
              item.concepts.includes(concept)
            )
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
  }, [selectedColorIndexes, selectedConceptIndexes, sort]);

  const applySort = (data: FeedData[], sort: string) => {
    const sortedData = [...data];
    switch (sort) {
      case '조회수순':
        sortedData.sort((a, b) => b.views - a.views);
        break;
      case '좋아요순':
        sortedData.sort((a, b) => b.likes - a.likes);
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
    setSelectedConceptIndexes([]);
  }, []);

  const handleColorButtonClick = useCallback((color: string) => {
    setSelectedColorIndexes(prevIndexes =>
      prevIndexes.includes(color)
        ? prevIndexes.filter(c => c !== color)
        : [...prevIndexes, color]
    );
  }, []);

  const handleConceptButtonClick = useCallback((concept: string) => {
    setSelectedConceptIndexes(prevIndexes =>
      prevIndexes.includes(concept)
        ? prevIndexes.filter(s => s !== concept)
        : [...prevIndexes, concept]
    );
  }, []);

  return (
    <ContentArea>
      <Grid container className='button-wrap'>
        <div className='filter-container'>
          <ColorFilter
            colorIndexes={selectedColorIndexes}
            colorButtonClick={handleColorButtonClick}
          />
          <ConceptFilter
            conceptIndexes={selectedConceptIndexes}
            conceptButtonClick={handleConceptButtonClick}
          />
          <Button
            onClick={() => {
              handleResetFilters();
            }}
            sx={{
              minWidth: '96px',
              padding: '0 12px',
              fontSize: '14px',
              height: '32px',
              borderRadius: '16px',
              fontWeight: 600,
              marginTop: 1,
              ...outlineButtonStyles,
              '@media (max-width: 768px)': {
                marginTop: 2,
                marginBottom: 2,
              },
            }}
          >
            초기화
          </Button>
          <ProtectedButton
            redirectTo='/community/post'
            sx={{
              minWidth: '96px',
              padding: '0 12px',
              fontSize: '14px',
              height: '32px',
              borderRadius: '16px',
              fontWeight: 700,
              marginTop: 1,
              ...containedButtonStyles,
              '&:hover': {
                ...containedButtonStyles['&:hover'], // 기존의 호버 스타일을 가져오고
                backgroundColor: '#B7FF8B', // 필요한 스타일만 변경
                borderColor: '#5FF531',
              },
            }}
          >
            피드 작성
          </ProtectedButton>
          <SortSelect sort={sort} setSort={setSort} />
        </div>
      </Grid>
      <Grid container>
        {isLoading ? (
          Array.from({ length: 16 }).map((_, index) => (
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
    </ContentArea>
  );
};

export default CommunityMainPage;

const containedButtonStyles = {
  color: '#000000',
  border: '1px solid #5FF531',
  backgroundColor: '#5FF531', // 클릭 효과와 호버 효과를 일관성 있게 만들기 위해 변경
  '&:hover': {
    color: '#000000',
    backgroundColor: '#B7FF8B', // 클릭 효과와 호버 효과를 일관성 있게 만들기 위해 변경
    border: '1px solid #5FF531',
  },
};

const outlineButtonStyles = {
  border: '1px solid #5FF531',
  color: '#2F3438',
  '&:hover': {
    color: '#5FF531',
    border: '1px solid #000000',
    backgroundColor: 'transparent',
  },
};
