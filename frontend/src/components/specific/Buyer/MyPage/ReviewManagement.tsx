import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Button,
  TextField,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import sogoo from "../../../../services/sogoo";
import ImageUpload from "../../../common/ImageUpload";
import EmptySection from "./EmptySection";
import keys from "../../../../queries/keys";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ReviewInputType {
  reviewId: number;
  comment: string;
  img: File | null;
  imgPreview: string | null;
}

interface ReviewManagementProps {
  reviews: ReviewItem[];
}

const ReviewManagement = ({ reviews }: ReviewManagementProps) => {
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);
  const [reviewInput, setReviewInput] = useState<ReviewInputType[]>(
    reviews.map((review) => ({
      reviewId: review.orderListId,
      comment: "",
      img: null,
      imgPreview: null,
    }))
  );

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

  const handleImageSelect = (reviewId: number, file: File | null) => {
    setReviewInput((prevInputs) =>
      prevInputs.map((input) =>
        input.reviewId === reviewId
          ? {
              ...input,
              img: file,
              imgPreview: file ? URL.createObjectURL(file) : null,
            }
          : input
      )
    );
  };

  const { mutate: registerReview } = useMutation({
    mutationFn: ({
      reviewId,
      formData,
    }: {
      reviewId: number;
      formData: FormData;
    }) => {
      return sogoo.registerReview(reviewId, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.getBuyerMypage() });
      toast("리뷰가 등록되었습니다.");
      setReviewInput((prevInputs) =>
        prevInputs.map((input) => ({
          ...input,
          comment: "",
          img: null,
          imgPreview: null,
        }))
      );
      setIsSaving(false);
    },
    onError: async (error: AxiosError) => {
      if (
        error.message === "timeout of 2500ms exceeded" ||
        error.response?.data == "리뷰 분석 처리 중 오류가 발생했습니다."
      ) {
        toast.error("리뷰 형식이 올바르지 않습니다. 리뷰를 다시 작성해주세요.");
        return;
      }
      if (error.message == "") toast.error("리뷰 등록에 실패하였습니다.");
    },
  });

  const handleReviewSubmit = (reviewId: number) => {
    const review = reviewInput.find((input) => input.reviewId === reviewId);
    if (!review) return;

    if (!review.comment.trim()) {
      toast.error("리뷰 내용을 입력해주세요.");
      return;
    } else if (review.comment.trim().length > 300) {
      toast.error("리뷰 내용은 300자 이내로 작성해주세요.");
      return;
    } else if (review.comment.trim().length < 10) {
      toast.error("리뷰 내용은 10자 이상 작성해주세요.");
      return;
    } else if (!review.img) {
      toast.error("이미지를 등록해주세요.");
      return;
    } else if (review.img && !review.img.type.startsWith("image/")) {
      toast.error("이미지 파일만 등록 가능합니다.");
      return;
    } else if (review.img && review.img.size > 10 * 1024 * 1024) {
      toast.error("이미지 파일은 10MB 이하로 등록 가능합니다.");
      return;
    }

    const formData = new FormData();
    formData.append("comment", review.comment);
    if (review.img) {
      formData.append("img", review.img);
    }
    if (isSaving) {
      return;
    }
    setIsSaving(true);
    registerReview({ reviewId, formData });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-8 w-full p-8 rounded-t-3xl bg-white">
        <h3 className="text-xl font-semibold">리뷰 관리</h3>
      </div>
      <div className="flex flex-col gap-8 w-full p-8 rounded-b-3xl bg-white">
        <div>
          {reviews.length > 0 ? (
            reviews.map((item) => (
              <Accordion key={item.orderListId}>
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
                  <CardMedia
                    component="img"
                    image={item.foodImg}
                    alt="green iguana"
                    sx={{ width: "180px", height: "150px", objectFit: "cover" }}
                  />
                  <CardContent sx={{ display: "flex", alignItems: "center" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.foodName}
                    </Typography>
                  </CardContent>
                </AccordionSummary>
                <AccordionDetails>
                  <hr className="mb-5" />
                  {!item.reviewStatus && (
                    <div className="flex gap-8 w-full">
                      <div className="flex-1">
                        <TextField
                          fullWidth
                          label="리뷰를 작성해 주세요. (300자 이내)"
                          sx={{
                            "& .MuiInputBase-root": {
                              height: "230px", // 원하는 높이 값
                            },
                          }}
                          value={
                            reviewInput.find(
                              (input) => input.reviewId === item.orderListId
                            )?.comment || ""
                          }
                          onChange={(event) => {
                            const newValue = event.target.value;
                            if (newValue.length > 300) return;
                            setReviewInput((prevInputs) =>
                              prevInputs.map((input) =>
                                input.reviewId === item.orderListId
                                  ? { ...input, comment: newValue }
                                  : input
                              )
                            );
                          }}
                          helperText={`${
                            reviewInput.find(
                              (input) => input.reviewId === item.orderListId
                            )?.comment.length || 0
                          }/300자`}
                          error={
                            (reviewInput.find(
                              (input) => input.reviewId === item.orderListId
                            )?.comment.length || 0) === 300
                          }
                          slotProps={{
                            formHelperText: {
                              sx: {
                                textAlign: "right",
                                marginRight: "0",
                                color:
                                  (reviewInput.find(
                                    (input) =>
                                      input.reviewId === item.orderListId
                                  )?.comment.length || 0) === 300
                                    ? "error.main"
                                    : "text.secondary",
                              },
                            },
                          }}
                          onPaste={(event) => {
                            event.preventDefault();
                            const pastedText =
                              event.clipboardData.getData("text");
                            const currentInput = reviewInput.find(
                              (input) => input.reviewId === item.orderListId
                            );
                            const currentText = currentInput?.comment || "";

                            if (currentText.length + pastedText.length > 300) {
                              const allowedText = pastedText.slice(
                                0,
                                300 - currentText.length
                              );
                              setReviewInput((prevInputs) =>
                                prevInputs.map((input) =>
                                  input.reviewId === item.orderListId
                                    ? {
                                        ...input,
                                        comment: currentText + allowedText,
                                      }
                                    : input
                                )
                              );
                            } else {
                              setReviewInput((prevInputs) =>
                                prevInputs.map((input) =>
                                  input.reviewId === item.orderListId
                                    ? {
                                        ...input,
                                        comment: currentText + pastedText,
                                      }
                                    : input
                                )
                              );
                            }
                          }}
                          multiline
                        />
                      </div>
                      <div className="w-[260px]">
                        <ImageUpload
                          onImageSelect={(file) =>
                            handleImageSelect(item.orderListId, file)
                          }
                          selectedImage={
                            reviewInput.find(
                              (input) => input.reviewId === item.orderListId
                            )?.imgPreview || null
                          }
                        />
                      </div>
                    </div>
                  )}
                  {item.reviewStatus && (
                    <div className="flex flex-col items-center gap-4">
                      <TextField
                        id="outlined-read-only-input"
                        label="작성한 리뷰"
                        defaultValue={item.review?.reviewComment}
                        slotProps={{
                          input: {
                            readOnly: true,
                          },
                        }}
                        fullWidth
                        multiline
                      />
                      <img
                        src={item.review?.reviewImg}
                        alt={`리뷰 이미지 ${item.review?.reviewId}`}
                        className="w-[400px] h-[300px] object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:scale-[1.02] transform cursor-pointer"
                      />
                    </div>
                  )}
                </AccordionDetails>
                {!item.reviewStatus && (
                  <AccordionActions
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        width: "200px",
                        borderRadius: "50px",
                        marginBottom: "10px",
                      }}
                      onClick={() => handleReviewSubmit(item.orderListId)}
                    >
                      등록하기
                    </Button>
                  </AccordionActions>
                )}
              </Accordion>
            ))
          ) : (
            <EmptySection type="review" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewManagement;
