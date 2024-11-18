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
  const maskEmail = (email: string): string => {
    const [localPart, domain] = email.split("@");
    if (localPart.length <= 3) {
      return `${localPart}@${domain}`;
    }
    const visiblePart = localPart.slice(0, 3);
    const maskedPart = "*".repeat(localPart.length - 3);
    return `${visiblePart}${maskedPart}@${domain}`;
  };

  const userEmail = maskEmail(review.email);

  return (
    <Card className="flex flex-row px-2 gap-x-3">
      <img src={review.img} className="w-24 h-24" />
      <div>
        <p>{userEmail}</p>
        <p>{review.foodName}</p>
        <p className="text-sm">{review.comment}</p>
      </div>
    </Card>
  );
};

export default ReviewCard;
