import { Box } from '@mui/material';

export default function SideMyNav() {
  return (
    <div>
      <Box className='side-nav'>
        <Box className='nav-box'>
          <Box className={'nav'} role='button' tabIndex={0}>
            <Box className='nav-title'></Box>
          </Box>

          <Box className={'box'}>
            <hr
              style={{
                border: 0,
                height: '2px',
                backgroundColor: '#272727',
                marginRight: '30px',
                marginBottom: '18px',
              }}
            />

            <Box className={'sub'} role='button' tabIndex={0}></Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
