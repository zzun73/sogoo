interface MemberInfo {
  memberId: number;
  name: string;
  email: string;
  phoneNumber: string;
  birth: string;
  address: string;
  role: string;
  uuid: string;
}

interface MemberStore {
  memberInfo: MemberInfo | null;
  accessToken: null | string;
  isLogin: boolean;
  selectedId: number[] | null;
  setSelectedId: (selectedId: number[] | null) => void;
  setLogin: (userInfo: MemberInfo) => void;
  setAccessToken: (accessToken: string) => void;
  setLogout: () => void;
  setIsLogin: (isLogin: boolean) => void;
}

interface SubscribeItem {
  subscribeId: number;
  subscribeName: string;
  subscribePrice: number;
  storeId: number;
  storeName: string;
  SubscribePeriod: string;
}

interface FoodTradeItem {
  foodId: number;
  foodName: string;
  foodImg: string;
  storeId: number;
  storeName: string;
  price: number;
  orderStatus: string;
}

interface ReviewItem {
  foodId: number;
  foodName: string;
  foodImg: string;
  reviewStatus: boolean;
  orderListId: number;
  review?: {
    reviewId: number;
    reviewComment: string;
    reviewImg: string;
  };
}

interface BuyerDetailInfo {
  subscribes: SubscribeItem[] | null;
  foodTrades: FoodTradeItem[] | null;
  reviews: ReviewItem[] | null;
}
