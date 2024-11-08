import { useQuery } from "@tanstack/react-query";
import keys from "./keys";
import sogoo from "../services/sogoo";

/**
 * 이메일 중복 처리
 * @param email
 */
const useCheckEmail = (email: Email) => {
  const queryResponse = useQuery({
    queryKey: keys.checkEmail(email),
    queryFn: () => sogoo.checkEmail(email),
    enabled: false,
  });

  return queryResponse;
};

/**
 * 사업자 번호 인증
 * @param businessNumber
 */
const useCheckSeller = (businessNumber: BusinessNumber) => {
  const queryResponse = useQuery({
    queryKey: keys.checkSeller(businessNumber),
    queryFn: () => sogoo.checkSeller(businessNumber),
    enabled: false,
  });

  return queryResponse;
};

/**
 * 매장 목록 조회
 */
const useGetStoreList = () => {
  const { data } = useQuery({
    queryKey: keys.getStoreList(),
    queryFn: () => sogoo.getStoreList(),
  });

  const stores = data ? data.data : [];
  return stores;
};

/**
 * (구매자) 마이페이지 정보 조회
 */
const useGetBuyerMyPage = () => {
  const queryResponse = useQuery({
    queryKey: keys.getBuyerMypage(),
    queryFn: () => sogoo.getBuyerMyPage(),
    select: (response) => response.data,
  });

  return queryResponse;
};

/**
 * (판매자) 내 가게 가져오기
 */
const useGetMyStores = () => {
  const { data } = useQuery({
    queryKey: keys.getMyStores(),
    queryFn: () => sogoo.getMyStores(),
  });

  const stores = data ? data.data : [];
  return stores;
};

/**
 * 구독 상품에 넣기 위해 해당 가게의 반찬 목록 불러오기
 */
const useGetFoodListForSubscribe = (storeId: StoreId) => {
  const { data } = useQuery({
    queryKey: keys.getFoodListForSubscribe(storeId),
    queryFn: () => sogoo.getFoodListForSubscribe(storeId),
  });

  const foods = data ? data.data : [];
  return foods;
};

/**
 * 판매자 마이페이지(판매 현황)
 */
const useGetSalesOverview = (storeId: StoreId) => {
  const { data } = useQuery({
    queryKey: keys.getSalesOverview(storeId),
    queryFn: () => sogoo.getSalesOverview(storeId),
  });

  // const overview = data?.data;
};
/**
 * 판매자 마이페이지(월별 매출)
 */
const useGetMonthlySales = (storeId: StoreId) => {
  const { data } = useQuery({
    queryKey: keys.getMonthlySales(storeId),
    queryFn: () => sogoo.getMonthlySales(storeId),
  });
};
/**
 * 판매자 마이페이지(다음주 출고량)
 */
const useGetScheduledProduct = (storeId: StoreId) => {
  const { data } = useQuery({
    queryKey: keys.getScheduledProduct(storeId),
    queryFn: () => sogoo.getScheduledProduct(storeId),
  });
};
/**
 * 판매자 마이페이지(당일 매출 현황)
 */
const useGetTodaySales = (storeId: StoreId) => {
  const { data } = useQuery({
    queryKey: keys.getTodaySales(storeId),
    queryFn: () => sogoo.getTodaySales(storeId),
  });
};
/**
 * 판매자 마이페이지(전체 리뷰)
 */
const useGetReviewList = (storeId: StoreId) => {
  const { data } = useQuery({
    queryKey: keys.getReviewList(storeId),
    queryFn: () => sogoo.getReviewList(storeId),
  });
};
/**
 * 판매자 마이페이지(상품 리뷰)
 * @param storeId 가게 id
 * @param foodId 상품 id
 */
const useGetProductReview = (storeId: StoreId, foodId: FoodId) => {
  const { data } = useQuery({
    queryKey: keys.getProductReview(storeId, foodId),
    queryFn: () => sogoo.getProductReview(storeId, foodId),
  });
};

/**
 * 판매자 메뉴페이지 전체 메뉴 확인
 * @param storeId 가게 Id
 */
const useGetAllMenus = (storeId: StoreId) => {
  const { data } = useQuery({
    queryKey: keys.getAllMenus(storeId),
    queryFn: () => sogoo.getAllMenus(storeId),
  });

  const menus = data ? data.data : [];
  return menus;
};

/**
 * 구독 상품 상세 정보 확인
 * @param subscribeId 구독 상품 Id
 */
const useGetSubscribeDetail = (subscribeId: SubscribeId) => {
  const { data } = useQuery({
    queryKey: keys.getSubscribeDetail(subscribeId),
    queryFn: () => sogoo.getSubscribeDetail(subscribeId),
  });

  const itemDetailInfo = data ? data.data : [];
  return itemDetailInfo;
};

export {
  useCheckEmail,
  useCheckSeller,
  useGetStoreList,
  useGetBuyerMyPage,
  useGetMyStores,
  useGetFoodListForSubscribe,
  useGetMonthlySales,
  useGetSalesOverview,
  useGetScheduledProduct,
  useGetTodaySales,
  useGetReviewList,
  useGetProductReview,
  useGetAllMenus,
  useGetSubscribeDetail,
};
