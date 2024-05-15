/* 주문자 정보 */
export interface OrdererInfo {
  name?: string;
  phoneNum?: PhoneNum[];
}

/* 배송 정보 */
export interface DeliveryInfoType {
  recipient: string;
  postcode: number;
  addressDefault: string;
  addressRemaining: string;
  phoneNum: PhoneNum[];
  message?: string;
}

export interface PhoneNum {
  numFirst: string;
  numSecond: number;
  numThird: number;
}

/* 주문 정보 */
export interface OrderInfo {
  orderDate: string;
  orderNum: string;
  productImg: string;
  brand: string;
  productName: string;
  option: string;
  productPrice: number;
  quantity: number;
}

export interface Discount {
  discountChecked: boolean;
  productCoupon?: boolean;
  productCouponAmount?: number;
  shippingCoupon?: boolean;
}

export interface Mileage {
  mileage?: number;
  mileageAll?: boolean;
}

export interface PaymentMethod {
  method: string;
}
