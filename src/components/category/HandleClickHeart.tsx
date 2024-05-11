import * as React from 'react';
import { Transition } from 'react-transition-group';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { Snackbar } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // FavoriteBorder import 수정
import FavoriteIcon from '@mui/icons-material/Favorite'; // Favorite import 추가
import { SnackbarProvider, useSnackbar, VariantType } from 'notistack';

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

const ThinHeartBorder = styled(FavoriteBorderIcon)({
  // FavoriteBorderIcon으로 수정
  strokeWidth: '0.00001px',
});

export default function HandleClickHeart({
  productName,
  isLiked,
  onLikeToggle,
}: HandleClickHeartProps) {
  const [open, setOpen] = React.useState(false);
  const [exited, setExited] = React.useState(true);
  const nodeRef = React.useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const handleClick = (variant: VariantType) => {
    onLikeToggle();
    enqueueSnackbar(
      isLiked ? '찜하기 해제되었습니다 😢' : '찜하기 완료되었습니다 💚',
      {
        variant: variant,
      }
    );
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
        checkedIcon={<FavoriteIcon />}
        checked={isLiked}
        onClick={() => handleClick('success')}
      />
      <SnackbarProvider maxSnack={3}>
        <Transition
          timeout={{ enter: 300, exit: 300 }}
          in={open}
          appear
          unmountOnExit
          onEnter={handleOnEnter}
          onExited={handleOnExited}
          nodeRef={nodeRef}
        >
          {status => (
            <StyledSnackbar
              style={{
                transform: positioningStyles[status],
                transition: 'transform 300ms ease',
                backgroundColor: 'white',
                border: '1px solid gray',
                padding: '15px',
                borderRadius: '5px',
                height: '70px',
              }}
              ref={nodeRef}
              open={open}
              onClose={() => setOpen(false)}
            >
              <div>
                <div className='snackbar-message'>
                  <p className='snackbar-title' style={{ marginBottom: 0 }}>
                    {productName}
                  </p>
                  <p className='snackbar-description'>
                    {isLiked
                      ? '찜하기 완료되었습니다 💚'
                      : '찜하기 해제되었습니다 😢'}
                  </p>
                </div>
                <CloseIcon className='snackbar-close-icon' />
              </div>
            </StyledSnackbar>
          )}
        </Transition>
      </SnackbarProvider>
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
  bottom: 16px;
  right: 16px;
  max-width: 560px;
  min-width: 300px;
`;

const positioningStyles = {
  entering: 'translateX(0)',
  entered: 'translateX(0)',
  exiting: 'translateX(500px)',
  exited: 'translateX(500px)',
  unmounted: 'translateX(500px)',
};
