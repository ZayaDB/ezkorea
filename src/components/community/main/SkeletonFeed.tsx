// Skeleton.tsx
import { Skeleton } from '@mui/material';

const SkeletonFeed = () => {
  return (
    <div>
      <div className='feed-box'>
        <Skeleton
          variant='rectangular'
          width={280}
          height={280}
          sx={{ borderRadius: '8px' }}
        />
      </div>
    </div>
  );
};

export default SkeletonFeed;
