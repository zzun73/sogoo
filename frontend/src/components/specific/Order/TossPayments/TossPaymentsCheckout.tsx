import { useEffect, useState } from "react";
import { v7 as uuidv7 } from "uuid";
import {
  loadTossPayments,
  TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";
import useRootStore from "../../../../stores";
import { toast } from "react-toastify";

const NORMAL_CLIENT_KEY = import.meta.env.VITE_TOSS_PAYMENTS_NORMAL_CLIENT_KEY;

const TossPaymentsCheckout = ({ orderData }: TossPaymentsCheckoutProps) => {
  const memberInfo = useRootStore().memberInfo;
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: orderData!.amount,
  });

  useEffect(() => {
    const fetchPaymentWidgets = async () => {
      const tossPayments = await loadTossPayments(NORMAL_CLIENT_KEY);
      const widgets = tossPayments.widgets({ customerKey: memberInfo!.uuid });
      setWidgets(widgets);
    };

    fetchPaymentWidgets();
  }, [memberInfo]);

  useEffect(() => {
    setAmount({
      currency: "KRW",
      value: orderData!.amount,
    });
  }, [orderData]);

  useEffect(() => {
    const renderPaymentWidgets = async () => {
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
    };

    renderPaymentWidgets();
  }, [widgets, amount]);

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
              const orderId = uuidv7();

              try {
                await widgets?.requestPayment({
                  orderId,
                  orderName: orderData!.orderName,
                  customerName: orderData!.customerName,
                  customerEmail: orderData!.customerEmail,
                  successUrl:
                    window.location.origin +
                    "/orders/success?" +
                    `storeId=${orderData?.storeId}` +
                    `&products=${JSON.stringify(orderData?.products)}` +
                    `&orderName=${orderData?.orderName}`,
                  failUrl: window.location.origin + "/orders/fail",
                });
              } catch (error) {
                console.error("Payment request failed:", error);
                toast.error("결제 요청 중 오류가 발생했습니다.");
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
