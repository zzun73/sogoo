import axios from "../../configs/axios";

export default {
  /**
   * 구독 상품 등록
   * @param addSubscribeForm 구독 상품 등록 폼 데이터
   * @param storeId 가게 Id
   */
  requestAddSubscribe: async (
    addSubscribeForm: AddSubscribeForm,
    storeId: StoreId
  ) => {
    return axios.post(`/subscribe/store/${storeId}`, addSubscribeForm);
  },
};
