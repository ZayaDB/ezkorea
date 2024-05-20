import * as React from 'react';
import { Transition } from 'react-transition-group';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { Snackbar } from '@mui/base/Snackbar';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const SnackbarContent = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '8px',
  overflow: 'hidden',
  backgroundColor: theme.palette.mode === 'dark' ? grey[900] : '#fff',
  borderRadius: '5px',
  border: `1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[500]}`,
  padding: '0.75rem',
  color: theme.palette.mode === 'dark' ? grey[50] : grey[900],
  fontFamily: 'IBM Plex Sans, sans-serif',
  fontWeight: 500,
  textAlign: 'start',
  position: 'relative',

  '& .snackbar-message': {
    flex: '1 1 0%',
    maxWidth: '100%',
  },

  '& .snackbar-title': {
    margin: 0,
    lineHeight: '1.5rem',
    marginRight: '0.5rem',
  },

  '& .snackbar-description': {
    margin: 0,
    lineHeight: '1.5rem',
    fontWeight: 400,
    color: theme.palette.mode === 'dark' ? grey[400] : grey[800],
  },

  '& .snackbar-close-icon': {
    cursor: 'pointer',
    flexShrink: 0,
    padding: '2px',
    borderRadius: '4px',
    '&:hover': {
      background: theme.palette.mode === 'dark' ? grey[800] : grey[50],
    },
  },
}));

interface HandleClickHeartProps {
  productName?: string;
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

// const ThinHeartBorder = styled(FavoriteBorder)({
//   strokeWidth: '0.00001px',
// });

export default function HandleClickHeart({
  productName,
  isLiked,
  onLikeToggle,
}: HandleClickHeartProps) {
  const [open, setOpen] = React.useState(false);
  const [exited, setExited] = React.useState(true);
  const nodeRef = React.useRef(null);

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  console.log(exited);

  const handleClick = () => {
    onLikeToggle();
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
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        checked={isLiked}
        onClick={handleClick}
      />
      <StyledSnackbar
        autoHideDuration={3000}
        open={open}
        onClose={() => setOpen(false)}
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

const StyledSnackbar = styled(Snackbar)`
  position: fixed;
  z-index: 5500;
  display: flex;
  bottom: 70px;
  right: 16px;
  max-width: 560px;
  min-width: 300px;
`;

const positioningStyles = {
  entering: 'translateX(0)',
  entered: 'translateX(0)',
  exiting: 'translateX(300px)',
  exited: 'translateX(300px)',
  unmounted: 'translateX(500px)',
};
