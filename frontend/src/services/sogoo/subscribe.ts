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

  /**
   * 구독 상품 상세 정보 확인
   * @param subscribeId 구독 상품 Id
   */
  getSubscribeDetail: async (subscribeId: SubscribeId) => {
    return axios.get(`subscribe/detail/${subscribeId}`);
  },
};
