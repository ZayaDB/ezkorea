import * as React from 'react';
import { Transition } from 'react-transition-group';
import { styled } from '@mui/system';
// import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseIcon from '@mui/icons-material/Close';
import { Snackbar } from '@mui/base/Snackbar';
import { SnackbarCloseReason } from '@mui/base/useSnackbar';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

interface HandleClickHeartProps {
  productName: string;
  isLiked: boolean;
  onLikeToggle: () => void;
}

const BlackCheckbox = styled(Checkbox)({
  color: 'black',
  '&.Mui-checked': {
    color: 'black',
  },
});

const StyledCheckbox = styled(BlackCheckbox)(({ theme }) => ({
  '& .MuiSvgIcon-root': {
    width: '1.2em',
  },
  [theme.breakpoints.down('md')]: {
    padding: 2,
    marginBottom: 5,
    '& .MuiSvgIcon-root': {
      width: '0.9em',
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: 2,
    margin: 0,
    '& .MuiSvgIcon-root': {
      width: '0.6em',
    },
  },
}));

const ThinHeartBorder = styled(FavoriteBorder)({
  // fontSize: 'inherit', // 아이콘 크기를 상속받아 설정
  strokeWidth: '0.00001px', // 테두리 두께 조정
  // borderSpacing: '0.3px',
});

export default function HandleClickHeart({
  productName,
  isLiked,
  onLikeToggle,
}: HandleClickHeartProps) {
  const [open, setOpen] = React.useState(false);
  const [exited, setExited] = React.useState(true);
  const nodeRef = React.useRef(null);

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const handleClose = (_: any, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClick = () => {
    onLikeToggle(); // 좋아요 토글 핸들러 호출
    setOpen(true);
  };

  const handleOnEnter = () => {
    setExited(false);
  };

  const handleOnExited = () => {
    setExited(true);
  };

  return (
    <React.Fragment>
      <StyledCheckbox
        {...label}
        icon={<ThinHeartBorder />}
        checkedIcon={<Favorite />}
        checked={isLiked} // 좋아요 상태에 따라 체크박스 상태 변경
        onClick={handleClick}
      />
      <StyledSnackbar
        autoHideDuration={5000}
        open={open}
        // onClose={handleClose}
        exited={exited}
      >
        <Transition
          timeout={{ enter: 400, exit: 400 }}
          in={open}
          appear
          unmountOnExit
          onEnter={handleOnEnter}
          onExited={handleOnExited}
          nodeRef={nodeRef}
        >
          {status => (
            <SnackbarContent
              style={{
                transform: positioningStyles[status],
                transition: 'transform 300ms ease',
              }}
              ref={nodeRef}
            >
              <div className='snackbar-message'>
                <p className='snackbar-title'>{productName}</p>
                {/* isLiked 상태에 따라 다른 메시지 표시 */}
                <p className='snackbar-description'>
                  {isLiked
                    ? '찜하기 완료되었습니다 💚'
                    : '찜하기 해제되었습니다 😢'}
                </p>
              </div>
              <CloseIcon
                onClick={handleClose}
                className='snackbar-close-icon'
              />
            </SnackbarContent>
          )}
        </Transition>
      </StyledSnackbar>
    </React.Fragment>
  );
}

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

// const TriggerButton = styled('button')(
//   ({ theme }) => `
//   font-family: 'IBM Plex Sans', sans-serif;
//   font-weight: 600;
//   font-size: 0.875rem;
//   line-height: 1.5;
//   padding: 8px 16px;
//   border-radius: 8px;
//   color: white;
//   transition: all 150ms ease;
//   cursor: pointer;
//   background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
//   border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
//   color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
//   box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

//   &:hover {
//     background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
//     border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
//   }

//   &:active {
//     background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
//   }

//   &:focus-visible {
//     box-shadow: 0 0 0 4px ${
//       theme.palette.mode === 'dark' ? grey[300] : grey[200]
//     };
//     outline: none;
//   }
//   `
// );

const StyledSnackbar = styled(Snackbar)`
  position: fixed;
  z-index: 5500;
  display: flex;
  bottom: 16px;
  right: 16px;
  max-width: 560px;
  min-width: 300px;
`;

const SnackbarContent = styled('div')(
  ({ theme }) => `
  display: flex;
  gap: 8px;
  overflow: hidden;
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border-radius: 5px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[500]};
  padding: 0.75rem;
  color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;

  & .snackbar-message {
    flex: 1 1 0%;
    max-width: 100%;
  }

  & .snackbar-title {
    margin: 0;
    line-height: 1.5rem;
    margin-right: 0.5rem;
  }

  & .snackbar-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
  }

  & .snackbar-close-icon {
    cursor: pointer;
    flex-shrink: 0;
    padding: 2px;
    border-radius: 4px;
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    }
  }
  `
);

const positioningStyles = {
  entering: 'translateX(0)',
  entered: 'translateX(0)',
  exiting: 'translateX(500px)',
  exited: 'translateX(500px)',
  unmounted: 'translateX(500px)',
};
