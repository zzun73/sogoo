import { loadTossPayments, TossPaymentsPayment } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import useRootStore from "../../../../stores";

const BILLING_CLIENT_KEY = import.meta.env.VITE_TOSS_PAYMENTS_BILLING_CLIENT_KEY;

const TossPaymentsBillingCheckout = () => {
  const memberInfo = useRootStore().memberInfo;
  const customerKey = memberInfo!.uuid; // 구매자 UUID
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);

  // const generateRandomString = () => window.btoa(Math.random().toString()).slice(0, 20);

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

    await payment!.requestBillingAuth({
      method: "CARD", // 자동결제(빌링)는 카드만 지원합니다
      successUrl: window.location.origin + "/orders/success", // 요청이 성공하면 리다이렉트되는 URL
      failUrl: window.location.origin + "/orders/fail", // 요청이 실패하면 리다이렉트되는 URL
      customerEmail: memberInfo?.email,
      customerName: memberInfo?.name,
    });
  };
  return (
    <div className="w-full flex justify-center">
      <button className="w-2/3 px-[22px] py-[11px] rounded-lg bg-[#3282f6] text-[#f9fcff]" onClick={() => requestBillingAuth()}>
        구독 결제하기
      </button>
    </div>
  );
};

export default TossPaymentsBillingCheckout;
