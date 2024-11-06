import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createMemberSlice } from "./memberSlice";
import { createCartSlice } from "./cartSlice";
import { subscribe } from "diagnostics_channel";

const useRootStore = create<RootState>()(
  persist(
    (...a) => ({
      ...createMemberSlice(...a),
      ...createCartSlice(...a),
    }),
    {
      name: "sogoo",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        memberInfo: state.memberInfo,
        isLogin: state.isLogin,
        foodList: state.foodList,
        storeId: state.storeId,
        subscribe: state.subscribe,
      }),
    }
  )
);

export default useRootStore;
