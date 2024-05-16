import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import '../../../styles/community/main.scss';
import CommentIcon from '@mui/icons-material/Comment';
import ReactTimeAgo from 'react-time-ago';
import { IMyComments } from '../../../types/userTypes';
import { Link } from 'react-router-dom'; // Link import 추가
import ContentArea from '../../../styles/ContentArea';

interface UserData {
  myComments: IMyComments[];
}

const CommunityLikedPage = () => {
  const [filterData, setFilterData] = useState<IMyComments[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchDataWithFilters = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/data/userData.json');
        const userData: UserData[] = await response.json();

        // 댓글만 가져와서 설정
        const comments: IMyComments[] = userData.flatMap(
          (user: UserData) => user.myComments || []
        );
        setFilterData(comments);

        setIsLoading(false);
        setIsError(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchDataWithFilters();
  }, []);

  const commentCount = filterData.length;

  return (
    <ContentArea>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        sx={{ width: '100%' }}
      >
        <Typography letterSpacing={1} mb={1}>
          <CommentIcon sx={{ fontSize: '24px', mr: 1 }} />
          작성한 댓글 {commentCount}
        </Typography>

        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error occurred.</div>
        ) : (
          filterData.map((comment: IMyComments) => (
            <Link
              key={comment.feedId}
              to={`/community/detail/${comment.feedId}`}
              style={{ textDecoration: 'none', color: 'unset' }}
            >
              <Box
                key={comment.feedId}
                sx={{
                  margin: '16px 0',
                  display: 'flex',
                  outline: '1px solid rgb(218, 221, 224)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  width: '100%',
                  height: 100,
                  cursor: 'pointer',
                  '&:hover': {
                    outline: '1px solid #5ff531',
                  },
                  '@media (max-width: 768px)': {
                    width: '100%', // 화면 너비가 800px 이하일 때 100%로 변경
                    maxWidth: '100%', // 최대 너비를 해제하여 전체 너비로 설정
                  },
                }}
              >
                <Box
                  sx={{ width: '100px', height: '100px', marginRight: '10px' }}
                >
                  <img
                    width={'100px'}
                    height={'100px'}
                    src={comment.image} // 댓글이 달린 피드의 이미지 URL
                    alt='feedImage'
                  />
                </Box>

                <Box
                  sx={{
                    fontSize: '14px',
                    margin: 'auto 0',
                    color: 'rgb(130, 140, 148)',
                  }}
                >
                  <ReactTimeAgo
                    date={new Date(comment.creationDate)}
                    locale='ko'
                  />

                  <Box
                    sx={{
                      width: 400,
                      '@media (max-width: 458px)': {
                        width: '100%', // 화면 너비가 800px 이하일 때 100%로 변경
                      },
                    }}
                  >
                    <Typography
                      className='comment-box'
                      variant='body1'
                      sx={{
                        padding: '8px 8px 0 0',
                        fontSize: '14px',
                        color: '#2F3438',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {comment.content}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Link>
          ))
        )}
      </Box>
    </ContentArea>
  );
};

export default CommunityLikedPage;
