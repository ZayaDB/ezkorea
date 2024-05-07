import '../../styles/productDetail/productDetail.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function ProductsStyling() {
  return (
    <>
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
          <div className='stylingItem'></div>
          <div className='stylingItem'></div>
          <div className='stylingItem'></div>
          <div className='stylingItem'></div>
        </div>
      </div>
      <div>
        <img src='' alt='' />
      </div>
    </>
  );
}
