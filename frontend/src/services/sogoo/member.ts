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
  registerReview: async (orderListId: number, data: FormData) => {
    return axios.post(`review/orders/${orderListId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /**
   * 판매자 메뉴페이지 전체 메뉴 불러오기
   */
  getAllMenus: async (storeId: StoreId) => {
    return axios.get(`member/seller/all-product/${storeId}`);
  },
};
