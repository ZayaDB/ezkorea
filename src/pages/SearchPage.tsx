import { useState } from 'react';
import Modal from '@mui/material/Modal';
import ModalSearch from '../components/search/ModalSearch';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const closeModal = () => {
    setShowModal(false);
  };
  const goHistory = () => {
    closeModal();

    const { pathname } = location;

    if (pathname.includes('/community')) {
      navigate('/community');
    } else if (pathname.includes('/shop')) {
      navigate('/shop');
    } else {
      navigate(-1);
    }
  };
  return (
    <div>
      <Modal
        open={showModal}
        onClose={closeModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.895)',
            display: 'flex',
            justifyContent: 'center',
            padding: '60px',
          }}
        >
          <IconButton
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
            onClick={goHistory}
          >
            <CloseIcon />
          </IconButton>
          <ModalSearch
            closeModal={closeModal}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default SearchPage;
