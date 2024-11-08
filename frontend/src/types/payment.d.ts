interface FoodItem {
  foodId: number;
  count: number;
}

interface NormalPaymentsConfirmRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
  storeId: number;
  foodItems: FoodItem[];
}

interface SubscribePaymentsConfirmRequest {
  orderId: string;
  subscribeId: number;
  authKey: string;
  customerKey: string;
}
