import { styled } from '@mui/material/styles';
import { Box, Typography, Button, TextField } from '@mui/material';

export const ColorCircle = styled(Box)<{ color: string }>(({ color }) => ({
  width: 15,
  height: 15,
  color: '#000000',
  borderRadius: '50%',
  border: color === 'white' ? '1px solid #E5E5E5' : 'contained',
  backgroundColor: color === 'wood' ? '#9A6322' : color,
  marginRight: '8px',
}));

export const ProductInfo = styled(Typography)`
  width: 100%;
  font-size: 14px;
  letter-spacing: -0.3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 16px;
  padding-top: 6px;
`;

export const ProductBox = styled(Box)`
  width: 128px;
  height: 128px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    border: 1px solid #5ff531;
    pointer-events: auto;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease-in-out;
    pointer-events: none;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const outlineButtonStyles = {
  border: '1px solid rgb(218, 221, 224)',
  color: '#2F3438',
};

export const TagButton = styled(Button)`
  width: 96px;
  margin: 0 4px 0 0;
  padding: 0 12px;
  font-size: 14px;
  height: 32px;
  border-radius: 16px;
  font-weight: 600;
  pointer-events: none;
  &:hover {
    background-color: initial;
  }
  ${outlineButtonStyles}
`;

export const CustomTypography = styled(Typography)`
  font-weight: bold;
  color: rgb(130, 140, 148);
  font-size: 14px;
  cursor: pointer;
  &:hover {
    font-weight: 800;
    color: #5ff531;
  }
`;

export const ImgButton = styled(Box)`
  margin: 0;
  padding: 0;
  width: 128px;
  height: 128px;
  min-width: 128px;
  min-height: 128px;
  overflow: hidden;
  margin-bottom: 10px;
  flex: 0 0 100px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  outline: 1px solid rgba(0, 0, 0, 0.08);
  cursor: pointer;

  &:hover {
    outline: 2px solid #5ff531;
    pointer-events: auto;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    pointer-events: none;
  }
`;

export const InputTextField = styled(TextField)({
  '& label': {
    // placeholder text color
    color: '#7f7f7f',
  },
  '& label.Mui-focused': {
    // 해당 input focus 되었을 때 placeholder text color
    // floatng label을 사용할 때 처리 필요
    color: '#666666',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'yellow',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#e5e5e5',
    },
    '&:hover fieldset': {
      borderColor: '#c0c0c0',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#000000',
      borderWidth: '1.8px',
      color: '#5ff531',
    },
  },
});

export const CommentButton = styled(Typography)`
  color: rgb(130, 140, 148);
  padding: 0px;
  background-color: transparent;
  border: none;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: #5ff531;
  }
`;
