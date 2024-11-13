import Box from "../../common/Box";
import FoodSelect from "./Review/FoodSelect";
import { useGetProductReview } from "../../../queries/queries";
import useRootStore from "../../../stores";
import ReviewCard from "./Review/ReviewCard";
import ReviewSummary from "./Review/ReviewSummary";
import { useState, useEffect } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const ReviewList = () => {
  const { selectedStoreId } = useRootStore();
  const [selectedFoodId, setSelectedelectedFoodId] = useState(-1);
  const [nowPage, setNowPage] = useState<number>(1);
  const selectedReviews = useGetProductReview(
    selectedStoreId!,
    selectedFoodId,
    nowPage
  );

  const reviewCount = 40; // 차후 리뷰 개수 반환해주는 api 완성되면 수정 예정
  const pageCount = reviewCount ? Math.ceil(reviewCount / 20) : 1;

  const handleClick = (event: SelectChangeEvent) => {
    setSelectedelectedFoodId(Number(event.target.value));
    console.log(Number(event.target.value));
  };

  useEffect(() => {
    setSelectedelectedFoodId(-1);
  }, [selectedStoreId]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setNowPage(page);
  };

  if (!selectedReviews) {
    return (
      <div className="mx-[200px]">
        <h2 className="text-2xl font-shilla text-center my-2">후기 목록</h2>
        <Box className="min-h-[500px] flex justify-center items-center">
          <p className="text-lg font-bold text-center">
            작성된 후기가 없습니다.
          </p>
        </Box>
      </div>
    );
  }

  const { chart, reviews } = selectedReviews;
  return (
    <div className="mx-[200px] min-w-[1100px]">
      <h2 className="text-3xl font-shilla text-center mb-3">후기 목록</h2>
      <Box className="w-full min-h-[400px] flex flex-col justify-center items-center mb-10">
        <FoodSelect
          storeId={selectedStoreId!}
          foodId={selectedFoodId}
          handleClick={handleClick}
        />
        <ReviewSummary summary={chart} />
        <div className="w-full flex flex-col justify-center items-center">
          {reviews.map((review) => (
            <ReviewCard review={review} />
          ))}
        </div>
        <Stack spacing={2} className="mt-10">
          <Pagination
            count={pageCount}
            page={nowPage}
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
      </Box>
    </div>
  );
};

export default ReviewList;
