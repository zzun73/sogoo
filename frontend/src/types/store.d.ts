type SelectedStoreId = number;

interface RegisterStoreForm {
  name: string;
  address: string;
  description: string;
  img: File | null;
}

interface CartStore {
  storeId: number | null;
  storeName: string;
  subscribe: SelectedItem | null;
  foodList: SelectedItem[] | null;
  setStoreId: (id: StoreId | null) => void;
  setStoreName: (name: string) => void;
  setSubscribe: (subInfo: SelectedItem | null) => void;
  setFoodList: (foodList: SelectedItem[]) => void;
  deleteSelectedList: (selectedIds: number[]) => void;
  changeFoodCount: (foodId: FoodId, amount: number) => void;
}

interface Item {
  id: number;
  name: string;
  price: number;
  beforePrice?: number;
  image?: string;
}

interface SelectedItem extends Item {
  count: number;
  category: string;
}

interface StoreStore {
  selectedStoreId: number | null;
  setSelectedStoreId: (selectedStoreId: SelectedStoreId) => void;
}

type RootState = MemberStore & CartStore & StoreStore;
