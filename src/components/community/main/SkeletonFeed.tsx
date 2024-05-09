// Skeleton.tsx
import React from 'react';
import { Skeleton } from '@mui/material';

const SkeletonFeed = () => {
  return (
    <div className='feed-skeleton'>
      <div className='feed-box'>
        <Skeleton variant='rectangular' width={280} height={280} />
      </div>
    </div>
  );
};

export default SkeletonFeed;
