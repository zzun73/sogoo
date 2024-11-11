import { Card } from "@mui/material";

interface ReviewCardProps {
  review: {
    img: string;
    email: string;
    foodName: string;
    comment: string;
  };
}

const ReviewCard = ({ review }: ReviewCardProps) => {
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
