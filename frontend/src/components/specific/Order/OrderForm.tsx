import { ChangeEvent, useState } from "react";
import { TextField } from "@mui/material";

import Checkout from "./TossPayments/Checkout";

const OrderForm = () => {
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [request, setRequest] = useState<string>("");

  const handleRecipientAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRecipientAddress(event.target.value);
    console.log(recipientAddress);
  };

  const handleRequestChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRequest(event.target.value);
    console.log(request);
  };

  return (
    <>
      <h2 className="text-3xl font-bold">주문서</h2>
      <div className="w-full my-10 flex flex-col gap-4">
        {/* 주문 상품 */}
        <div className="flex flex-col gap-8 w-full bg-cyan-50 p-8 rounded-xl">
          <h3 className="text-xl font-semibold">주문 상품</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4"></div>
        </div>
        {/* 수령인 정보 */}
        <div className="flex flex-col gap-8 w-full bg-cyan-50 p-8 rounded-xl">
          <h3 className="text-xl font-semibold">수령인 정보</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
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
              <div className="flex-1 w-full">
                <TextField fullWidth id="recipientAddress" placeholder="배송지 주소" onChange={handleRecipientAddressChange} />
              </div>
            </div>
            <div className="flex items-center">
              <p className="w-32">배송 요청사항</p>
              <div className="flex-1 w-full">
                <TextField fullWidth id="request" placeholder="배송 요청사항" onChange={handleRequestChange} />
              </div>
            </div>
          </div>
        </div>
        {/* 결제 수단 */}
        <div className="flex flex-col gap-8 w-full bg-cyan-50 p-8 rounded-xl">
          <h3 className="text-xl font-semibold">결제 수단</h3>
          <div>
            <Checkout />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderForm;
