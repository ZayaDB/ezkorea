
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getData } from '../utils/getData';
import ProductList from '../components/category/ProductList';
import SideNav from '../components/category/SideNav';
import '../styles/category/category.scss';

import { setCategoryData, setProducts } from '../redux/slices/categorySlice';
// import HeartProduct from '../components/category/HeartProduct';
import RecentView from '../components/category/RecentView';
// import BestProduct from '../components/category/BestProduct';

export default function Category() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { products } = await getData('/data/prodData.json');
        const { categoryData } = await getData('/data/categoryData.json');
        // Redux 스토어에 데이터 저장
        dispatch(setCategoryData(categoryData));
        dispatch(setProducts(products));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='category-page'>
      <div className='category-content'>
        <div className='sideNavigation'>
          <SideNav />
        </div>
        <div className='containerProducts'>
          <ProductList />
        </div>
        <RecentView />
      </div>
      

        
    </div>
  );
}

