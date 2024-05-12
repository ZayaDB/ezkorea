import React, { useState, useCallback } from 'react';
import { IconButton, IconButtonProps } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

interface LikeButtonProps extends IconButtonProps {
  feedId: number;
  initialLiked: boolean;
  onLike: (feedId: number) => void;
  iconSize?: string; // 아이콘 크기를 조절할 새로운 프롭스 추가
}

const LikeButton: React.FC<LikeButtonProps> = ({
  feedId,
  initialLiked,
  onLike,
  iconSize = '20px', // 기본값으로 '20px' 설정
  ...props
}) => {
  const [liked, setLiked] = useState<boolean>(initialLiked);

  const handleLike = useCallback(() => {
    setLiked(prevLiked => !prevLiked);
    onLike(feedId);
  }, [feedId, onLike]);

  return (
    <IconButton
      onClick={handleLike}
      sx={{
        color: liked ? 'error.main' : 'action.active',
        margin: 0,
        padding: 0,
      }}
      {...props}
    >
      {liked ? (
        <Favorite sx={{ color: 'red', fontSize: iconSize }} />
      ) : (
        <FavoriteBorder sx={{ fontSize: iconSize }} />
      )}
    </IconButton>
  );
};

export default LikeButton;
