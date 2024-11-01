const OrderSuccess = () => {
  return (
    <>
      <h2 className="text-3xl font-bold text-center">주문 완료</h2>
      <div className="min-w-[800px] my-10 flex flex-col gap-4">
        {/* 주문 상품 */}
        <div className="flex flex-col gap-8 w-full p-8 rounded-t-3xl bg-white">
          <h3 className="text-xl font-semibold">주문 상품</h3>
          <div>{/* <DataGrid rows={rows} columns={columns} /> */}</div>
        </div>
        {/* 주문 정보 */}
        <div className="flex flex-col gap-8 w-full p-8 rounded-b-3xl bg-white">
          <h3 className="text-xl font-semibold">수령인 정보</h3>
          <div className="grid grid-cols-2 gap-x-4">
            <div className="flex items-center">
              <p className="w-32">받는 분</p>
              <p>김싸피</p>
            </div>
            <div className="flex items-center">
              <p className="w-32">휴대폰</p>
              <p>010-1234-5678</p>
            </div>
            <div className="flex items-center">
              <p className="w-32">배송지</p>
              <p>광주광역시 광산구</p>
            </div>
            <div className="flex items-center">
              <p className="w-32">배송 요청사항</p>
              <p>부재시 문 앞에 보관 부탁드립니다.</p>
            </div>
            <div className="flex items-center">
              <p className="w-32">결제 방식</p>
              <p>토스페이</p>
            </div>
            <div className="flex items-center">
              <p className="w-32">결제 금액</p>
              <p>50,000원</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
