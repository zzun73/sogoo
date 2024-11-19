import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp, GridFooterContainer } from "@mui/x-data-grid";

import TossPaymentsCheckout from "./TossPayments/TossPaymentsCheckout";
import TossPaymentsBillingCheckout from "./TossPaymentsBilling/TossPaymentsBillingCheckout";
import useRootStore from "../../../stores";
import formatters from "../../../utils/formatters";

const OrderForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { memberInfo, foodList, subscribe, storeId, selectedId } = useRootStore();
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [request, setRequest] = useState<string>("");
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [orderName, setOrderName] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const isSubscription = location.state?.isSubscription ?? false;

  useEffect(() => {
    if (location.state?.accessRoute !== "/orders/cart") {
      console.error("장바구니 페이지를 통해서 접근해 주세요.");
      navigate(-1);
      return;
    }
  }, []);

  useEffect(() => {
    const initializeProducts = () => {
      if (isSubscription && subscribe) {
        const subscriptionItem = [{
          id: subscribe.id,
          productName: subscribe.name,
          productCount: 1,
          productPrice: subscribe.price,
        }];
        setRows(subscriptionItem);
        console.log("subscription", subscriptionItem);
      } else if (!isSubscription && foodList && selectedId) {
        const filteredFoodItems = foodList.filter((item) => selectedId.includes(item.id));
        const foodItems = filteredFoodItems.map((item) => ({
          id: item.id,
          productName: item.name,
          productCount: item.count,
          productPrice: item.price,
        }));
        setRows(foodItems);
        console.log("foodItems", foodItems);
      }
    };

    initializeProducts();
  }, [foodList, isSubscription, subscribe, selectedId]);

  useEffect(() => {
    // 주문명
    if (rows.length === 1) {
      setOrderName(rows[0].productName);
      console.log(rows[0].productName);
    } else if (rows.length > 1) {
      setOrderName(rows[0].productName + " 외 " + (rows.length - 1) + "건");
      console.log(rows[0].productName + " 외 " + (rows.length - 1) + "건");
    }
  }, [rows]);

  useEffect(() => {
    // 결제 예정 금액
    const calculator = rows.reduce((acc, cur) => {
      return acc + Number(cur.productPrice) * Number(cur.productCount);
    }, 0);
    setTotalPrice(calculator);
    console.log(calculator);
  }, [rows]);

  if (!storeId) {
    return;
  }

  const columns: GridColDef[] = [
    { field: "productName", headerName: "상품 명", type: "string", flex: 300 },
    { field: "productCount", headerName: "개수", type: "number", flex: 300, maxWidth: 100 },
    { field: "productPrice", headerName: "가격 (원)", type: "number", flex: 300, maxWidth: 150 },
  ];

  const handleRecipientAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRecipientAddress(event.target.value);
    console.log(recipientAddress);
  };

  const handleRequestChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRequest(event.target.value);
    console.log(request);
  };

  const convertToSubmitFormat = (data: GridRowsProp) => {
    const convertedData = data.map((item) => ({
      foodId: item.id,
      count: item.productCount,
    }));

    return convertedData;
  };

  function CustomFooter() {
    return (
      <GridFooterContainer className="flex justify-between items-center px-4">
        <div className="font-semibold ml-auto">총 주문금액: {formatters.formatToCurrency(totalPrice)}</div>
      </GridFooterContainer>
    );
  }

  return (
    <>
      <h2 className="text-5xl font-shilla text-center">주문서</h2>
      <div className="min-w-[800px] my-10 flex flex-col gap-4">
        {/* 주문 상품 */}
        <div className="flex flex-col gap-8 w-full p-8 rounded-t-3xl bg-white">
          <h3 className="text-xl font-semibold">주문 상품</h3>
          <div>
            <DataGrid
              rows={rows}
              columns={columns}
              slots={{
                footer: CustomFooter,
              }}
            />
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
          {isSubscription ? (
            <TossPaymentsBillingCheckout
              orderData={{
                orderName,
                storeId,
                customerName: memberInfo!.name,
                customerEmail: memberInfo!.email,
                amount: totalPrice,
                subscribeId: subscribe!.id,
                products: convertToSubmitFormat(rows),
              }}
            />
          ) : (
            <TossPaymentsCheckout
              orderData={{
                orderName,
                storeId,
                customerName: memberInfo!.name,
                customerEmail: memberInfo!.email,
                amount: totalPrice,
                products: convertToSubmitFormat(rows),
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default OrderForm;
