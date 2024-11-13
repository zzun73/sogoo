import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import EmptySection from "./EmptySection";

interface FoodTradeListProps {
  foodTrades: FoodTradeItem[];
}

const FoodTradeList = ({ foodTrades }: FoodTradeListProps) => {
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex flex-col gap-8 w-full p-8 rounded-t-3xl bg-white">
        <h3 className="text-xl font-semibold">반찬 주문</h3>
      </div>
      <div className="flex flex-col gap-8 w-full h-full p-8 rounded-b-3xl bg-white">
        <div className="max-h-[600px] p-1 flex flex-col gap-y-2 overflow-y-auto">
          {foodTrades.length > 0 ? (
            foodTrades.map((item, idx) => (
              <Card
                key={`${idx}-${item.foodId}`}
                sx={{
                  width: "100%",
                  minHeight: "150px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.foodImg}
                  alt={item.foodName}
                  sx={{ width: "180px", height: "150px", objectFit: "cover" }}
                />
                <CardContent
                  sx={{
                    height: "150px",
                    flex: "1 1 0%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {item.foodName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    매장명 | {item.storeName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    주문상태 | {item.orderStatus}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    결제 금액 | {item.price}원
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <EmptySection type="foodTrade" />
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodTradeList;
