import React from 'react';
import {
  Container,
  Typography,
  Avatar,
  Divider,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

interface Comment {
  id: number;
  user: string;
  text: string;
}

interface Props {
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
}

const CommunityDetail: React.FC<Props> = ({
  imageUrl,
  caption,
  likes,
  comments,
}) => {
  return (
    <Container maxWidth='md'>
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <img
          src={imageUrl}
          alt='Instagram Post'
          style={{ maxWidth: '100%', borderRadius: 8 }}
        />
      </div>
      <Typography variant='h6' style={{ marginTop: 20 }}>
        {caption}
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
        <Avatar sx={{ width: 24, height: 24 }} />{' '}
        {/* Replace Avatar with user's profile picture */}
        <Typography variant='body2' style={{ marginLeft: 8 }}>
          Liked by {likes} people
        </Typography>
      </div>
      <Divider style={{ margin: '20px 0' }} />
      <div>
        {comments.map(comment => (
          <div
            key={comment.id}
            style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}
          >
            <Typography
              variant='body2'
              style={{ fontWeight: 'bold', marginRight: 8 }}
            >
              {comment.user}:
            </Typography>
            <Typography variant='body2'>{comment.text}</Typography>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
        <IconButton style={{ marginRight: 8 }}>
          <FavoriteIcon />
        </IconButton>
        <IconButton>
          <ChatBubbleOutlineIcon />
        </IconButton>
      </div>
    </Container>
  );
};

export default CommunityDetail;
