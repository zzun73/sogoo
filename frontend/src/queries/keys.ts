const keys = {
  all: ["sogoo"] as const,
  member: () => [keys.all, "member"],
  store: () => [keys.all, "store"],
  food: () => [keys.all, "food"],
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
};

export default keys;
