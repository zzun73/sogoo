import { useGetSearchResult } from "../../../../queries/queries";
import useRootStore from "../../../../stores";
import StoreCard from "../StoreCard";

const SearchResult: React.FC = () => {
  const searchKeyword = useRootStore().searchKeyword;

  const results = useGetSearchResult(searchKeyword);
  const searchedStores = results && "stores" in results ? results.stores : [];

  console.log(searchedStores);

  const storeData = searchedStores?.map((store) => ({
    storeId: store.storeId,
    name: store.storeName,
    description: store.storeDescription,
    img: store.storeImg,
  }));

  console.log(storeData);

  if (!storeData || storeData.length === 0) {
    return (
      <div className="w-full flex justify-center">
        <h1 className="text-xl font-bold">검색 결과가 존재하지 않습니다.</h1>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
        {storeData?.map((store) => (
          <StoreCard store={store} key={`store-${store.storeId}`} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
