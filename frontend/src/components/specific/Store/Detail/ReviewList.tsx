import ReviewSummary from "./ReviewSummary";
import FoodReviews from "./FoodReviews";

const ReviewList = () => {
  return (
    <div className="w-full">
      <ReviewSummary />
      <FoodReviews />
    </div>
  );
};

export default ReviewList;
