import '../../styles/productDetail/productStyling.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { IFeedPreview } from '../../types/communityTypes';
import { Link } from 'react-router-dom';

export default function ProductsStyling() {
  const [pdStyling, setPdStyling] = useState<IFeedPreview[]>([]);
  // fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/feedPreview.json');
        const data = await response.json();

        setPdStyling(data);
      } catch (error) {
        console.error('Error fetching review data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        sx={{ maxWidth: 'md' }}
      >
        <div id='productStyling'>
          <div id='stylingTop'>
            <div id='stlyingSub'>
              <div id='stylingTitle'>유저들의 데스크셋업</div>
              <div className='stylingTotal'>1,609</div>
            </div>
            <div id='stylingLink'>
              <a href='#/'>
                <ArrowForwardIosIcon />
              </a>
            </div>
          </div>
          <div id='stylingBox'>
            {pdStyling.map((item, index) => (
              <Link to={`/community/detail/${item.feedId}`} key={index}>
                <div className='stylingItem' key={index}>
                  <img src={item.image} alt={`Product ${index + 1}`} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Grid>
    </>
  );
}
