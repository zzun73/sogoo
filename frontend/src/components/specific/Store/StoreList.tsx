import { useState } from "react";
import StoreCard from "./StoreCard";
import { useGetStoreList } from "../../../queries/queries";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useRootStore from "../../../stores";
import { useNavigate } from "react-router-dom";

const StoreList: React.FC = () => {
  const navigate = useNavigate();
  const stores = useGetStoreList();

  const { searchKeyword, setSearchKeyword } = useRootStore();

  console.log(searchKeyword);

  const [searchInfo, setSearchInfo] = useState<string>("");

  const handleSearch = () => {
    setSearchKeyword(searchInfo);
    navigate("/store/search/result");
  };

  if (!stores) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <p>등록된 가게가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-5/6 flex justify-evenly items-center mb-10">
        <TextField
          id="searchBar"
          variant="outlined"
          placeholder="검색 내용을 입력하세요"
          value={searchInfo}
          onChange={(e) => setSearchInfo(e.target.value)}
          sx={{ width: 10 / 12 }}
        />
        <Button
          variant="contained"
          sx={{ width: 1 / 12, height: "50px" }}
          onClick={handleSearch}
        >
          검색
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
        {stores.map((store) => (
          <StoreCard store={store} key={`store-${store.storeId}`} />
        ))}
      </div>
    </div>
  );
};

export default StoreList;
