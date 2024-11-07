interface FoodItem {
  foodId: number;
  count: number;
}

interface NormalPaymentsConfirmRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
  foodItems: FoodItem[];
}
