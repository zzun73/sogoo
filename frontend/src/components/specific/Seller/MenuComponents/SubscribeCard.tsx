import { useState } from "react";
import PlusFoodModal from "./PlusFoodModal";

interface SubscribeCardProps {
  storeId: number;
  round: number;
}

const SubscribeCard: React.FC<SubscribeCardProps> = ({ storeId, round }) => {
  const [openPlusFood, setOpenPlusFood] = useState<boolean>(false);

  const handlePlusFoodOpen = () => {
    setOpenPlusFood(true);
  };

  const handlePlusFoodClose = () => {
    setOpenPlusFood(false);
  };

  const roundValue = round + 1;

  return (
    <div className="w-full flex flex-col p-2 justify-center">
      <div className="w-full flex justify-start items-center">
        <p className="text-xl font-bold">{roundValue}주차</p>
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
      />
    </div>
  );
};

export default SubscribeCard;
