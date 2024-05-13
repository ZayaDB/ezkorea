/* 주문자 정보 */
export interface OrdererInfo {
  ordererName: string;
  phoneNumFirst: number;
  phoneNumSecond: number;
  phoneNumThird: number;
}

/* 배송 정보 */
export interface DeliveryInfo {
  name: string;
  postcode: number;
  addressDefault: string;
  addressRemaining: string;
  phoneNumFirst: number;
  phoneNumSecond: number;
  phoneNumThird: number;
}
