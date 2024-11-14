import type { StateCreator } from "zustand";

const INITIAL_STATE = {
  accessToken: null,
  memberInfo: null,
  isLogin: false,
  foodList: null,
  storeId: null,
  storeName: "",
  subscribe: null,
  selectedId: null,
  selectedStoreId: null,
  selectedSubscribeId: null,
  searchKeyword: "",
};

export const createMemberSlice: StateCreator<RootState, [], [], MemberStore> = (
  set
) => ({
  memberInfo: null,
  accessToken: null,
  isLogin: false,
  selectedId: null,
  setSelectedId: (selectedId: number[] | null) => {
    set({ selectedId });
  },
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
    set(INITIAL_STATE);
  },
  setIsLogin: (isLogin: boolean) => {
    set({ isLogin });
  },
});
