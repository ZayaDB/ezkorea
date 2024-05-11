import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CommunityDetailPage: React.FC = () => {
  const [feed, setFeed] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { feedId } = useParams<{ feedId?: string }>();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!feedId) {
          throw new Error('Feed ID is not provided');
        }

        const response = await fetch('/data/feed.json'); // 데이터를 가져오는 경로를 적절히 수정해야 합니다.
        const data = await response.json();
        const selectedFeed = data.find(
          (item: any) => item.feedId === parseInt(feedId)
        );
        if (selectedFeed) {
          setFeed(selectedFeed);
          setIsError(false);
        } else {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [feedId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !feed) {
    return <div>Error: Feed not found</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {feed.images.map((image: string, index: number) => (
        <div key={index}>
          <img
            src={image}
            alt='초깔끔 아틀리에의 사진'
            style={{ width: '100%', marginBottom: '20px' }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <img
              src={feed.profileImage}
              alt='Profile'
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                marginRight: '10px',
              }}
            />
            <span>{feed.accountName}</span>
          </div>
          <p style={{ marginBottom: '20px' }}>{feed.creationDate}</p>
        </div>
      ))}
      <h2 style={{ marginBottom: '10px' }}>{feed.title}</h2>
      <p style={{ marginBottom: '20px' }}>{feed.description}</p>
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}
      >
        <span style={{ marginRight: '10px' }}>Likes: {feed.likes}</span>
        <span>Comments: {feed.commentCount}</span>
      </div>
      <h3>Comments</h3>
      <ul>
        {feed.comments.map((comment: any) => (
          <li key={comment.id} style={{ marginBottom: '10px' }}>
            <strong>{comment.accountName}</strong>: {comment.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityDetailPage;
