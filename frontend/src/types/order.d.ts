interface TossPaymentsCheckoutProps {
  orderData?: {
    orderName: string;
    customerName: string;
    customerEmail: string;
    storeId: number;
    amount: number;
    subscribeId?: number;
    products: {
      foodId: number;
      count: number;
    }[];
  };
}
