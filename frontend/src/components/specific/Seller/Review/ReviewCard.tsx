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
    <Card className="flex flex-row gap-x-3 w-full mb-5 border-2 border-slate-200 p-5">
      <img src={img} className="w-24 h-24" />
      <div className="flex flex-col justify-evenly items-start ms-5">
        <p>{memberEmail}</p>
        <p className="font-bold">{foodName}</p>
        <p className="text-sm">{comment}</p>
      </div>
    </Card>
  );
};

export default ReviewCard;
