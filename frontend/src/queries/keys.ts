const keys = {
  all: ["sogoo"] as const,
  member: () => [keys.all, "member"],
  checkEmail: (email: Email) => [...keys.member(), "email", email],
};

export default keys;
