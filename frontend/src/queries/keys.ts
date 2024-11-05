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
  getFoodListForSubscribe: () => [...keys.food(), "foodListForSubscribe"],
};

export default keys;
