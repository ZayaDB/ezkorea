import Head from './Head';

/* 결제수단 */
export default function PaymentMethod() {
  return (
    <div>
      <Head text="결제수단" />
      <label>
        <input type="radio" name="payment" id="account" defaultChecked={true} />
        계좌 간편결제
      </label>
      <label>
        <input type="radio" name="payment" id="card" /> 카드 간편결제
      </label>
      <label>
        <input type="radio" name="payment" id="general" /> 일반결제
      </label>
    </div>
  );
}
