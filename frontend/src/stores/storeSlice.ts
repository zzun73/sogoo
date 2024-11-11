import type { StateCreator } from "zustand";

export const createStoreSlice: StateCreator<RootState, [], [], StoreStore> = (
  set
) => ({
  selectedStoreId: null,
  setSelectedStoreId: (selectedStoreId: SelectedStoreId) => {
    set({ selectedStoreId });
  },

  searchKeyword: null,
  setSearchKeyword: (searchKeyword: MenuName) => {
    set({ searchKeyword });
  },
});
