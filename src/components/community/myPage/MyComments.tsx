import React, { useState, useEffect } from 'react';
import { Typography, CardHeader, Box } from '@mui/material';
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
          <Box
            mt={2}
            // pb={2}
            key={comment.feedId}
            style={{
              marginBottom: '10px',
              width: '100%',
              display: 'flex', // 이미지와 내용을 가로로 나열하기 위해
            }}
          >
            {/* 썸네일 이미지에 링크 추가 */}
            <Link to={`/community/detail/${comment.feedId}`}>
              <Box sx={{ width: '64px', height: '64px', marginRight: '10px' }}>
                <img
                  width={'100%'}
                  src={comment.image} // 댓글이 달린 피드의 이미지 URL
                  alt='feedImage'
                />
              </Box>
            </Link>

            <Box style={{ width: '100%' }}>
              <CardHeader
                subheader={
                  <ReactTimeAgo
                    date={new Date(comment.creationDate)}
                    locale='ko'
                  />
                }
                sx={{ p: 0 }}
              />
              <Box>
                <Typography
                  className='comment-box'
                  variant='body1'
                  sx={{ padding: '8px 0' }}
                >
                  {comment.content}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))
      )}
    </ContentArea>
  );
};

export default CommunityLikedPage;
