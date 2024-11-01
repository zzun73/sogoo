import type { StateCreator } from "zustand";

export const createMemberSlice: StateCreator<RootState, [], [], MemberStore> = (
  set
) => ({
  memberInfo: null,
  accessToken: null,
  isLogin: false,
  setLogin: (memberInfo: Partial<MemberInfo>) => {
    set({
      memberInfo: {
        memberId: memberInfo.memberId!,
        name: memberInfo.name!,
        email: memberInfo.email!,
        phoneNumber: memberInfo.phoneNumber!,
        birth: memberInfo.birth!,
        address: memberInfo.address!,
        role: memberInfo.role!,
        uuid: memberInfo.uuid!,
      },
      isLogin: true,
    });
  },
  setAccessToken: (accessToken: string) => {
    set({ accessToken });
  },
  setLogout: () => {
    set({ memberInfo: null, accessToken: null, isLogin: false });
    localStorage.clear();
  },
  setIsLogin: (isLogin: boolean) => {
    set({ isLogin });
  },
});
