import ContentArea from '../styles/ContentArea';
import { Typography } from '@mui/material';
import theme from '../styles/theme';

export default function CommunityPostPage() {
  return (
    <>
      <ContentArea>
        <Typography
          sx={{
            fontSize: '28px',
            fontWeight: 700,
            backgroundColor: theme.palette.grey[300],
          }}
        >
          Custom Title
        </Typography>
        <Typography sx={{ fontSize: '20px', fontWeight: 500 }}>
          Custom Subtitle
        </Typography>
      </ContentArea>
    </>
  );
}
