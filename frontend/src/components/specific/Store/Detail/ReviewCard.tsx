import { Card } from "@mui/material";

const ReviewCard = ({ review }) => {
  return (
    <Card className="flex flex-row px-2 gap-x-3">
      <img src={review.img} className="w-24 h-24" />
      <div>
        <p>{review.email}</p>
        <p>{review.foodName}</p>
        <p className="text-sm">{review.comment}</p>
      </div>
    </Card>
  );
};

export default ReviewCard;
