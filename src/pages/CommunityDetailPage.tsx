import React from 'react';
import { useParams } from 'react-router-dom';
import CommunityDetail from '../components/community/detail/CommunityDetail'; // 수정된 import 경로

// 가상의 외부 데이터로 가정한 피드 데이터
const feedData = [
  {
    id: 1,
    imageUrl: 'https://example.com/image1.jpg',
    caption: '첫 번째 피드',
    likes: 10,
    comments: [
      { id: 1, user: 'user1', text: '댓글 1' },
      { id: 2, user: 'user2', text: '댓글 2' },
    ],
  },
  {
    id: 2,
    imageUrl: 'https://example.com/image2.jpg',
    caption: '두 번째 피드',
    likes: 20,
    comments: [
      { id: 1, user: 'user3', text: '댓글 1' },
      { id: 2, user: 'user4', text: '댓글 2' },
    ],
  },
];

const CommunityDetailPage: React.FC = () => {
  // URL 파라미터에서 피드 ID 가져오기
  const { feedId } = useParams<{ feedId: string }>();

  // 피드 ID가 없거나 잘못된 경우 예외 처리
  if (!feedId) {
    return <div>피드를 찾을 수 없습니다.</div>;
  }

  // 정수로 변환된 피드 ID
  const parsedFeedId = parseInt(feedId);

  // 피드 ID를 기반으로 해당 피드 정보 찾기
  const feed = feedData.find(item => item.id === parsedFeedId);

  // 피드 정보가 없는 경우 예외 처리
  if (!feed) {
    return <div>피드를 찾을 수 없습니다.</div>;
  }

  // 피드 정보가 있는 경우 커뮤니티 디테일 페이지 렌더링
  return (
    <CommunityDetail
      imageUrl={feed.imageUrl}
      caption={feed.caption}
      likes={feed.likes}
      comments={feed.comments}
    />
  );
};

export default CommunityDetailPage;
