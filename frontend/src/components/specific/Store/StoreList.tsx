import { useEffect, useState } from "react";
import StoreCard from "./StoreCard";
import { useGetRecommendedStore, useGetStoreCounts, useGetStoreList } from "../../../queries/queries";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useRootStore from "../../../stores";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";
import SearchResult from "./Detail/SearchResult";
import RecommendStoreModal from "./RecommendedStoreModal";

const StoreList: React.FC = () => {
  const [nowStorePage, setNowStorePage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { searchKeyword, setSearchKeyword } = useRootStore();

  const stores = useGetStoreList(nowStorePage);

  const storeCount = useGetStoreCounts()?.storeCount;

  const totalPageCount = storeCount ? Math.ceil(storeCount / 20) : 1;

  const [searchInfo, setSearchInfo] = useState<string>(searchKeyword);

  const { data: recommendedStores, isLoading, isFetched, error } = useGetRecommendedStore();

  useEffect(() => {
    if (isFetched && !error && recommendedStores) {
      setIsModalOpen(true);
    }
  }, [isFetched, error, recommendedStores]);

  const handleSearch = () => {
    if (searchInfo === "") {
      toast.error("검색어를 입력해주세요.");
      return;
    }

    setSearchKeyword(searchInfo);
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

  const handleKeywordReset = () => {
    setSearchKeyword("");
    setSearchInfo("");
  };

  if (!stores) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <p className="text-2xl font-bold">등록된 가게가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <RecommendStoreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recommendedStores={recommendedStores}
        error={error}
        isLoading={isLoading}
      />
      <div className="w-11/12 flex justify-between items-center mb-10">
        <div className="w-5/6 flex justify-center items-center">
          <TextField
            id="searchBar"
            variant="outlined"
            placeholder="검색 내용을 입력하세요"
            value={searchInfo}
            onChange={(e) => setSearchInfo(e.target.value)}
            onKeyDown={handleSearchKeydown}
            sx={{
              width: 10 / 12,
              "& .MuiOutlinedInput-root": { borderRadius: "50px 0 0 50px" },
            }}
          />
          <Button
            variant="contained"
            sx={{
              width: 2 / 12,
              height: "56px",
              borderRadius: "0 50px 50px 0",
              fontSize: "1rem",
            }}
            onClick={handleSearch}
          >
            검색
          </Button>
        </div>
        <Button
          variant="outlined"
          sx={{
            width: 1 / 8,
            height: "56px",
            borderRadius: "50px",
            fontSize: "1rem",
          }}
          onClick={handleKeywordReset}
        >
          초기화
        </Button>
      </div>

      {searchKeyword === "" ? (
        <div className="w-full flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
            {stores?.map((store) => (
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
      ) : (
        <SearchResult />
      )}
    </div>
  );
};

export default StoreList;
