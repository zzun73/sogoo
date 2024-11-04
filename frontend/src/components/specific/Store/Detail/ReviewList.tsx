import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { summaryData, totalReview } from "../../../../assets/dummyData";
import FoodSelect from "./FoodSelect";
import ReviewCard from "./ReviewCard";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
const ReviewList = () => {
  const { reviewCount, positiveCount } = summaryData;
  const positiveRatio = Math.floor((positiveCount / reviewCount) * 100);
  return (
    <div className="min-w-[850px]">
      <div className="grid grid-cols-2 my-7">
        <div className="w-[400px] text-center my-auto">
          <p className="text-2xl">전체 리뷰 수</p>
          <MdOutlineMarkUnreadChatAlt className="inline-block w-16 h-16 mt-3 " />
          <p className="mt-5 text-4xl">{reviewCount} 개</p>
        </div>
        <div>
          <p className="text-2xl text-center">AI 리뷰 분석</p>
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
              width: "400px",
            }}
            text={`긍정 리뷰\n${positiveRatio}%`}
          />
        </div>
      </div>
      {/* 리뷰 리스트 */}
      <div>
        {/* 어떤 제품의 리뷰 목록을 보고싶은지 선택하는 select */}
        <FoodSelect />
        <div className="flex flex-col gap-y-8 m-3">
          {totalReview.map((review) => (
            <ReviewCard review={review} key={review.reviewId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
