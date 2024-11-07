import { useState, useEffect } from "react";
import PlusFoodModal from "./PlusFoodModal";
import formatters from "../../../../utils/formatters";

interface SubscribeCardProps {
  storeId: number;
  month: number;
  round: number;
  onSubscribeDataChange: (
    startDate: string,
    round: number,
    selectedFoods: FoodInfo[]
  ) => void;
}

const SubscribeCard: React.FC<SubscribeCardProps> = ({
  storeId,
  month,
  round,
  onSubscribeDataChange,
}) => {
  const [openPlusFood, setOpenPlusFood] = useState<boolean>(false);
  const [selectedFoods, setSelectedFoods] = useState<FoodInfo[]>([]);

  const startDate = formatters.formatToSubDate(month, round).slice(0, 10);

  console.log(startDate);

  useEffect(() => {
    // selectedFoods가 변경될 때마다 부모 컴포넌트로 데이터를 업데이트
    onSubscribeDataChange(startDate, round, selectedFoods);
  }, [startDate, round, selectedFoods]);

  const handlePlusFoodOpen = () => {
    setOpenPlusFood(true);
  };

  const handlePlusFoodClose = () => {
    setOpenPlusFood(false);
  };

  return (
    <div className="w-full flex flex-col p-2 justify-center">
      <div className="w-full flex justify-start items-center">
        <p className="text-xl font-bold">{round}주차</p>
      </div>
      <div
        className="w-full h-32 flex justify-center items-center border-[1px] border-gray-300 rounded px-2 cursor-pointer"
        onClick={handlePlusFoodOpen}
      >
        {selectedFoods.length > 0 ? (
          <div className="flex space-x-10">
            {selectedFoods.map((food) => (
              <img
                key={food.foodId}
                src={food.foodImg}
                alt={food.foodName}
                className="w-28 h-28 rounded"
              />
            ))}
          </div>
        ) : (
          <p className="text-base">반찬 추가하기</p>
        )}
      </div>
      <PlusFoodModal
        open={openPlusFood}
        onClose={handlePlusFoodClose}
        storeId={Number(storeId)}
        selectedFoods={selectedFoods}
        setSelectedFoods={setSelectedFoods}
      />
    </div>
  );
};

export default SubscribeCard;
