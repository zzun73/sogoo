import { useState, useEffect } from "react";
import PlusFoodModal from "./PlusFoodModal";

interface SubscribeCardProps {
  storeId: number;
  round: number;
  onSubscribeDataChange: (round: number, selectedFoods: FoodInfo[]) => void;
}

const SubscribeCard: React.FC<SubscribeCardProps> = ({
  storeId,
  round,
  onSubscribeDataChange,
}) => {
  const [openPlusFood, setOpenPlusFood] = useState<boolean>(false);
  const [selectedFoods, setSelectedFoods] = useState<FoodInfo[]>([]);

  useEffect(() => {
    // selectedFoods가 변경될 때마다 부모 컴포넌트로 데이터를 업데이트
    onSubscribeDataChange(round, selectedFoods);
  }, [selectedFoods, round]);

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
        <p className="text-base">반찬 추가하기</p>
      </div>
      <PlusFoodModal
        open={openPlusFood}
        onClose={handlePlusFoodClose}
        storeId={Number(storeId)}
        selectedFoods={selectedFoods} // 추가
        setSelectedFoods={setSelectedFoods} // 추가
      />
    </div>
  );
};

export default SubscribeCard;
