const keys = {
  all: ["sogoo"] as const,
  member: () => [keys.all, "member"],
  store: () => [keys.all, "store"],
  food: () => [keys.all, "food"],
  subscribe: () => [keys.all, "subscribe"],
<<<<<<< HEAD
  review: () => [keys.all, "review"],
=======
>>>>>>> 1e4ea4cccee3b030b3c5fbb028146241655bd0af
  checkEmail: (email: Email) => [...keys.member(), "email", email],
  checkSeller: (businessNumber: BusinessNumber) => [
    ...keys.member(),
    "businessNumber",
    businessNumber,
  ],
  getStoreList: () => [...keys.store(), "storeList"],
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
  getStoreReviews: (storeId: StoreId) => [
    ...keys.review(),
    "storeReviews",
    storeId,
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
};

export default keys;
