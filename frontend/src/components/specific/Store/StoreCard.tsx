import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface StoreProps {
  store: Store;
}

const StoreCard = ({ store }: StoreProps) => {
  const { storeId, name, description, img } = store;
  return (
    <Link to={`/store/${storeId}`}>
      <Card className="hover:scale-105">
        <CardMedia component="img" image={img} alt={name} sx={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }} />
        <div className="flex flex-row justify-start px-4 items-center py-2">
          <p className="text-lg font-bold truncate">{name}</p>
        </div>
        <CardContent sx={{ padding: "10px" }}>
          <Typography variant="body2" sx={{ color: "text.secondary", minHeight: "30px" }}>
            <p className="truncate text-base px-1">{description}</p>
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default StoreCard;
