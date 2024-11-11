import type { StateCreator } from "zustand";

export const createSubscribeSlice: StateCreator<
  RootState,
  [],
  [],
  SubscribeStore
> = (set) => ({
  selectedSubscribeId: null,
  setSelectedSubscribeId: (selectedSubscribeId: SelectedSubscribeId) => {
    set({ selectedSubscribeId });
  },
});
