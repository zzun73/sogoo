import axios from "../../configs/axios";
import { useGetBuyerAllReviewCounts } from "../../queries/queries";

export default {
  /**
   * 가게 상세페이지 - 전체 리뷰
   * @param storeId 가게 id
   */
  getStoreReviews: (storeId: StoreId) => {
    return axios.get<GetStoreReviewsResponse>(
      `/review/buyer/${storeId}?page=${storeId}`
    );
  },

  /**
   * 가게 상세페이지 - 개별 반찬 리뷰
   * @param foodId 반찬 id
   */
  getFoodReviews: (foodId: FoodId) => {
    return axios.get<GetStoreReviewsResponse>(`/review/buyer/food/${foodId}`);
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
      `/store/buyer/count/${storeId}`
    );
  },
};
