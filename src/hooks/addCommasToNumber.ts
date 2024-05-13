// 숫자를 세 자리마다 쉼표를 추가하는 함수
export const addCommasToNumber = (number: number): string => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
