import ReviewSummary from "./ReviewSummary";
import FoodReviews from "./FoodReviews";

const ReviewList = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ReviewSummary />
      <FoodReviews />
    </div>
  );
};

export default ReviewList;
