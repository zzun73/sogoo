import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import EmptySection from "./EmptySection";

interface SubscriptionListProps {
  subscriptions: SubscribeItem[];
}

const SubscriptionList = ({ subscriptions }: SubscriptionListProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-8 w-full p-8 rounded-t-3xl bg-white">
        <h3 className="text-xl font-semibold">구독 중인 상품</h3>
      </div>
      <div className="flex flex-col gap-8 w-full p-8 rounded-b-3xl bg-white">
        <div className="max-h-[600px] p-1 flex flex-col gap-y-2 overflow-y-auto">
          {subscriptions.length > 0 ? (
            subscriptions.map((item) => (
              <Card
                key={item.subscribeId}
                sx={{
                  width: "100%",
                  minHeight: "150px",
                  boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
                }}
              >
                <CardActionArea sx={{ display: "flex", justifyContent: "left" }}>
                  <CardMedia component="img" image={item.storeImg} alt={item.storeName} sx={{ width: "180px", height: "150px", objectFit: "cover" }} />
                  <CardContent sx={{ height: "150px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.subscribeName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      매장명 | {item.storeName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      구독 기간 | {item.SubscribePeriod}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      결제 금액 | {item.subscribePrice}원
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          ) : (
            <EmptySection type="subscription" />
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionList;
