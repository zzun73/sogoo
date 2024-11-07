interface FoodProps {
  foodId: number;
  foodName: string;
  foodDescription: string;
  foodImg: string;
}

interface WeeklyFood {
  subscribeDate: string;
  subscribeRound: number;
  foods: FoodProps[];
}

interface SubscribeInfo {
  subscribeId: number;
  subscribeName: string;
  subscribeDescription: string;
  subscribePrice: number;
  subscribeBeforePrice: number;
  weeklyFood?: WeeklyFood;
}

interface SubscribeData {
  subscribeDate: string;
  subscribeRound: number;
  subscribeFood: number[];
}

interface AddSubscribeForm {
  subscribeName: string; // 구독 이름
  subscribeDescription: string; // 구독 설명
  subscribeBeforePrice: number; // 구독 전 가격
  subscribePrice: number; // 실제 구독 가격
  subscribeProducts: SubscribeData[]; // 각 회차별로 구독 음식 데이터 배열
}
