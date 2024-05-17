import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import newItem from '../../assets/images/new_item.jpeg';
import newItem1 from '../../assets/images/new_item1.jpeg';
import newItem2 from '../../assets/images/new_item2.jpeg';
import newItem4 from '../../assets/images/new_item4.jpeg';
import newItem5 from '../../assets/images/new_item5.jpeg';
import newItem6 from '../../assets/images/new_item6.jpeg';
import newItem7 from '../../assets/images/new_item7.jpeg';
import newItem8 from '../../assets/images/new_item8.jpeg';
import { useNavigate } from 'react-router-dom';

const newItems = [
  {
    id: 1,
    image: newItem,
  },
  {
    id: 2,
    image: newItem1,
  },
  {
    id: 3,
    image: newItem2,
  },
  {
    id: 4,
    image: newItem4,
  },
  {
    id: 5,
    image: newItem5,
  },
  {
    id: 6,
    image: newItem6,
  },
  {
    id: 7,
    image: newItem7,
  },
  {
    id: 8,
    image: newItem8,
  },
  {
    id: 9,
    image: newItem,
  },
  {
    id: 10,
    image: newItem2,
  },
  {
    id: 11,
    image: newItem1,
  },
  {
    id: 12,
    image: newItem4,
  },
  {
    id: 13,
    image: newItem5,
  },
];

const newItemStyle = {
  width: '120px',
  margin: '0 30px',
  // opacity: 0.7,
};

export default function BestItem() {
  const navigate = useNavigate();
  const gotobest = () => {
    navigate('/shop/best');
  };
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '1200px' }}>
        <Box onClick={gotobest} sx={{ padding: '10px 0 30px 0', width: 'auto' }}>
          <div className='TitleArea'>
            <Typography sx={{ fontSize: '30px', fontWeight: '700' }}>
              BEST
            </Typography>
            {/* <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: '400',
                  color: '#999999',
                  letterSpacing: '0.2px',
                }}
              >
               #dururu #일상 #데스크테리어
              </Typography> */}
          </div>
          <Grid
            container
            justifyContent='center'
            sx={{ mt: 0.5, opacity: 0.6 }}
          >
            {newItems.slice(0, 6).map(item => (
              <Grid item key={item.id}>
                <img src={item.image} alt='' style={newItemStyle} />
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            justifyContent='center'
            sx={{
              mt: 0.5,
              opacity: 0.7,
            }}
          >
            {newItems.slice(6, 12).map(item => (
              <Grid item key={item.id}>
                <img src={item.image} alt='' style={newItemStyle} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
}
