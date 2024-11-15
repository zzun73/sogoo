import { useEffect, useState } from "react";
import {
  loadTossPayments,
  TossPaymentsPayment,
} from "@tosspayments/tosspayments-sdk";
import useRootStore from "../../../../stores";
import { generateOrderNumber } from "../../../../utils/generateOrderNumber";

const BILLING_CLIENT_KEY = import.meta.env
  .VITE_TOSS_PAYMENTS_BILLING_CLIENT_KEY;

const TossPaymentsBillingCheckout = ({
  orderData,
}: TossPaymentsCheckoutProps) => {
  const memberInfo = useRootStore().memberInfo;
  const customerKey = memberInfo!.uuid; // 구매자 UUID
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);

  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(BILLING_CLIENT_KEY);
        const paymentInstance = tossPayments.payment({
          customerKey,
        });
        setPayment(paymentInstance);
        console.log("Payment instance:", paymentInstance);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    }
    fetchPayment();
  }, [customerKey]);

  // ------ '카드 등록하기' 버튼 누르면 결제창 띄우기 ------
  const requestBillingAuth = async () => {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    // const orderId = generateRandomString();
    const orderId = generateOrderNumber("BIL", 8);

    await payment!.requestBillingAuth({
      method: "CARD",
      successUrl:
        window.location.origin +
        "/orders/billing/success?" +
        `&amount=${orderData?.amount}` +
        `&orderId=${orderId}` +
        `&orderName=${orderData?.orderName}` +
        `&subscribeId=${orderData?.subscribeId}`,
      failUrl: window.location.origin + "/orders/fail",
      customerEmail: orderData?.customerEmail,
      customerName: orderData?.customerName,
    });
  };
  return (
    <div className="w-full flex justify-center">
      <button
        className="w-2/3 px-[22px] py-[11px] rounded-lg bg-[#3282f6] text-[#f9fcff]"
        onClick={() => requestBillingAuth()}
      >
        구독 결제하기
      </button>
    </div>
  );
};

export default TossPaymentsBillingCheckout;
