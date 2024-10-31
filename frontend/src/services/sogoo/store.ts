import axios from "../../configs/axios";

export default {
  /**
   * 매장 목록 조회
   */
  getStoreList: async () => {
    return axios.get("/api/store/");
  },
};
