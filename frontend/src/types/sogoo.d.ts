// 자주 사용되는 변수에 대한 type 정의
type Name = string;
type Email = string;
type Password = string;
type phoneNumber = string;
type Birth = string;
type Address = string;
type Role = string;
type AccessToken = string;
type BusinessNumber = string | null;
type StoreId = number;
type StoreName = string;
type StoreDescription = string;
type ImageURL = string;
type SubscribeId = number;

// request, response 변수에 대한 type 정의

interface SignUpForm {
  name: Name;
  email: Email;
  password: Password;
  phoneNumber: phoneNumber;
  birth: Birth;
  address: Address;
  role: Role;
  businessNumber: BusinessNumber;
}

interface LoginForm {
  email: Email;
  password: Password;
}

// response에 대한 type 정의
interface SogooResponse<T> {
  code: number;
  message: string;
  data: T;
}

interface LoginResponseData {
  userInfo: MemberInfo;
}

interface Store {
  storeId: StoreId;
  name: StoreName;
  description: StoreDescription;
  img: ImageURL;
}

interface ProductReviewProps {
  storeId: StoreId;
  foodId: FoodId;
}

interface GetSalesOverviewResponse {
  todaySales: number;
  subscribePeopleCnt: number;
  todayTradeCnt: number;
}

interface GetStoreDetailResponse {
  storeId: string;
  name: StoreName;
  description: StoreDescription;
  img: ImageURL;
}

interface GetStoreSubscribeResponse {
  subscribes: SubscribeInfo[];
}

interface Review {
  reviewId: number;
  email: Email;
  foodName: string;
  img: File | null;
  comment: string;
}

interface GetStoreReviewsResponse {
  reviews: {
    reviewId: number;
    email: Email;
    foodName: string;
    img: string;
    comment: string;
  }[];
}

interface GetFoodReviewsResponse {
  foodId: number;
  foodName: string;
  foodDescription: string;
  foodPrice: number;
  foodImg: string;
  reviews: {
    reviewId: number;
    email: Email;
    foodName: string;
    img: string;
    comment: string;
  }[];
}

interface GetReviewSummaryResponse {
  reviewCount: number;
  positiveCount: number;
  negativeCount: number;
  summary: string;
}

interface GetStoreFoodsResponse {
  foods: Food[];
}

interface GetStoreListResponse {
  stores: Store[] | [];
}

interface GetAllFoodsResponse {
  foods: {
    foodId: number;
    foodName: string;
  }[];
}

interface Chart {
  positiveCnt: number;
  negativeCnt: number;
  aiSummary: string;
}

interface GetScheduledProductResponse {
  foods: {
    foodId: number;
    foodName: string;
    foodCnt: number;
  }[];
}

interface GetProductReviewResponse {
  chart: {
    positiveCnt: number;
    negativeCnt: number;
    aiSummary: string;
  };
  reviews: {
    img: string;
    memberEmail: string;
    foodName: string;
    comment: string;
    emotion: boolean;
  }[];
}

interface GetTodaySalesResponse {
  products: {
    productName: string;
    salesSum: number;
    price: number;
    productCnt: number;
  }[];
}
type LoginResponse = LoginResponseData;
