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
  //   const foodReviews = useGetFoodReviews(selectedFoodId);
  const foodReviews = useGetFoodReviews(1);

  console.log(foodReviews);
  const handleClick = (event: SelectChangeEvent) => {
    console.log("click", Number(event.target.value));
    setSelectedFoodId(Number(event.target.value));
  };

  if (totalReviews && !totalReviews.length) {
    return (
      <div>
        <FoodSelect selectedId={selectedFoodId} handleClick={handleClick} />
        <div className="flex flex-col gap-y-8 m-3">
          {selectedFoodId === -1
            ? totalReviews.map((review) => (
                <ReviewCard review={review} key={review.reviewId} />
              ))
            : totalReviews.map((review) => (
                <ReviewCard review={review} key={review.reviewId} />
              ))}
        </div>
      </div>
    );
  }
  return null;
};

export default FoodReviews;
