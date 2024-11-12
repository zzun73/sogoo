import FoodSelect from "./FoodSelect";
import ReviewCard from "./ReviewCard";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetFoodReviews,
  useGetStoreReviews,
  useGetBuyerAllReviewCounts,
} from "../../../../queries/queries";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const FoodReviews = () => {
  const { id } = useParams();
  const [selectedFoodId, setSelectedFoodId] = useState(-1);
  const totalReviews = useGetStoreReviews(Number(id));
  const foodReviews = useGetFoodReviews(selectedFoodId);

  const allReviewCount = useGetBuyerAllReviewCounts(Number(id))?.reviewCount;
  const totalPageCount = allReviewCount ? Math.ceil(allReviewCount / 20) : 1;

  const [nowAllReviewPage, setNowAllReviewPage] = useState<number>(1);

  console.log(totalReviews);
  console.log(foodReviews);
  console.log(allReviewCount);

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

  if (selectedFoodId == -1) {
    if (!totalReviews || !totalReviews.length) {
      return (
        <div className="flex flex-col gap-y-5 min-h-80 mt-5 w-11/12 justify-center items-center">
          <p className="text-lg font-bold">리뷰가 존재하지 않습니다.</p>
        </div>
      );
    }
    return (
      <div>
        <FoodSelect selectedId={selectedFoodId} handleClick={handleClick} />
        <div className="flex flex-col gap-y-8 m-3">
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
      <div>
        <FoodSelect selectedId={selectedFoodId} handleClick={handleClick} />
        <div className="flex flex-col gap-y-5 min-h-80 mt-5 w-11/12 justify-center items-center">
          <p className="text-lg font-bold">리뷰가 존재하지 않습니다.</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <FoodSelect selectedId={selectedFoodId} handleClick={handleClick} />
      <div className="flex flex-col gap-y-8 m-3">
        {foodReviews.map((review) => (
          <ReviewCard review={review} key={review.reviewId} />
        ))}
      </div>
    </div>
  );
};

export default FoodReviews;
