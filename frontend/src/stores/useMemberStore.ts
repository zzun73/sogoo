import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useMemberStore = create<MemberStore>()(
  persist(
    (set) => ({
      memberInfo: null,
      isLogin: false,

      setLogin: (memberInfo: Partial<MemberInfo>) => {
        return set({
          memberInfo: {
            memberId: memberInfo.memberId!,
            name: memberInfo.name!,
            email: memberInfo.email!,
            phoneNumber: memberInfo.phoneNumber!,
            birth: memberInfo.birth!,
            address: memberInfo.address!,
            role: memberInfo.role!,
          },
          isLogin: true,
        });
      },
      setLogout: () => {
        set({ memberInfo: null, isLogin: false });
        localStorage.clear();
      },
      setIsLogin: (isLogin: boolean) => {
        return set({ isLogin });
      },
    }),
    {
      name: "memberStore",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        memberInfo: state.memberInfo,
        isLogin: state.isLogin,
      }),
    }
  )
);
