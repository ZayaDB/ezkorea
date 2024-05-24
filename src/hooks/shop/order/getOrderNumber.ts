import getTodayDate from './getTodayDate';

export default function getOrderNumber(): [string, string] {
  const datePart = getTodayDate('YYMMDD');

  // 랜덤한 3자리 숫자 생성 (100에서 999 사이)
  const randomPart: string = Math.floor(100 + Math.random() * 900).toString();

  // 주문번호 생성하여 배열로 반환
  const orderNumber: [string, string] = [`${datePart}-${randomPart}`, datePart];

  return orderNumber;
}
