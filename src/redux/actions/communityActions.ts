import { AppThunk } from '../config';
import { submitFeed } from '../slices/communitySlice';
import { IFormInput } from '../../types/communityTypes';

export const submitFeedAndRedirect =
  (completeData: IFormInput, navigate: (path: string) => void): AppThunk =>
  async dispatch => {
    try {
      dispatch(submitFeed(completeData)); // 폼 데이터를 스토어에 저장
      navigate('/community/result'); // 성공적으로 저장 후 결과 페이지로 라우팅
    } catch (error) {
      console.error('피드 등록에 실패하였습니다.:', error);
    }
  };
