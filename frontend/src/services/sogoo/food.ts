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
};
