import axios from "../../configs/axios";

export default {
  /**
   * 개별 상품 등록
   * @param addFoodForm 개별 상품 등록 폼 데이터
   * @param storeId 가게 Id
   */
  requestAddFood: async (addFoodForm: AddFoodForm, storeId: StoreId) => {
    return axios.post(`/food/${storeId}`, addFoodForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /**
   * 구독 상품에 등록하기 위해 개별 상품 목록 불러오기
   */
  getFoodListForSubscribe: async (storeId: StoreId) => {
    return axios.get(`/food/all/${storeId}`);
  },

  /**
   * 가게 상세페이지 - 가게 정보
   * @param storeId 가게 id
   */
  getStoreFoods: async (storeId: StoreId) => {
    return axios.get<GetStoreFoodsResponse>(`/food/dishes/${storeId}`);
  },
};
