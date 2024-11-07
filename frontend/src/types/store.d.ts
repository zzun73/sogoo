interface RegisterStoreForm {
  name: string;
  address: string;
  description: string;
  img: File | null;
}

interface CartStore {
  storeId: number | null;
  subscribe: SelectedItem | null;
  foodList: SelectedItem[] | null;
  setStoreId: (id: StoreId) => void;
  setSubscribe: (subInfo: SelectedItem) => void;
  setFoodList: (foodList: SelectedItem[]) => void;
}

interface Item {
  id: number;
  name: string;
  price: number;
  beforePrice?: number;
}

interface SelectedItem extends Item {
  count: number;
  category: string;
}

type RootState = MemberStore & CartStore;
