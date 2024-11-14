type SelectedStoreId = number;

type MenuName = string;
type PageNumber = number;

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
  searchKeyword: string;
  setSearchKeyword: (searchKeyword: MenuName) => void;
}

interface SearchResultFood {
  foodName: string;
  foodPrice: number;
  foodDescription: string;
}

interface SearchResultStore {
  storeId: number;
  storeName: string;
  storeAddress: string;
  storeDescription: string;
  storeImg: string;
  foods: SearchResultFood[];
}

interface SearchResult {
  stores?: SearchResultStore[];
}

interface StoreCountResult {
  storeCount?: number | null;
}

type RootState = MemberStore & CartStore & StoreStore & SubscribeStore;
