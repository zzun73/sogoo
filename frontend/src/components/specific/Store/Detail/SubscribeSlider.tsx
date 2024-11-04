import formatters from "../../../../utils/formatters";
import FoodInfo from "./FoodInfo";

interface FoodProps {
  foodId: number;
  foodName: string;
  foodDescription: string;
  foodImg: string;
}

interface WeeklyFood {
  subscribeDate: string;
  subscribeRound: number;
  foods: FoodProps[];
}

interface WeeklyProps {
  week: WeeklyFood; // Updated to array of WeeklyFood
}

const SubscribeSlider = ({ week }: WeeklyProps) => {
  const { subscribeRound, foods, subscribeDate } = week;
  return (
    <div className="m-3 w-full">
      <p className="font-bold text-lg">
        {subscribeRound}주차 반찬{" "}
        <span className="text-sm text-slate-700">
          {formatters.formatToSubDate(
            new Date(subscribeDate).getMonth() + 1,
            subscribeRound
          )}
        </span>
      </p>
      <div>
        {foods.map((food, idx) => (
          <FoodInfo
            key={`info-${food.foodId}-${idx}`}
            food={food}
            round={subscribeRound}
          />
        ))}
      </div>
    </div>
  );
};

export default SubscribeSlider;
