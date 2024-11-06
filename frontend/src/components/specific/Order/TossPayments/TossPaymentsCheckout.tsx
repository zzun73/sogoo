import { useEffect, useState } from "react";
import { loadTossPayments, TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";
import useRootStore from "../../../../stores";

const generateRandomString = () => window.btoa(Math.random().toString()).slice(0, 20);
const NORMAL_CLIENT_KEY = import.meta.env.VITE_TOSS_PAYMENTS_CLIENT_KEY;

const TossPaymentsCheckout = ({
  orderData = {
    orderName: "토스 티셔츠 외 2건",
    customerName: "김싸피",
    customerEmail: "KimSSAFY@abcdeSSAFY.com",
    amount: 20000,
  },
  returnPath = "/",
}: TossPaymentsCheckoutProps) => {
  const memberInfo = useRootStore().memberInfo;
  const [, setReady] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const [amount] = useState({
    currency: "KRW",
    value: orderData.amount,
  });

  useEffect(() => {
    async function fetchPaymentWidgets() {
      console.log("1번");
      const tossPayments = await loadTossPayments(NORMAL_CLIENT_KEY);
      console.log("2번 tossPayments", tossPayments);
      const widgets = tossPayments.widgets({ customerKey: memberInfo!.uuid });
      console.log("3번 widgets", widgets);
      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, [memberInfo]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets === null) {
        return;
      }

      await widgets.setAmount(amount);

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets, amount]);

  const createRedirectUrl = (type: "success" | "fail") => {
    const baseUrl = window.location.origin;
    const currentPath = encodeURIComponent(location.pathname); // 현재 경로 저장
    const redirectPath = encodeURIComponent(returnPath); // 최종 목적지 경로 저장

    return `${baseUrl}/orders/${type}?` + `currentPath=${currentPath}&` + `redirectPath=${redirectPath}&` + `orderId=${generateRandomString()}`; // 주문 ID도 함께 전달
  };

  return (
    <div className="flex flex-col items-center overflow-auto w-full">
      <div className="max-w-[650px] w-full">
        <div>
          <div id="payment-method" className="w-full" />
          <div id="agreement" className="w-full" />
        </div>
        <div className="w-full py-6 flex justify-center">
          <button
            className="w-2/3 px-[22px] py-[11px] rounded-lg bg-[#3282f6] text-[#f9fcff]"
            onClick={async () => {
              try {
                await widgets?.requestPayment({
                  orderId: generateRandomString(),
                  orderName: orderData.orderName,
                  customerName: orderData.customerName,
                  customerEmail: orderData.customerEmail,
                  successUrl: createRedirectUrl("success"),
                  failUrl: createRedirectUrl("fail"),
                });
              } catch (error) {
                console.error("Payment request failed:", error);
                alert("결제 요청 중 오류가 발생했습니다.");
              }
            }}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TossPaymentsCheckout;
