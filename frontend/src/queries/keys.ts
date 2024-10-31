const keys = {
  all: ["sogoo"] as const,
  member: () => [keys.all, "member"],
  store: () => [keys.all, "store"],
  checkEmail: (email: Email) => [...keys.member(), "email", email],
  getStoreList: () => [...keys.store(), "storeList"],
};

export default keys;
