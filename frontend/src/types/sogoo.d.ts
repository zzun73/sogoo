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

interface GetStoreListResponseData {
  stores: Store[] | [];
}
interface GetSalesOverviewResponseData {}

interface GetStoreDetailResponse {
  storeId: string;
  name: StoreName;
  description: StoreDescription;
  img: ImageURL;
}

interface GetStoreSubscribeResponse {
  subscribes: SubscribeInfo;
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
    img: File | null;
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
    img: File | null;
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

type LoginResponse = LoginResponseData;
type GetStoreListResponse = SogooResponse<GetStoreListResponseData>;
type GetSalesOverviewResponse = SogooResponse<GetSalesOverviewResponseData>;
// type GetStoreFoodsResponse = SogooResponse<GetStoreFoodsResponseData>
