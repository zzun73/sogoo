import Box from "../../common/Box";
import FoodSelect from "./Review/FoodSelect";
import { useGetProductReview } from "../../../queries/queries";
import useRootStore from "../../../stores";
import ReviewCard from "./Review/ReviewCard";
import ReviewSummary from "./Review/ReviewSummary";
import { useState, useEffect } from "react";
import { SelectChangeEvent } from "@mui/material/Select";

const ReviewList = () => {
  const { selectedStoreId } = useRootStore();
  const [selectedFoodId, setSelectedelectedFoodId] = useState(-1);
  const selectedReviews = useGetProductReview(selectedStoreId!, selectedFoodId);
  const handleClick = (event: SelectChangeEvent) => {
    setSelectedelectedFoodId(Number(event.target.value));
    console.log(Number(event.target.value));
  };

  useEffect(() => {
    setSelectedelectedFoodId(-1);
  }, [selectedStoreId]);

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
      <Box className="min-h-[400px]">
        <FoodSelect
          storeId={selectedStoreId!}
          foodId={selectedFoodId}
          handleClick={handleClick}
        />
        <ReviewSummary summary={chart} />
        <div
          className={`${
            reviews.length ? "h-[400px]" : null
          } flex flex-col justify-center items-center`}
        >
          {reviews.map((review) => (
            <ReviewCard review={review} />
          ))}
        </div>
      </Box>
    </div>
  );
};

export default ReviewList;
