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
};
