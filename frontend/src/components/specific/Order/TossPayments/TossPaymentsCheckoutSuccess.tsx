import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const TossPaymentsCheckoutSuccess = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [searchParams] = useSearchParams();
  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  const confirmPayment = async () => {
    // TODO: API를 호출해서 서버에게 paymentKey, orderId, amount를 넘겨주세요.
    // 서버에선 해당 데이터를 가지고 승인 API를 호출하면 결제가 완료됩니다.
    // https://docs.tosspayments.com/reference#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8
    const response = await fetch("/sandbox-dev/api/v1/payments/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount,
      }),
    });

    if (response.ok) {
      setIsConfirmed(true);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 w-full overflow-auto">
      {isConfirmed ? (
        <div
          className="hidden flex-col items-center w-full max-w-[540px]"
          style={{
            display: "flex",
          }}
        >
          <img src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" className="w-[120px] h-[120px]" />
          <h2 className="mt-8 text-[#191f28] font-bold text-2xl">결제를 완료했어요</h2>
          <div className="w-full mt-[60px] flex flex-col gap-4 text-xl">
            <div className="flex justify-between">
              <span className="font-semibold text-[#333d48] text-base">결제 금액</span>
              <span id="amount" className="font-medium text-[#4e5968] text-base pl-4 break-words text-right">
                {amount}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-[#333d48] text-base">주문번호</span>
              <span id="orderId" className="font-medium text-[#4e5968] text-base pl-4 break-words text-right">
                {orderId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-[#333d48] text-base">paymentKey</span>
              <span id="paymentKey" className="font-medium text-[#4e5968] text-base pl-4 break-words text-right">
                {paymentKey}
              </span>
            </div>
          </div>

          <div className="w-full mt-8 flex flex-col justify-center gap-4">
            <div className="flex" style={{ gap: "16px" }}>
              <a className="w-full px-[22px] py-[11px] rounded-lg" href="https://developers.tosspayments.com/sandbox">
                다시 테스트하기
              </a>
              <a className="w-full px-[22px] py-[11px] rounded-lg" href="https://docs.tosspayments.com/guides/v2/payment-widget/integration" target="_blank" rel="noopner noreferer">
                결제 연동 문서가기
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between items-center mt-[72px] w-full h-[400px] max-w-[540px]">
          <div className="flex flex-col items-center">
            <img src="https://static.toss.im/lotties/loading-spot-apng.png" className="w-[120px] h-[120px]" />
            <h2 className="mt-8 text-[#191f28] font-bold text-2xl text-center">결제 요청까지 성공했어요.</h2>
            <h4 className="mt-2 text-[#4e5968] font-medium text-base text-center">결제 승인하고 완료해보세요.</h4>
          </div>
          <div className="w-full">
            <button className="w-full px-[22px] py-[11px] rounded-lg text-[#f9fcff] bg-[#3282f6]" onClick={confirmPayment}>
              결제 승인하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TossPaymentsCheckoutSuccess;
