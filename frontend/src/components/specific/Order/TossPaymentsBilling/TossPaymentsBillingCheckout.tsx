import { loadTossPayments, TossPaymentsPayment } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import useRootStore from "../../../../stores";

const CLIENT_KEY = import.meta.env.VITE_TOSS_PAYMENTS_BILLING_CLIENT_KEY;

export function PaymentCheckoutPage() {
  const memberInfo = useRootStore().memberInfo;
  const customerKey = memberInfo!.uuid; // 구매자 UUID
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);
  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(CLIENT_KEY);
        // 회원 결제
        // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentspayment
        const payment = tossPayments.payment({
          customerKey,
        });
        // 비회원 결제
        // const payment = tossPayments.payment({ customerKey: ANONYMOUS });
        setPayment(payment);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    }
    fetchPayment();
  }, [customerKey]);
  // ------ '카드 등록하기' 버튼 누르면 결제창 띄우기 ------
  // @docs https://docs.tosspayments.com/sdk/v2/js#paymentrequestpayment
  async function requestBillingAuth() {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    await payment!.requestBillingAuth({
      method: "CARD", // 자동결제(빌링)는 카드만 지원합니다
      successUrl: window.location.origin + "/success", // 요청이 성공하면 리다이렉트되는 URL
      failUrl: window.location.origin + "/fail", // 요청이 실패하면 리다이렉트되는 URL
      customerEmail: memberInfo?.email,
      customerName: memberInfo?.name,
    });
  }
  return (
    // 카드 등록하기 버튼
    <button className="button" onClick={() => requestBillingAuth()}>
      카드 등록하기
    </button>
  );
}
