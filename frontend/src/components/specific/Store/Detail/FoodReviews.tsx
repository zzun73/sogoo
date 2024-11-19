import FoodSelect from "./FoodSelect";
import ReviewCard from "./ReviewCard";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetFoodReviews,
  useGetStoreReviews,
  useGetBuyerAllReviewCounts,
  useGetBuyerSelectedReviewCounts,
} from "../../../../queries/queries";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const FoodReviews = () => {
  const { id } = useParams();
  const [selectedFoodId, setSelectedFoodId] = useState(-1);
  const [nowAllReviewPage, setNowAllReviewPage] = useState<number>(1);
  const [nowSelectedReviewPage, setNowSelectedReviewPage] = useState<number>(1);
  const totalReviews = useGetStoreReviews(Number(id), nowAllReviewPage);
  const foodReviews = useGetFoodReviews(selectedFoodId, nowSelectedReviewPage);

  const allReviewCount = useGetBuyerAllReviewCounts(Number(id))?.reviewCount;
  const selectedReviewCount =
    useGetBuyerSelectedReviewCounts(selectedFoodId)?.reviewCount;
  const totalPageCount = allReviewCount ? Math.ceil(allReviewCount / 20) : 1;
  const selectedPageCount = selectedReviewCount
    ? Math.ceil(selectedReviewCount / 20)
    : 1;

  const handleClick = (event: SelectChangeEvent) => {
    console.log("click", Number(event.target.value));
    setSelectedFoodId(Number(event.target.value));
  };

  const handleAllReviewPageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setNowAllReviewPage(page);
  };

  const handleSelectedReviewPageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setNowSelectedReviewPage(page);
  };

  if (selectedFoodId == -1) {
    if (!totalReviews || !totalReviews.length) {
      return (
        <div className="flex flex-col gap-y-5 min-h-80 mt-5 w-11/12 justify-center items-center">
          <p className="text-lg font-bold">리뷰가 존재하지 않습니다.</p>
        </div>
      );
    }
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full">
          <FoodSelect selectedId={selectedFoodId} handleClick={handleClick} />
        </div>
        <div className="w-full flex flex-col gap-y-8 m-3">
          {totalReviews.map((review) => (
            <ReviewCard review={review} key={review.reviewId} />
          ))}
        </div>
        <Stack spacing={2} className="mt-10">
          <Pagination
            count={totalPageCount}
            page={nowAllReviewPage}
            onChange={handleAllReviewPageChange}
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
  }

  if (!foodReviews || !foodReviews.length) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full">
          <FoodSelect selectedId={selectedFoodId} handleClick={handleClick} />
        </div>
        <div className="flex flex-col gap-y-5 min-h-80 mt-5 w-11/12 justify-center items-center">
          <p className="text-lg font-bold">리뷰가 존재하지 않습니다.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full">
        <FoodSelect selectedId={selectedFoodId} handleClick={handleClick} />
      </div>
      <div className="w-full flex flex-col gap-y-8 m-3">
        {foodReviews.map((review) => (
          <ReviewCard review={review} key={review.reviewId} />
        ))}
      </div>
      <Stack spacing={2} className="mt-10">
        <Pagination
          count={selectedPageCount}
          page={nowSelectedReviewPage}
          onChange={handleSelectedReviewPageChange}
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

export default FoodReviews;
