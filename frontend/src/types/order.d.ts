interface TossPaymentsCheckoutProps {
  orderData?: {
    orderName: string;
    customerName: string;
    customerEmail: string;
    amount: number;
  };
  returnPath?: string;
}
