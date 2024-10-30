const OrderForm = () => {
  return (
    <>
      <h2 className="text-3xl font-bold">주문서</h2>
      <div className="w-full">
        {/* 주문 상품 */}
        <div>
          <h3>주문 상품</h3>
        </div>
        {/* 수령인 정보 */}
        <div className="flex flex-col gap-4 w-full bg-cyan-50 p-5">
          <h3 className="text-xl font-semibold">수령인 정보</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex">
              <p className="w-32">받는 분</p>
              <p>김싸피</p>
            </div>
            <div className="flex">
              <p className="w-32">휴대폰</p>
              <p>010-1234-5678</p>
            </div>
            <div className="flex">
              <p className="w-32">배송지</p>
              <p>인풋 들어갈 자리임</p>
            </div>
            <div className="flex">
              <p className="w-32">배송 요청사항</p>
              <p>인풋 들어갈 자리임</p>
            </div>
          </div>
        </div>
        {/* 결제 수단 */}
        <div>
          <h3>결제 수단</h3>
        </div>
      </div>
    </>
  );
};

export default OrderForm;
