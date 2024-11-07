import { ChangeEvent, useState } from "react";
// import { useLocation } from "react-router-dom";
import { TextField } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

import TossPaymentsCheckout from "./TossPayments/TossPaymentsCheckout";
import TossPaymentsBillingCheckout from "./TossPaymentsBilling/TossPaymentsBillingCheckout";
import useRootStore from "../../../stores";
import formatters from "../../../utils/formatters";

const OrderForm = () => {
  // const location = useLocation();
  const memberInfo = useRootStore().memberInfo;
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [request, setRequest] = useState<string>("");
  const [isSubscription, setIsSubscription] = useState(false);

  // 주문 상품 목록 DataGrid 관련 데이터(rows, columns)
  const rows: GridRowsProp = [
    { id: 1, productName: "Hello", productCount: 1, productPrice: 10000 },
    { id: 2, productName: "DataGridPro", productCount: 3, productPrice: 8000 },
    { id: 3, productName: "MUI", productCount: 2, productPrice: 7000 },
  ];

  const columns: GridColDef[] = [
    { field: "productName", headerName: "상품 명", type: "string", flex: 300 },
    { field: "productCount", headerName: "개수", type: "number", flex: 300, maxWidth: 100 },
    { field: "productPrice", headerName: "가격", type: "number", flex: 300, maxWidth: 150 },
  ];

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
      <h2 className="text-5xl font-shilla text-center">주문서</h2>
      <div className="min-w-[800px] my-10 flex flex-col gap-4">
        {/* 주문 상품 */}
        <div className="flex flex-col gap-8 w-full p-8 rounded-t-3xl bg-white">
          <h3 className="text-xl font-semibold">주문 상품</h3>
          <div>
            <DataGrid rows={rows} columns={columns} />
          </div>
        </div>
        {/* 수령인 정보 */}
        <div className="flex flex-col gap-8 w-full p-8 rounded-b-3xl bg-white">
          <h3 className="text-xl font-semibold">수령인 정보</h3>
          <div className="flex flex-col gap-x-8 gap-y-4">
            <div className="grid grid-cols-2 gap-x-4">
              <div className="flex items-center">
                <p className="w-32">받는 분</p>
                <p>{memberInfo!.name}</p>
              </div>
              <div className="flex items-center">
                <p className="w-32">휴대폰</p>
                <p>{formatters.formatPhoneNumber(memberInfo!.phoneNumber)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="w-32">배송지</p>
              <div className="flex-1 w-full">
                <TextField
                  fullWidth
                  id="recipientAddress"
                  placeholder="배송지 주소"
                  defaultValue={memberInfo!.address}
                  onChange={handleRecipientAddressChange}
                />
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
        <div className="flex flex-col gap-8 w-full mt-4 p-8 rounded-3xl bg-white">
          <h3 className="text-xl font-semibold">결제 수단</h3>
          <button onClick={() => setIsSubscription((prev) => !prev)}>임시 버튼(추후 삭제)</button>
          {isSubscription ? (
            <TossPaymentsBillingCheckout />
          ) : (
            <TossPaymentsCheckout
              orderData={{
                orderName: "토스 티셔츠 외 2건",
                customerName: memberInfo!.name,
                customerEmail: memberInfo!.email,
                amount: 20000,
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default OrderForm;
