import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";

interface StoreProps {
  store: Store;
}

const StoreCard = ({ store }: StoreProps) => {
  const { storeId, name, description, img } = store;
  return (
    <Link to={`/store/${storeId}`}>
      <Card className="hover:scale-105">
        <CardMedia
          component="img"
          image={img}
          alt={name}
          sx={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }}
        />
        <div className="flex flex-row justify-between px-4 items-center py-2">
          <p className="text-sub fw-bold">{name}</p>
          <IconButton aria-label="share">
            <ShareIcon sx={{ width: 20, height: 20 }} />
          </IconButton>
        </div>
        <CardContent>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", minHeight: "30px" }}
          >
            <p className="truncate text-base h-10 px-4">{description}</p>
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default StoreCard;
