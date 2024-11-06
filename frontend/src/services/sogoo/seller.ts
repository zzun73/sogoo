import axios from "../../configs/axios";

export default {
  /**
   * 판매자 마이페이지(판매 현황)
   */
  getSalesOverview: async (storeId: StoreId) => {
    return axios.get(`/api/member/seller/sales-status/${storeId}`);
  },
  /**
   * 판매자 마이페이지(월별 매출)
   * @param storeId 가게 아이디
   */
  getMonthlySales: async (storeId: StoreId) => {
    return axios.get(`/api/member/seller/monthly-sales/${storeId}`);
  },
  /**
   * 판매자 마이페이지(다음주 출고량)
   * @param storeId 가게 아이디
   */
  getScheduledProduct: async (storeId: StoreId) => {
    return axios.get(`/api/member/seller/next-week-sell/${storeId}`);
  },
  /**
   * 판매자 마이페이지(당일 매출 현황)
   * @param storeId 가게 아이디
   */
  getTodaySales: async (storeId: StoreId) => {
    return axios.get(`/api/member/seller/today-sell/${storeId}`);
  },
  /**
   * 판매자 마이페이지(전체 리뷰)
   * @param storeId 가게 아이디
   */
  getReviewList: async (storeId: StoreId) => {
    return axios.get(`/api/member/seller/store-review/${storeId}`);
  },
  /**
   * 판매자 마이페이지(상품 리뷰)
   * @param storeId 가게 id
   * @param foodId 상품 id
   */
  getProductReview: async (storeId: StoreId, foodId: FoodId) => {
    return axios.get(`/api/member/seller/detail-review/${storeId}/${foodId}`);
  },
};
