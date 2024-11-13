import axios from "../../configs/axios";

export default {
  /**
   * 가게 상세페이지 - 전체 리뷰
   * @param storeId 가게 id
   * @param page 페이지 번호
   */
  getStoreReviews: (storeId: StoreId, page: PageNumber) => {
    return axios.get<GetStoreReviewsResponse>(
      `/review/buyer/${storeId}?page=${page}`
    );
  },

  /**
   * 가게 상세페이지 - 개별 반찬 리뷰
   * @param foodId 반찬 id
   * @param page 페이지 번호
   */
  getFoodReviews: (foodId: FoodId, page: PageNumber) => {
    return axios.get<GetStoreReviewsResponse>(
      `/review/buyer/food/${foodId}?page=${page}`
    );
  },
  /**
   * 가게 상세페이지 - 리뷰 요약
   * @param storeId 가게 id
   */
  getReviewSummary: (storeId: StoreId) => {
    return axios.get<GetReviewSummaryResponse>(`/review/buyer/info/${storeId}`);
  },

  /**
   * Pagination 위해 가게 전체 리뷰 개수 불러오기
   * @param storeId 가게 id
   */
  getBuyerAllReviewCounts: async (storeId: StoreId) => {
    return axios.get<BuyerAllReviewCountResult>(
      `/review/buyer/count/${storeId}`
    );
  },

  /**
   * Pagination 위해 반찬별 리뷰 개수 불러오기
   * @param foodId 반찬 id
   */
  getBuyerSelectedReviewCounts: async (foodId: FoodId) => {
    return axios.get<BuyerSelectedReviewCountResult>(
      `/review/buyer/food/count/${foodId}`
    );
  },
};
