import { RootState } from '../redux/config/index';
import { useSelector } from 'react-redux';

const getSelectedValue = <T>(selector: (state: RootState) => T): T => {
  return useSelector((state: any) => selector(state));
};

export default getSelectedValue;

