import getTodayDate from './getTodayDate';

export default function getOrderNumber(): string {
  const datePart = getTodayDate('YYMMDD');

  // 랜덤한 3자리 숫자 생성 (시간 기반)
  const randomPart: string = Math.floor(100 + Math.random() * 900).toString();

  // 주문번호 생성하여 반환
  const orderNumber: string = datePart + randomPart;
  return orderNumber;
}
