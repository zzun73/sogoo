import { useEffect, useState } from "react";
import { loadTossPayments, ANONYMOUS, TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";

const generateRandomString = () => window.btoa(Math.random().toString()).slice(0, 20);
const clientKey = import.meta.env.VITE_TOSS_PAYMENTS_CLIENT_KEY;

const Checkout = () => {
  const [, setReady] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const [amount] = useState({
    currency: "KRW",
    value: 50_000,
  });

  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
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

  return (
    <div className="wrapper w-100">
      <div className="max-w-540 w-100">
        <div className="p-4 rounded-2xl bg-white">
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
                  orderName: "토스 티셔츠 외 2건",
                  customerName: "김토스",
                  customerEmail: "customer123@gmail.com",
                  successUrl: window.location.origin + "/sandbox/success" + window.location.search,
                  failUrl: window.location.origin + "/sandbox/fail" + window.location.search,
                });
              } catch (error) {
                // TODO: 에러 처리
                alert(error);
                console.error(error);
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

export default Checkout;
