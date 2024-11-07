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
  subscribeProducts: SubscribeFood[]; // 각 회차별로 구독 음식 데이터 배열
}
