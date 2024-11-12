import { useState } from "react";
import StoreCard from "./StoreCard";
import { useGetStoreCounts, useGetStoreList } from "../../../queries/queries";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useRootStore from "../../../stores";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";

const StoreList: React.FC = () => {
  const navigate = useNavigate();
  const [nowStorePage, setNowStorePage] = useState<number>(1);

  const stores = useGetStoreList(nowStorePage);

  const storeCount = useGetStoreCounts()?.storeCount;

  const totalPageCount = storeCount ? Math.ceil(storeCount / 20) : 1;

  const { searchKeyword, setSearchKeyword } = useRootStore();

  console.log(searchKeyword);

  const [searchInfo, setSearchInfo] = useState<string>("");

  const handleSearch = () => {
    setSearchKeyword(searchInfo);

    if (searchInfo === "") {
      toast.error("검색어를 입력해주세요.");
      return;
    }

    navigate("/store/search/result");
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setNowStorePage(page);
  };

  const handleSearchKeydown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
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
      <div className="w-full flex justify-center items-center mb-10">
        <TextField
          id="searchBar"
          variant="outlined"
          placeholder="검색 내용을 입력하세요"
          value={searchInfo}
          onChange={(e) => setSearchInfo(e.target.value)}
          onKeyDown={handleSearchKeydown}
          sx={{
            width: 5 / 12,
            "& .MuiOutlinedInput-root": { borderRadius: "50px 0 0 50px" },
          }}
        />
        <Button
          variant="contained"
          sx={{
            width: 1 / 12,
            height: "56px",
            borderRadius: "0 50px 50px 0",
            fontSize: "1rem",
          }}
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

      <Stack spacing={2} className="mt-10">
        <Pagination
          count={totalPageCount}
          page={nowStorePage}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          sx={{
            "& .MuiPaginationItem-root": {
              padding: "10px 20px", // 버튼 크기 조정
              margin: "0 4px", // 버튼 간격 조정
              fontSize: "1rem", // 텍스트 크기 조정
            },
          }}
        />
      </Stack>
    </div>
  );
};

export default StoreList;
