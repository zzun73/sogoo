import type { StateCreator } from "zustand";

export const createCartSlice: StateCreator<RootState, [], [], CartStore> = (
  set
) => ({
  storeId: null,
  subscribe: null,
  foodList: null,

  // storeId 설정
  setStoreId: (id: StoreId | null) => {
    set({ storeId: id });
  },

  // 구독 정보 설정
  setSubscribe: (subInfo) => {
    set((state) => {
      const newState = { ...state, subscribe: subInfo };

      // subscribe와 foodList가 동시에 null인 경우 storeId를 null로 설정
      if (newState.subscribe === null && (state.foodList?.length ?? 0) === 0) {
        newState.storeId = null;
      }
      return newState;
    });
  },

  // 장바구니 목록 설정
  setFoodList: (foodList) => {
    set((state) => {
      const updatedFoodList = [...(state.foodList ?? [])];

      foodList.forEach((newItem) => {
        const existingItemIndex = updatedFoodList.findIndex(
          (item) => item.id === newItem.id && item.category === newItem.category
        );

        if (existingItemIndex !== -1) {
          updatedFoodList[existingItemIndex].count += newItem.count;
        } else {
          updatedFoodList.push(newItem);
        }
      });

      return { foodList: updatedFoodList };
    });
  },

  // 구매 완료한 제품 삭제
  deleteSelectedList: (selectedIds: number[]) => {
    set((state) => {
      const updatedFoodList =
        state.foodList?.filter((item) => !selectedIds.includes(item.id)) ?? [];

      const newState = { ...state, foodList: updatedFoodList };

      // subscribe와 foodList가 동시에 null인 경우 storeId를 null로 설정
      if (state.subscribe === null && updatedFoodList.length === 0) {
        newState.storeId = null;
      }

      return newState;
    });
  },

  // 개별 상품 삭제
  deleteSelectedItem: (foodId: FoodId) => {
    set((state) => {
      const updatedFoodList =
        state.foodList?.filter((item) => item.id !== foodId) ?? [];

      const newState = {
        ...state,
        foodList: updatedFoodList.length ? updatedFoodList : null,
      };

      // subscribe와 foodList가 동시에 null인 경우 storeId를 null로 설정
      if (updatedFoodList.length === 0 && state.subscribe === null) {
        newState.storeId = null;
      }

      return newState;
    });
  },

  // 수량 변경
  changeFoodCount: (foodId: FoodId, amount: number) => {
    set((state) => {
      const updatedFoodList =
        state.foodList?.map((item) =>
          item.id === foodId ? { ...item, count: item.count + amount } : item
        ) ?? [];

      return { foodList: updatedFoodList };
    });
  },
});
