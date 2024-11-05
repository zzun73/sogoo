import axios from "../../configs/axios";

export default {
  /**
   * 구매자 마이페이지 정보
   */
  getBuyerMyPage: async () => {
    return axios.get("/member/buyer/");
  },

  /**
   * 구매자 리뷰 등록
   */
  registerReview: async () => {
    return axios.post("");
  },
};
