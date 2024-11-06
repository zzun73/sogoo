import type { StateCreator } from "zustand";

export const createCartSlice: StateCreator<RootState, [], [], CartStore> = (
  set
) => ({
  storeId: null,
  subscribe: null,
  foodList: null,
  setStoreId: (id: StoreId) => {
    set((state) => ({
      ...state,
      storeId: id,
    }));
  },
  setSubscribe: (subInfo) => {
    set((state) => ({
      ...state,
      subscribe: subInfo,
    }));
  },
  setFoodList: (foodList) => {
    set((state) => {
      const updatedFoodList = [...((state.foodList ?? []) as SelectedItem[])];

      foodList.forEach((newItem) => {
        const existingItemIndex = updatedFoodList.findIndex(
          (item) => item.id === newItem.id && item.category === newItem.category
        );

        if (existingItemIndex !== -1) {
          updatedFoodList[existingItemIndex].quantity += newItem.quantity;
        } else {
          updatedFoodList.push(newItem);
        }
      });
      return { ...state, foodList: updatedFoodList };
    });
  },
});
