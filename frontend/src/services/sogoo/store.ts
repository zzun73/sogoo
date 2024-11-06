import axios from "../../configs/axios";

export default {
  /**
   * 매장 목록 조회
   */
  getStoreList: async () => {
    return axios.get("/store/");
  },

  /**
   * (판매자) 내 가게 불러오기
   */
  getMyStores: async () => {
    return axios.get("/store/mystore");
  },

  /**
   * (판매자) 가게 등록
   * @param registerStoreForm
   */
  registerMyStore: async (registerStoreForm: RegisterStoreForm) => {
    return axios.post("/store/add", registerStoreForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  /**
   * 매장 상세 메뉴 조회
   * @param storeId 가게 id
   */
  getStoreMenu: async (storeId: StoreId) => {
    return axios.get(`/subscribe/all/${storeId}`);
  },
};
