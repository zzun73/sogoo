interface TossPaymentsCheckoutProps {
  orderData?: {
    orderName: string;
    customerName: string;
    customerEmail: string;
    amount: number;
  };
}

interface Item {
  id: number;
  name: string;
  price: number;
  beforePrice?: number;
}

interface SelectedItem extends Item {
  quantity: number;
  category: string;
}
