import axios from "../../configs/axios";

export default {
  /**
   * 회원가입
   * @param signUpForm 회원가입 폼 데이터
   */
  signup: async (signUpForm: SignUpForm) => {
    return axios.post("/member/sign-up", signUpForm);
  },

  /**
   * 로그인
   * @param loginForm 로그인 폼 데이터
   */
  login: async (loginForm: LoginForm) => {
    return axios.post<LoginResponse>("/member/login", loginForm);
  },

  /**
   * 로그아웃
   */
  logout: async () => {
    return axios.post("/member/logout");
  },

  /**
   * 이메일 유효성 체크
   */
  checkEmail: async (email: Email) => {
    return axios.post("/member/email-check", { email });
  },

  /**
   * 사업자 인증
   */
  checkSeller: async (businessNumber: BusinessNumber) => {
    return axios.post("/member/seller-check", {
      businessNumber: businessNumber,
    });
  },

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

  /**
   * 판매자 마이페이지(판매 현황)
   */
  getSalesOverview: async (storeId: StoreId) => {
    return axios.get<GetSalesOverviewResponse>(
      `/member/seller/sales-status/${storeId}`
    );
  },

  /**
   * 판매자 마이페이지(월별 매출)
   * @param storeId 가게 아이디
   */
  getMonthlySales: async (storeId: StoreId) => {
    return axios.get(`/member/seller/monthly-sales/${storeId}`);
  },

  /**
   * 판매자 마이페이지(다음주 출고량)
   * @param storeId 가게 아이디
   */
  getScheduledProduct: async (storeId: StoreId) => {
    return axios.get(`/member/seller/next-week-sell/${storeId}`);
  },

  /**
   * 판매자 마이페이지(당일 매출 현황)
   * @param storeId 가게 아이디
   */
  getTodaySales: async (storeId: StoreId) => {
    return axios.get(`/member/seller/today-sell/${storeId}`);
  },

  /**
   * 판매자 마이페이지(전체 리뷰)
   * @param storeId 가게 아이디
   */
  getReviewList: async (storeId: StoreId) => {
    return axios.get(`/member/seller/store-review/${storeId}`);
  },

  /**
   * 판매자 마이페이지(상품 리뷰)
   * @param storeId 가게 id
   * @param foodId 상품 id
   */
  getProductReview: async (storeId: StoreId, foodId: FoodId) => {
    return axios.get(`/member/seller/detail-review/${storeId}/${foodId}`);
  },
};
