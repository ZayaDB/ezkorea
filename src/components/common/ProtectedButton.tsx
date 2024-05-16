import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  SxProps,
  Theme,
} from '@mui/material';
import { grey } from '@mui/material/colors';

// props로 받을 애들 타입 선언, onClick 이벤트는 옵셔널
interface ProtectedButtonProps {
  children: React.ReactNode;
  redirectTo: string;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

// props로 페이지 이동값 필수로 받음
const ProtectedButton: React.FC<ProtectedButtonProps> = ({
  children,
  redirectTo,
  onClick,
  sx,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 버튼에 OnClick 일어났을 때 실행되는 함수
  const handleAction = () => {
    // 세션에서 로그인 불리언 값 가져와 판별 후 로그인 되어 있으면 props로 받은 함수 실행하고 지정한 url로 리다이렉트
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      onClick?.();
      window.location.href = redirectTo;
      // 로그인 값 false면 모달 띄움
    } else {
      handleOpen();
    }
  };

  return (
    <>
      <Button onClick={handleAction} sx={sx} disableRipple>
        {children}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>로그인이 필요합니다.</DialogContent>
        <DialogActions>
          <Button sx={{ color: grey[400] }} onClick={handleClose}>
            닫기
          </Button>
          <Button
            sx={{ color: 'black' }}
            onClick={() => {
              handleClose();
              window.location.href = '/login';
            }}
          >
            로그인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProtectedButton;
