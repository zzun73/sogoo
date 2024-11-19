import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface StoreProps {
  store: Store;
}

const StoreCard = ({ store }: StoreProps) => {
  const { storeId, name, description, img } = store;
  return (
    <Link to={`/store/${storeId}`}>
      <Card className="hover:scale-[1.02] border-2 border-slate-200">
        <CardMedia
          component="img"
          image={img}
          alt={name}
          sx={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }}
        />
        <div className="flex flex-row justify-start px-4 pt-6 items-center">
          <p className="text-2xl font-bold truncate">{name}</p>
        </div>
        <CardContent sx={{ padding: "10px" }}>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              minHeight: "30px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <span className="truncate text-base px-1">{description}</span>
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default StoreCard;
