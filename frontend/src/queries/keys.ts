const keys = {
  all: ["sogoo"] as const,
  member: () => [keys.all, "member"],
  store: () => [keys.all, "store"],
  checkEmail: (email: Email) => [...keys.member(), "email", email],
  checkSeller: (businessNumber: BusinessNumber) => [
    ...keys.member(),
    "businessNumber",
    businessNumber,
  ],
  getStoreList: () => [...keys.store(), "storeList"],
  getBuyerMypage: () => [...keys.member(), "buyerMypage"],
  getMyStores: () => [...keys.store(), "myStores"],
};

export default keys;
