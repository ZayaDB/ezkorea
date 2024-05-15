import { useEffect } from 'react';
import ProductList from '../components/category/ProductList';
import SideNav from '../components/category/SideNav';
import '../styles/category/category.scss';
import { getData } from '../utils/getData';
import { setCategoryData, setProducts } from '../redux/slices/categorySlice';
import { useDispatch } from 'react-redux';

const Category = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { products } = await getData('/data/prodData.json');
        const { categoryData } = await getData('/data/categoryData.json');
        dispatch(setCategoryData(categoryData));
        dispatch(setProducts(products));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className='category-page'>
      <div className='category-content'>
        <div className='sideNavigation'>
          <SideNav />
        </div>
        <div className='containerProducts'>
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default Category;