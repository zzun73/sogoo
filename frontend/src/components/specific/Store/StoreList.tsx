import StoreCard from "./StoreCard";
import { useGetStoreList } from "../../../queries/queries";

const StoreList = () => {
  const stores = useGetStoreList();

  if (!stores) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <p>등록된 가게가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
      {stores.map((store) => (
        <StoreCard store={store} key={`store-${store.storeId}`} />
      ))}
    </div>
  );
};

export default StoreList;
