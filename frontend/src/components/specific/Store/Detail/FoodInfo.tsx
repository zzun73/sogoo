interface FoodInfoProps {
  food: FoodProps;
  round: number;
}

const FoodInfo = ({ food, round }: FoodInfoProps) => {
  const { foodId, foodName, foodDescription, foodImg } = food;
  return (
    <div
      className="my-2 flex items-center w-full gap-x-2"
      key={`${round}-${foodId}`}
    >
      <img src={foodImg} alt={foodName} className="w-16 h-16" />
      <div className="flex flex-col">
        <p className="text-base">{foodName}</p>
        <p className="text-sm">{foodDescription}</p>
      </div>
    </div>
  );
};

export default FoodInfo;
