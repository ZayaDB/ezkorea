import { useState, Dispatch, SetStateAction } from 'react';

// 토글 기능을 관리하는 사용자 정의 훅
export default function useToggle(
  initialValue: boolean
): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  // 값 토글 함수
  const toggleValue = (): void => {
    setValue(prevValue => !prevValue); // 이전 값의 반전
  };

  // 현재 값과 토글 함수 반환
  return [value, toggleValue];
}
