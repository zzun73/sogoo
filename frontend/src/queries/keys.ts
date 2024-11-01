const keys = {
  all: ["sogoo"] as const,
  member: () => [keys.all, "member"],
  checkEmail: (email: Email) => [...keys.member(), "email", email],
  checkSeller: (businessNumber: BusinessNumber) => [
    ...keys.member(),
    "businessNumber",
    businessNumber,
  ],
};

export default keys;
