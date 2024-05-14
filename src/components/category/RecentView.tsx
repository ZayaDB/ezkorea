import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { Products } from '../../types/productTypes';
import '../../styles/category/category.scss';
// import { useMediaQuery } from '@mui/material';

export default function RecentView() {
  // const isMobile = useMediaQuery('(max-width:768px)');

  const clickedProducts: Products[] = JSON.parse(
    localStorage.getItem('clickedProducts') || '[]'
  );

  return (
    <div className='recent-products'>
      <div
        style={{
          textAlign: 'center',
          fontSize: '13px',
          marginBottom: '10px',
        }}
      >
        RECENT VIEW
      </div>

      {clickedProducts.map(product => (
        <Box key={product.productId} className='recent-product'>
          <Link
            to={`/productDetail?productId=${product.productId}`}
            className='link-to-detail'
          >
            <div className='prod-img'>
              <img src={product.thumbnail} alt={product.name} />
            </div>
            <div className='prod-info'>
              <div className='prod-name'>{product.name}</div>
            </div>
          </Link>
        </Box>
      ))}
    </div>
  );
}
