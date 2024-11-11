import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createMemberSlice } from "./memberSlice";
import { createCartSlice } from "./cartSlice";
import { createStoreSlice } from "./storeSlice";
import { createSubscribeSlice } from "./subscribeSlice";

const useRootStore = create<RootState>()(
  persist(
    (...a) => ({
      ...createMemberSlice(...a),
      ...createCartSlice(...a),
      ...createStoreSlice(...a),
      ...createSubscribeSlice(...a),
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
        storeName: state.storeName,
        subscribe: state.subscribe,
        selectedId: state.selectedId,
        selectedStoreId: state.selectedStoreId,
        selectedSubscribeId: state.selectedSubscribeId,
        searchKeyword: state.searchKeyword,
      }),
    }
  )
);

export default useRootStore;
