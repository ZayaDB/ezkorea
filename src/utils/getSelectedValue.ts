import { RootState } from '../redux/config/index';
import { useSelector } from 'react-redux';

// 유틸리티 함수: Redux 상태로부터 선택된 값을 가져오는 함수
const getSelectedValue = <T>(selector: (state: RootState) => T): T => {
  return useSelector(selector);
};
export default getSelectedValue;
