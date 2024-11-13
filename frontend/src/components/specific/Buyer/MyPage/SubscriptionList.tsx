import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import EmptySection from "./EmptySection";
import { ImCancelCircle } from "react-icons/im";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import sogoo from "../../../../services/sogoo";
import keys from "../../../../queries/keys";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface SubscriptionListProps {
  subscriptions: SubscribeItem[];
}

const SubscriptionList = ({ subscriptions }: SubscriptionListProps) => {
  const queryClient = useQueryClient();

  const handleCancelSubscribe = (memberSubscribeId: number) => {
    cancelSubscribe(memberSubscribeId);
  };

  const { mutate: cancelSubscribe } = useMutation({
    mutationFn: sogoo.cancelSubscribe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.getBuyerMypage() });
      toast("구독 상품 결제 취소가 완료되었습니다!");
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        console.error(error);
        toast.error("구독 종료 이후에는 취소할 수 없습니다.");
      } else if (error.response?.status === 403) {
        console.error(error);
        toast.error("해당 작업을 수행할 권한이 없습니다.");
      } else if (error.response?.status === 404) {
        console.error(error);
        toast.error("회원님과 일치하는 구독 내역을 조회할 수 없습니다.");
      } else {
        console.error(error);
        toast.error("요청하신 작업을 실패했습니다. 다시 시도해 주세요.");
      }
    },
  });

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex flex-col gap-8 w-full p-8 rounded-t-3xl bg-white">
        <h3 className="text-xl font-semibold">구독 중인 상품</h3>
      </div>
      <div className="flex flex-col gap-8 w-full h-full p-8 rounded-b-3xl bg-white">
        <div className="max-h-[600px] p-1 flex flex-col gap-y-2 overflow-y-auto">
          {subscriptions.length > 0 ? (
            subscriptions.map((item) => (
              <Card
                key={item.subscribeId}
                sx={{
                  width: "100%",
                  minHeight: "150px",
                }}
              >
                <CardActionArea
                  sx={{ display: "flex", justifyContent: "left" }}
                >
                  <CardMedia
                    component="img"
                    image={item.storeImg}
                    alt={item.storeName}
                    sx={{ width: "180px", height: "150px", objectFit: "cover" }}
                  />
                  <CardContent
                    sx={{
                      height: "150px",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div className="flex justify-between">
                      <Typography gutterBottom variant="h5" component="div">
                        {item.subscribeName}
                      </Typography>
                      {item.isSubscriptionActive && (
                        <button
                          onClick={() =>
                            handleCancelSubscribe(item.subscribeId)
                          }
                        >
                          <ImCancelCircle />
                        </button>
                      )}
                    </div>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      매장명 | {item.storeName}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      구독 상태 |{" "}
                      {item.isSubscriptionActive
                        ? "구독 진행 중"
                        : "구독 취소 예정"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
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
