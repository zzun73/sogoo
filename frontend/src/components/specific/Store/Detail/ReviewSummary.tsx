import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { RiChatSmile3Fill } from "react-icons/ri";
import { useGetReviewSummary } from "../../../../queries/queries";
import { useParams } from "react-router-dom";

const ReviewSummary = () => {
  const { id } = useParams();
  const reviewSummary = useGetReviewSummary(Number(id));

  if (!reviewSummary || !reviewSummary.reviewCount) {
    return (
      <div className="flex flex-col gap-y-5 min-h-80 mt-5 w-11/12 justify-center items-center">
        <p className="text-lg font-bold">리뷰가 존재하지 않습니다.</p>
      </div>
    );
  }

  const { reviewCount, positiveCount, summary } = reviewSummary;
  const positiveRatio =
    reviewCount && Math.floor((positiveCount / reviewCount) * 100);

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 my-7">
        <div className="w-[400px] text-center my-auto mx-auto">
          <p className="text-xl text-center">전체 리뷰 수</p>
          <RiChatSmile3Fill className="inline-block w-20 h-20 mt-3 " />
          <p className="mt-5 text-3xl ">{reviewCount} 개</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-xl text-center">리뷰 감정 분석</p>
          <Gauge
            value={positiveRatio}
            startAngle={-100}
            endAngle={100}
            height={150}
            width={200}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 16,
                fontWeight: "bold",
                transform: "translate(0px, 0px)",
              },
            }}
            text={`긍정 리뷰\n${positiveRatio}%`}
          />
        </div>
        <div className="flex flex-col gap-y-5">
          <p className="text-xl text-center">AI 리뷰 분석</p>
          <p className="text-base text-center">
            {summary !== "없음" ? summary : "AI 리뷰를 생성중입니다."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
