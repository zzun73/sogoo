const keys = {
  all: ["sogoo"] as const,
  member: () => [keys.all, "member"],
  store: () => [keys.all, "store"],
  food: () => [keys.all, "food"],
  subscribe: () => [keys.all, "subscribe"],
  review: () => [keys.all, "review"],
  checkEmail: (email: Email) => [...keys.member(), "email", email],
  checkSeller: (businessNumber: BusinessNumber) => [
    ...keys.member(),
    "businessNumber",
    businessNumber,
  ],
  getStoreList: (page: PageNumber) => [...keys.store(), "storeList", page],
  getBuyerMypage: () => [...keys.member(), "buyerMyPage"],
  getMyStores: () => [...keys.store(), "myStores"],
  getFoodListForSubscribe: (storeId: StoreId) => [
    ...keys.food(),
    "foodListForSubscribe",
    storeId,
  ],
  getMonthlySales: (storeId: StoreId) => [
    ...keys.store(),
    "monthlySales",
    storeId,
  ],
  getSalesOverview: (storeId: StoreId) => [
    ...keys.store(),
    "salesOverview",
    storeId,
  ],
  getScheduledProduct: (storeId: StoreId) => [
    ...keys.store(),
    "scheduledProduct",
    storeId,
  ],
  getTodaySales: (storeId: StoreId) => [...keys.store(), "todaySales", storeId],
  getReviewList: (storeId: StoreId) => [...keys.store(), "reviewList", storeId],
  getProductReview: (storeId: StoreId, foodId: FoodId) => [
    ...keys.store(),
    "productReview",
    storeId,
    foodId,
  ],
  getAllMenus: (storeId: StoreId) => [...keys.member(), "allMenus", storeId],
  getStoreDetail: (storeId: StoreId) => [
    ...keys.store(),
    "storeDetail",
    storeId,
  ],
  getStoreSubscribe: (storeId: StoreId) => [
    ...keys.subscribe(),
    "storeSubscribe",
    storeId,
  ],
  getStoreFoods: (storeId: StoreId) => [...keys.food(), "storeFoods", storeId],
  getStoreReviews: (storeId: StoreId, page: PageNumber) => [
    ...keys.review(),
    "storeReviews",
    storeId,
    page,
  ],
  getFoodReviews: (foodId: FoodId) => [...keys.review(), "foodReviews", foodId],
  getReviewSummary: (storeId: StoreId) => [
    ...keys.review(),
    "ReviewSummary",
    storeId,
  ],
  getSubscribeDetail: (subscribeId: SubscribeId) => [
    ...keys.subscribe(),
    "subscribeDetail",
    subscribeId,
  ],
  getStoreItems: (storeId: StoreId) => [
    ...keys.subscribe(),
    "storeItems",
    storeId,
  ],
  getSearchResult: (query: MenuName, page: PageNumber) => [
    ...keys.store(),
    "searchResult",
    query,
    page,
  ],
  getAllFoods: (storeId: StoreId) => [...keys.food(), "allFoods", storeId],
  getStoreCounts: () => [...keys.store(), "storeCounts"],
  getBuyerAllReviewCounts: (storeId: StoreId) => [
    ...keys.review(),
    "buyerAllReviewCounts",
    storeId,
  ],
  getBuyerSelectedReviewCounts: (foodId: FoodId) => [
    ...keys.review(),
    "buyerSelectedReviewCounts",
    foodId,
  ],
};

export default keys;
