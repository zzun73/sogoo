import { useState } from "react";
import { useGetSearchResult } from "../queries/queries";
import useRootStore from "../stores";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const SearchResultPage: React.FC = () => {
  const navigate = useNavigate();

  const searchKeyword = useRootStore().searchKeyword;
  const [pageNumber] = useState<number>(1);

  const result = useGetSearchResult(
    searchKeyword ?? "",
    pageNumber
  ) as SearchResult;

  console.log(result);

  const goToBack = () => {
    navigate(-1);
  };

  const goToStore = (storeId: number) => {
    navigate(`/store/${storeId}`);
  };

  if (!result) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">"{searchKeyword}" 를 판매하는 매장</h1>
      <div className="w-full flex justify-end mb-10">
        <Button variant="contained" onClick={goToBack}>
          뒤로가기
        </Button>
      </div>
      {result?.stores?.map((store) => (
        <div
          key={store.storeId}
          className="w-full flex border-2 border-slate-300 rounded-lg mb-5 cursor-pointer"
          onClick={() => goToStore(store.storeId)}
        >
          <img
            className="w-1/5"
            src={store.storeImg}
            alt={`${store.storeName} 이미지`}
          />
          <div className="w-4/5 flex flex-col justify-evenly">
            <h2 className="text-xl font-bold">{store.storeName}</h2>
            <p>주소: {store.storeAddress}</p>
            <p>{store.storeDescription}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResultPage;
