import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createMemberSlice } from "./memberSlice";

const useRootStore = create<RootState>()(
  persist(
    (...a) => ({
      ...createMemberSlice(...a),
    }),
    {
      name: "sogoo",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        memberInfo: state.memberInfo,
        isLogin: state.isLogin,
      }),
    }
  )
);

export default useRootStore;
