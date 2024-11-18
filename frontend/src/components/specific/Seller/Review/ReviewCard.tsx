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
    <Card className="flex flex-row gap-x-3 w-full mb-5 border-2 border-slate-200">
      <div className="flex w-full p-5">
        <img src={img} className="w-24 h-24" />
        <div className="w-full flex justify-between items-center ms-5">
          <div className="w-11/12 flex flex-col justify-evenly items-start ms-5">
            <p>{memberEmail}</p>
            <p className="font-bold">{foodName}</p>
            <p className="text-sm">{comment}</p>
          </div>
        </div>
      </div>
      <div className="w-1/12 h-full flex justify-end items-center">
        <div
          className={`w-3 h-full ${emotion ? "bg-green-500" : "bg-red-500"}`}
        ></div>
      </div>
    </Card>
  );
};

export default ReviewCard;
