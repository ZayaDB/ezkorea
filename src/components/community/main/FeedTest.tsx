import React from 'react';

import { useFetchData } from '../../../hooks/useFetchData';
import { FeedData } from '../../../types/communityTypes';

const FeedTest = () => {
  const [feedData, loading, error] =
    useFetchData<FeedData[]>('/data/feed.json');

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Feed Titles</h1>
      <ul>
        {feedData &&
          feedData.map(feed => (
            <li key={feed.feedId}>
              <h2>{feed.title}</h2>
              <img src={feed.images[0]} alt={`${feed.accountName}'s profile`} />
              <p>{feed.description}</p>
              <div>
                <strong>Views: </strong>
                {feed.views} | <strong>Likes: </strong>
                {feed.likes}
              </div>
              <div>
                <strong>Comments: </strong>
                {feed.commentCount}
              </div>
              {feed.comments &&
                feed.comments.map(comment => (
                  <div key={comment.id}>
                    <img
                      src={comment.profileImage}
                      alt={`${comment.accountName}'s profile`}
                    />
                    <p>{comment.content}</p>
                    <small>{comment.creationDate}</small>
                  </div>
                ))}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FeedTest;
