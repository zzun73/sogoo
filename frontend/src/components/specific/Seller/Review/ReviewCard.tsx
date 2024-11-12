import { Card } from "@mui/material";

interface SellerReviewProps {
  review: {
    img: string;
    memberEmail: string;
    foodName: string;
    comment: string;
    emotion: boolean;
  };
}

const ReviewCard = ({ review }: SellerReviewProps) => {
  const { img, memberEmail, foodName, comment } = review;
  return (
    <Card className="flex flex-row px-2 gap-x-3 w-full">
      <img src={img} className="w-24 h-24" />
      <div>
        <p>{memberEmail}</p>
        <p>{foodName}</p>
        <p className="text-sm">{comment}</p>
      </div>
    </Card>
  );
};

export default ReviewCard;
