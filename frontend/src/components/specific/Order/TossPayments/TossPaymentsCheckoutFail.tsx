import { useNavigate, useSearchParams } from "react-router-dom";

const TossPaymentsCheckoutFail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const errorCode = searchParams.get("code");
  const errorMessage = searchParams.get("message");

  const goToCartPage = () => {
    navigate("/cart");
  };

  return (
    <div className="flex flex-col items-center p-6 overflow-auto w-full">
      <div className="flex flex-col items-center w-full max-w-[540px]">
        <img src="https://static.toss.im/lotties/error-spot-apng.png" className="w-[120px] h-[120px]" />
        <h2 className="mt-8 text-[#191f28] font-bold text-2xl">결제에 실패했어요</h2>
        <div className="flex flex-col gap-4 mt-[60px] w-full text-lg">
          <div className="flex justify-between">
            <span className="font-semibold text-[#333d48] text-lg">code</span>
            <span id="error-code" className="font-medium text-[#4e5968] text-lg pl-4 break-words text-right">
              {errorCode}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-[#333d48] text-lg">message</span>
            <span id="error-message" className="font-medium text-[#4e5968] text-lg pl-4 break-words text-right">
              {errorMessage}
            </span>
          </div>
        </div>

        <div className="w-full mt-8 flex flex-col justify-center gap-4 text-center">
          <button
            className="px-[22px] py-[11px] rounded-lg min-w-[350px] bg-[#f2f4f6] text-[#4e5968] font-semibold text-lg cursor-pointer"
            onClick={goToCartPage}
          >
            장바구니로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TossPaymentsCheckoutFail;
