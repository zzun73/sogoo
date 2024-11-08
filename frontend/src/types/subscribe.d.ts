interface SubscribeInfo {
  subscribeId: number;
  subscribeName: string;
  subscribeDescription: string;
  subscribePrice: number;
  subscribeBeforePrice: number;
}

interface SubscribeData {
  subscribeDate: string;
  subscribeRound: number;
  subscribeFood: number[];
}

interface SubscribeFoodItem {
  foodId: number;
  foodName: string;
  foodDescription: string;
  foodPrice: number;
  foodImg: string;
}

interface SubscribeProductsData {
  subscribeDate: string;
  subscribeRound: number;
  foodData: SubscribeFoodItem[];
}

interface AddSubscribeForm {
  subscribeName: string;
  subscribeDescription: string;
  subscribeBeforePrice: number;
  subscribePrice: number;
  subscribeProducts: SubscribeData[];
}

interface SubscribeDetailData {
  subscribeName: string;
  subscribeDescription: string;
  subscribeBeforePrice: number;
  subscribePrice: number;
  subscribeProducts: SubscribeProductsData[];
}
