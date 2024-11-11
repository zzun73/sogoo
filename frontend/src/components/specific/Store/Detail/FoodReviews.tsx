import FoodSelect from "./FoodSelect";
import ReviewCard from "./ReviewCard";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetFoodReviews,
  useGetStoreReviews,
} from "../../../../queries/queries";

const FoodReviews = () => {
  const { id } = useParams();
  const [selectedFoodId, setSelectedFoodId] = useState(-1);
  const totalReviews = useGetStoreReviews(Number(id));
  const foodReviews = useGetFoodReviews(selectedFoodId);

  console.log(foodReviews);
  const handleClick = (event: SelectChangeEvent) => {
    console.log("click", Number(event.target.value));
    setSelectedFoodId(Number(event.target.value));
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
