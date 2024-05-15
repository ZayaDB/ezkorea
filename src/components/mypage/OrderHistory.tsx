import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config';

export default function OrderHistory() {
  const product = useSelector((state: RootState) => state.product.products);
  console.log(product);

  return <div>OrderHistory</div>;
}
