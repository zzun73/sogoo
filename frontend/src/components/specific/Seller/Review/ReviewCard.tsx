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
  const { img, memberEmail, foodName, comment, emotion } = review;

  console.log(emotion);
  return (
    <Card className="flex flex-row gap-x-3 w-full mb-5 border-2 border-slate-200 p-5">
      <img src={img} className="w-24 h-24" />
      <div className="w-full flex justify-between items-center ms-5">
        <div className="w-11/12 flex flex-col justify-evenly items-start ms-5">
          <p>{memberEmail}</p>
          <p className="font-bold">{foodName}</p>
          <p className="text-sm">{comment}</p>
        </div>
        <div className="w-1/12 flex justify-center items-center">
          <div
            className={`w-10 h-10 rounded-full ${
              emotion ? "bg-green-700" : "bg-red-700"
            }`}
          ></div>
        </div>
      </div>
    </Card>
  );
};

export default ReviewCard;
