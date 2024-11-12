import { useQuery } from "@tanstack/react-query";
import keys from "./keys";
import sogoo from "../services/sogoo";
import { AxiosError } from "axios";

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
 * @param page 페이지 번호
 */
const useGetStoreList = (page: PageNumber) => {
  const { data } = useQuery({
    queryKey: keys.getStoreList(page),
    queryFn: () => sogoo.getStoreList(page),
  });
  const stores = data ? data.data.stores : [];
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
  const salesoverview = data?.data || null;
  return salesoverview;
};
/**
 * 판매자 마이페이지(월별 매출)
 */
const useGetMonthlySales = (storeId: StoreId) => {
  const { data } = useQuery({
    queryKey: keys.getMonthlySales(storeId),
    queryFn: () => sogoo.getMonthlySales(storeId),
  });
  return data?.data || null;
};
/**
 * 판매자 마이페이지(다음주 출고량)
 */
const useGetScheduledProduct = (storeId: StoreId) => {
  const { data } = useQuery({
    queryKey: keys.getScheduledProduct(storeId),
    queryFn: () => sogoo.getScheduledProduct(storeId),
  });
  console.log(data?.data);
  return data?.data.foods || null;
};
/**
 * 판매자 마이페이지(당일 매출 현황)
 */
const useGetTodaySales = (storeId: StoreId) => {
  const { data } = useQuery({
    queryKey: keys.getTodaySales(storeId),
    queryFn: () => sogoo.getTodaySales(storeId),
  });

  const list = data?.data.products || null;
  return list;
};
/**
 * 판매자 마이페이지(전체 리뷰 요약)
 */
const useGetReviewList = (storeId: StoreId) => {
  const { data } = useQuery({
    queryKey: keys.getReviewList(storeId),
    queryFn: () => sogoo.getReviewList(storeId),
  });

  const reviewSummary = data?.data || null;
  return reviewSummary;
};
/**
 * 판매자 마이페이지(상품 리뷰)
 * @param storeId 가게 id
 * @param foodId 상품 id, -1일때 전체 리뷰
 */
const useGetProductReview = (storeId: StoreId, foodId: FoodId) => {
  const { data } = useQuery({
    queryKey: keys.getProductReview(storeId, foodId),
    queryFn: () => sogoo.getProductReview(storeId, foodId),
  });

  const reviews = data?.data || null;
  return reviews;
};

/**
 * 판매자 메뉴페이지 전체 메뉴 확인
 * @param storeId 가게 Id
 */
const useGetAllMenus = (storeId: StoreId | null) => {
  const { data } = useQuery({
    queryKey: storeId ? keys.getAllMenus(storeId) : ["no-store"],
    queryFn: () => sogoo.getAllMenus(storeId as StoreId),
    enabled: !!storeId, // storeId가 있을 때만 쿼리 실행
  });

  return data ? data.data : { subscribes: [], foods: [] };
};

/**
 * 반찬가게 상세페이지(반찬가게)
 * @param storeId 가게 id
 */
const useGetStoreDetail = (storeId: StoreId) => {
  const { data } = useQuery({
    queryKey: keys.getStoreDetail(storeId),
    queryFn: () => sogoo.getStoreDetail(storeId),
  });
  const info = data ? data.data : null;
  return info;
};

/**
 * 반찬가게 상세페이지(전체 메뉴)
 * @param storeId 가게 id
 */
const useGetStoreItems = (storeId: StoreId) => {
  const { data } = useQuery({
    queryKey: keys.getStoreItems(storeId),
    queryFn: () => sogoo.getStoreItems(storeId),
  });
  const storeItems = data ? data.data : null;
  return storeItems;
};

/**
 * 반찬가게 상세페이지(구독 상품)
 * @param storeId 가게 id
 */
const useGetStoreSubscribe = (storeId: StoreId) => {
  const { data, error, isError } = useQuery({
    queryKey: keys.getStoreSubscribe(storeId),
    queryFn: () => sogoo.getStoreSubscribe(storeId),
  });

  if (isError && error instanceof AxiosError) {
    return [];
  }

  const subscribes = data ? data.data.subscribes : null;
  return subscribes;
};

/**
 * 가게 상세페이지 - 반찬 개별 조회
 * @param storeId 가게 id
 */
const useGetStoreFoods = (storeId: StoreId) => {
  const { data } = useQuery({
    queryKey: keys.getStoreFoods(storeId),
    queryFn: () => sogoo.getStoreFoods(storeId),
  });

  const foods = data ? data.data.foods : [];
  return foods;
};
/**
 * 가게 상세페이지 - 리뷰 요약
 * @param storeId 가게 id
 */
const useGetReviewSummary = (storeId: StoreId) => {
  const { data } = useQuery({
    queryKey: keys.getReviewSummary(storeId),
    queryFn: () => sogoo.getReviewSummary(storeId),
  });
  console.log(data?.data);
  const reviewSummary = data ? data.data : null;
  return reviewSummary;
};
/**
 * 가게 상세페이지 - 전체 리뷰
 * @errorArray 에러시 빈배열
 * @param storeId 가게 id
 */
const useGetStoreReviews = (storeId: StoreId) => {
  const { data } = useQuery({
    queryKey: keys.getStoreReviews(storeId),
    queryFn: () => sogoo.getStoreReviews(storeId),
  });
  console.log("reviews", data?.data.reviews);
  const reviews = data ? data.data.reviews : null;
  return reviews;
};

/**
 * 가게 상세페이지 - 개별 반찬 리뷰
 * @param foodId 반찬 id
 */
const useGetFoodReviews = (foodId: FoodId) => {
  const { data, refetch } = useQuery({
    queryKey: keys.getFoodReviews(foodId),
    queryFn: () => sogoo.getFoodReviews(foodId),
  });
  const foodReviews = data?.data.reviews || null;
  return foodReviews;
};
/*
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
/**
 * 판매자 반찬 목록 불러오기
 * @param storeId 가게 id
 */
const useGetAllFoods = (storeId: StoreId) => {
  const { data } = useQuery({
    queryKey: keys.getAllFoods(storeId),
    queryFn: () => sogoo.getAllFoods(storeId),
  });
  console.log(data?.data.foods);
  const foods = data?.data.foods || null;
  return foods;
};

/**
 * 검색 결과 불러오기
 * @param query 검색할 메뉴
 * @param page 불러올 페이지
 */
const useGetSearchResult = (query: MenuName, page: PageNumber) => {
  const { data } = useQuery({
    queryKey: keys.getSearchResult(query, page),
    queryFn: () => sogoo.getSearchResult(query, page),
  });

  const searchResult = data ? data.data : [];
  return searchResult;
};

/**
 * Pagination 위해 가게 총 개수 불러오기
 */
const useGetStoreCounts = () => {
  const { data } = useQuery({
    queryKey: keys.getStoreCounts(),
    queryFn: () => sogoo.getStoreCounts(),
  });

  const storeCount = data ? data.data : null;
  return storeCount;
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
  useGetStoreDetail,
  useGetStoreSubscribe,
  useGetStoreFoods,
  useGetStoreReviews,
  useGetFoodReviews,
  useGetReviewSummary,
  useGetSubscribeDetail,
  useGetStoreItems,
  useGetSearchResult,
  useGetAllFoods,
  useGetStoreCounts,
};
