import React, { useEffect, useState } from "react";
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
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../components/common/ImageUpload";

interface ReviewInputType {
  reviewId: number;
  comment: string;
  img: File | null;
  imgPreview: string | null;
}

const BuyerMyPage = () => {
  const navigate = useNavigate();
  const memberInfo = useRootStore().memberInfo;
  const isLogin = useRootStore().isLogin;
  const [subcribes, setSubcribes] = useState<SubscribeItem[]>([]);
  const [foodTrades, setFoodTrades] = useState<FoodTradeItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [reviewInput, setReviewInput] = useState<ReviewInputType[]>([]);

  useEffect(() => {
    if (!isLogin) {
      navigate("/sign");
    } else if (memberInfo?.role === "SELLER") {
      navigate("/");
    }
  }, [navigate, isLogin, memberInfo?.role]);

  const handleReviewButton = (reviewStatus: boolean) => {
    if (reviewStatus) {
      return (
        <Button variant="outlined" sx={{ width: "90px" }}>
          리뷰 확인
        </Button>
      );
    } else {
      return (
        <Button variant="contained" sx={{ width: "90px" }}>
          리뷰 작성
        </Button>
      );
    }
  };

  useEffect(() => {
    if (memberInfo) {
      sogoo
        .getBuyerMyPage()
        .then((res) => {
          if (res.status === 200) {
            const data = res.data;
            setSubcribes(data.subscribes);
            setFoodTrades(data.foodTrades);
            setReviews(data.reviews);
          }
        })
        .then(() => {
          setReviewInput(
            reviews.map((review: ReviewItem) => {
              return {
                reviewId: review.foodId,
                comment: "",
                img: null,
                imgPreview: null,
              };
            })
          );
        });
    }
  }, [memberInfo]);

  const handleImageSelect = (reviewId: number, file: File | null) => {
    setReviewInput((prevInputs) => {
      return prevInputs.map((input: ReviewInputType) => {
        if (input.reviewId === reviewId) {
          return {
            ...input,
            img: file,
            imgPreview: file ? URL.createObjectURL(file) : null,
          };
        }
        return input;
      });
    });
  };

  const handleReviewSubmit = async (reviewId: number) => {
    const review = reviewInput.find((input) => input.reviewId === reviewId);
    if (!review) return;

    const formData = new FormData();
    formData.append("comment", review.comment);
    if (review.img) {
      formData.append("image", review.img);
    }

    try {
      // API 호출 예시
      // await sogoo.postReview(reviewId, formData);
      // 성공 처리
    } catch (error) {
      // 에러 처리
      console.error("리뷰 등록 실패:", error);
    }
  };

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
                {/* 구독 상품 - dummy (추후 삭제) */}
                <Card sx={{ width: "100%", minHeight: "150px", boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)" }}>
                  <CardActionArea sx={{ display: "flex" }}>
                    <CardMedia
                      component="img"
                      image="https://plus.unsplash.com/premium_photo-1670513725769-a048102828ad?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="green iguana"
                      sx={{ width: "180px", height: "150px", objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Lizard
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
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
                {/* 반찬 주문 - dummy (추후 삭제) */}
                <Card sx={{ width: "100%", minHeight: "150px", boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)" }}>
                  <CardActionArea sx={{ display: "flex" }}>
                    <CardMedia
                      component="img"
                      image="https://plus.unsplash.com/premium_photo-1670513725769-a048102828ad?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="green iguana"
                      sx={{ width: "180px", height: "150px", objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Lizard
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            {/* 리뷰 관리 내역 Title */}
            <div className="flex flex-col gap-8 w-full p-8 rounded-t-3xl bg-white">
              <h3 className="text-xl font-semibold">리뷰 관리</h3>
            </div>
            {/* 리뷰 내역 List */}
            <div className="flex flex-col gap-8 w-full p-8 rounded-b-3xl bg-white">
              <div>
                {reviews.map((item: ReviewItem) => {
                  return (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={handleReviewButton(item.reviewStatus)}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{
                          "& .MuiAccordionSummary-expandIconWrapper": {
                            transition: "none",
                            "&.Mui-expanded": {
                              transform: "none",
                            },
                          },
                        }}
                      >
                        {item.foodName}
                      </AccordionSummary>
                      <AccordionDetails>
                        {!item.reviewStatus && (
                          <>
                            <TextField
                              fullWidth
                              label="리뷰를 작성해 주세요. (300자 이내)"
                              id="fullWidth"
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const newValue = event.target.value;
                                if (newValue.length > 300) return;

                                setReviewInput((prevInputs) => {
                                  return prevInputs.map((input: ReviewInputType) => {
                                    return input.reviewId === item.foodId ? { ...input, comment: newValue } : input;
                                  });
                                });
                              }}
                              helperText={`${reviewInput.find((input) => input.reviewId === item.foodId)?.comment.length || 0}/300자`}
                              error={(reviewInput.find((input) => input.reviewId === item.foodId)?.comment.length || 0) === 300}
                              slotProps={{
                                formHelperText: {
                                  sx: {
                                    textAlign: "right",
                                    marginRight: "0",
                                    color:
                                      (reviewInput.find((input) => input.reviewId === item.foodId)?.comment.length || 0) === 300
                                        ? "error.main"
                                        : "text.secondary",
                                  },
                                },
                              }}
                              // 붙여넣기 이벤트 처리
                              onPaste={(event: React.ClipboardEvent) => {
                                event.preventDefault();
                                const pastedText = event.clipboardData.getData("text");
                                const currentText = reviewInput.find((input) => input.reviewId === item.foodId)?.comment || "";

                                // 붙여넣을 텍스트와 현재 텍스트의 합이 300자를 초과하는지 확인
                                if (currentText.length + pastedText.length > 300) {
                                  // 300자까지만 잘라서 붙여넣기
                                  const allowedText = pastedText.slice(0, 300 - currentText.length);
                                  setReviewInput((prevInputs) =>
                                    prevInputs.map((input) => (input.reviewId === item.foodId ? { ...input, comment: currentText + allowedText } : input))
                                  );
                                } else {
                                  // 300자 이내면 전체 텍스트 붙여넣기
                                  setReviewInput((prevInputs) =>
                                    prevInputs.map((input) => (input.reviewId === item.foodId ? { ...input, comment: currentText + pastedText } : input))
                                  );
                                }
                              }}
                              multiline
                            />
                            <ImageUpload
                              onImageSelect={(file) => handleImageSelect(item.foodId, file)}
                              selectedImage={reviewInput.find((input) => input.reviewId === item.foodId)?.imgPreview || null}
                            />
                          </>
                        )}
                      </AccordionDetails>
                      {!item.reviewStatus && (
                        <AccordionActions>
                          <Button onClick={() => handleReviewSubmit(item.foodId)}>등록하기</Button>
                        </AccordionActions>
                      )}
                    </Accordion>
                  );
                })}
                {/* 리뷰 내역 - dummy (추후 삭제) */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={
                      <Button variant="contained" sx={{ width: "90px" }}>
                        리뷰 작성
                      </Button>
                    }
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{
                      "& .MuiAccordionSummary-expandIconWrapper": {
                        transition: "none",
                        "&.Mui-expanded": {
                          transform: "none",
                        },
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image="https://plus.unsplash.com/premium_photo-1670513725769-a048102828ad?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="green iguana"
                      sx={{ width: "180px", height: "150px", objectFit: "cover" }}
                    />
                    <CardContent sx={{ display: "flex", alignItems: "center" }}>
                      <Typography gutterBottom variant="h5" component="div">
                        Lizard
                      </Typography>
                    </CardContent>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField fullWidth label="리뷰를 작성해 주세요. (300자 이내)" id="fullWidth" multiline />
                    {/* <ImageUpload
                      onImageSelect={(file) => handleImageSelect(item.foodId, file)}
                      selectedImage={reviewInput.find((input) => input.reviewId === item.foodId)?.imgPreview || null}
                    /> */}
                  </AccordionDetails>
                  <AccordionActions sx={{ display: "flex", justifyContent: "center" }}>
                    <Button sx={{ width: "80px" }}>등록하기</Button>
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
