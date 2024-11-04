import { useEffect, useState } from "react";
import sogoo from "../services/sogoo";
import useRootStore from "../stores";

// MUI - Card
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
// MUI - Accordion
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";

const BuyerMyPage = () => {
  const memberInfo = useRootStore().memberInfo;
  const [subcribes, setSubcribes] = useState<SubscribeItem[]>([]);
  const [foodTrades, setFoodTrades] = useState<FoodTradeItem[]>([]);
  const [, setReviews] = useState<ReviewItem[]>([]);

  useEffect(() => {
    if (memberInfo) {
      sogoo.getBuyerMyPage().then((res) => {
        if (res.status === 200) {
          const data = res.data;
          setSubcribes(data.subscribes);
          setFoodTrades(data.foodTrades);
          setReviews(data.reviews);
        }
      });
    }
  }, [memberInfo]);

  const formatPhoneNumber = (number: string | undefined): string => {
    if (number === undefined) return "";
    if (number.length !== 11) {
      throw new Error("Input must be an 11-digit string");
    }
    if (!/^\d+$/.test(number)) {
      throw new Error("Input must contain only numbers");
    }
    if (!number.startsWith("010")) {
      throw new Error("Phone number must start with 010");
    }

    return `${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(7)}`;
  };

  return (
    <div className="w-full flex flex-col justify-center items-center bg-slate-200">
      <div className="my-10 mx-[200px]">
        <h2 className="text-5xl font-shilla font-bold text-center mb-8">마이페이지</h2>
        <div className="min-w-[800px] grid grid-cols-2 gap-4">
          <div className="col-span-2 flex flex-col gap-2">
            {/* 사용자 정보 Title */}
            <div className="flex flex-col gap-8 w-full p-8 rounded-t-3xl bg-white">
              <h3 className="text-xl font-semibold">내 정보</h3>
            </div>
            {/* 사용자 정보 Detail */}
            <div className="flex flex-col gap-8 w-full p-8 rounded-b-3xl bg-white">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center">
                  <p className="w-24 font-bold">성명</p>
                  <p>{memberInfo?.name}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-24 font-bold">휴대폰</p>
                  <p>{formatPhoneNumber(memberInfo?.phoneNumber)}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-24 font-bold">이메일</p>
                  <div className="flex-1 w-full">{memberInfo?.email}</div>
                </div>
                <div className="col-span-3 flex items-center">
                  <p className="w-24 font-bold">주소</p>
                  <div className="flex-1 w-full">{memberInfo?.address}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-2">
            {/* 구독 중인 상품 Title */}
            <div className="flex flex-col gap-8 w-full p-8 rounded-t-3xl bg-white">
              <h3 className="text-xl font-semibold">구독 중인 상품</h3>
            </div>
            {/* 구독 중인 상품 List */}
            <div className="flex flex-col gap-8 w-full p-8 rounded-b-3xl bg-white">
              <div className="max-h-[600px] p-1 flex flex-col gap-y-2 overflow-y-auto">
                {/* 단일 카드 영역 */}
                {subcribes.map((item: SubscribeItem) => {
                  return (
                    <Card sx={{ width: "100%", minHeight: "150px", boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)" }}>
                      <CardActionArea sx={{ display: "flex" }}>
                        <CardContent>
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
                            결제 금액 | {item.subscribePrice}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-2">
            {/* 반찬 주문 내역 Title */}
            <div className="flex flex-col gap-8 w-full p-8 rounded-t-3xl bg-white">
              <h3 className="text-xl font-semibold">반찬 주문</h3>
            </div>
            {/* 반찬 주문 내역 List */}
            <div className="flex flex-col gap-8 w-full p-8 rounded-b-3xl bg-white">
              <div className="max-h-[600px] p-1 flex flex-col gap-y-2 overflow-y-auto">
                {/* 단일 카드 영역 */}
                {foodTrades.map((item: FoodTradeItem) => {
                  return (
                    <Card sx={{ width: "100%", minHeight: "150px", boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)" }}>
                      <CardActionArea sx={{ display: "flex" }}>
                        <CardMedia component="img" image={item.foodImg} alt={item.foodName} sx={{ width: "180px", height: "150px", objectFit: "cover" }} />
                        <CardContent>
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
                      </CardActionArea>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            {/* 리뷰 관리 내역 Title */}
            <div className="flex flex-col gap-8 w-full p-8 rounded-t-3xl bg-white">
              <h3 className="text-xl font-semibold">리뷰 관리</h3>
            </div>
            {/* 구독 중인 상품 List */}
            <div className="flex flex-col gap-8 w-full p-8 rounded-b-3xl bg-white">
              <div>
                <Accordion>
                  <AccordionSummary expandIcon={<Button>리뷰 작성</Button>} aria-controls="panel1-content" id="panel1-header">
                    Accordion 1
                  </AccordionSummary>
                  <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<Button>리뷰 작성</Button>} aria-controls="panel2-content" id="panel2-header">
                    Accordion 2
                  </AccordionSummary>
                  <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<Button>리뷰 작성</Button>} aria-controls="panel3-content" id="panel3-header">
                    Accordion Actions
                  </AccordionSummary>
                  <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </AccordionDetails>
                  <AccordionActions>
                    <Button>Cancel</Button>
                    <Button>Agree</Button>
                  </AccordionActions>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerMyPage;
