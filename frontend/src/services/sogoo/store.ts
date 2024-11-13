import axios from "../../configs/axios";

export default {
  /**
   * 매장 목록 조회
   * @param page 페이지 번호
   */
  getStoreList: async (page: PageNumber) => {
    return axios.get<GetStoreListResponse>(`/store?page=${page}`);
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

  /**
   * 가게 상세페이지 - 가게 정보
   * @param storeId 가게 id
   */
  getStoreDetail: async (storeId: StoreId) => {
    return axios.get<GetStoreDetailResponse>(`/store/${storeId}`);
  },

  /**
   * 검색 결과 불러오기
   * @param query 검색할 메뉴
   */
  getSearchResult: async (query: MenuName) => {
    return axios.get<SearchResult>(`/elastic/search?query=${query}`);
  },

  /**
   * Pagination 위해 가게 개수 불러오기
   */
  getStoreCounts: async () => {
    return axios.get<StoreCountResult>(`/store/count`);
  },
};
