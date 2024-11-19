import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useGetFoodListForSubscribe } from "../../../../queries/queries";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  p: 4,
};

interface PlusFoodProps {
  open: boolean;
  onClose: () => void;
  storeId: number;
  selectedFoods: FoodInfo[];
  setSelectedFoods: React.Dispatch<React.SetStateAction<FoodInfo[]>>;
}

const PlusFoodModal: React.FC<PlusFoodProps> = ({
  open,
  onClose,
  storeId,
  selectedFoods = [],
  setSelectedFoods,
}) => {
  const { foods: initialFoods } = useGetFoodListForSubscribe(storeId);

  const [foods, setFoods] = useState<FoodInfo[]>(initialFoods);

  useEffect(() => {
    if (initialFoods) {
      setFoods(initialFoods);
    }
  }, [initialFoods]);

  const handleDragStart = (event: React.DragEvent, food: FoodInfo) => {
    event.dataTransfer.setData("foodId", String(food.foodId));
  };

  const handleDrop = (event: React.DragEvent) => {
    if (selectedFoods.length >= 3) {
      toast.error("한 주차에 상품은 최대 3개까지만 등록할 수 있습니다.");
      return;
    }

    const foodId = parseInt(event.dataTransfer.getData("foodId"));
    const food = foods.find((f: FoodInfo) => f.foodId === foodId);

    if (food && !selectedFoods.some((selected) => selected.foodId === foodId)) {
      setSelectedFoods((prev) => [...prev, food]);

      setFoods((prevFoods) => prevFoods.filter((f) => f.foodId !== foodId));
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleAddFood = (food: FoodInfo) => {
    if (selectedFoods.length >= 3) {
      toast.error("한 주차에 상품은 최대 3개까지만 등록할 수 있습니다.");
      return;
    }

    if (!selectedFoods.some((selected) => selected.foodId === food.foodId)) {
      setSelectedFoods((prev) => [...prev, food]);

      setFoods((prevFoods) =>
        prevFoods.filter((f) => f.foodId !== food.foodId)
      );
    }
  };

  const handleRemoveSelectedFood = (foodId: number) => {
    const food = selectedFoods.find((f) => f.foodId === foodId);
    if (food) {
      setSelectedFoods((prevSelected) =>
        prevSelected.filter((f) => f.foodId !== foodId)
      );
      setFoods((prevFoods) =>
        [...prevFoods, food].sort((a, b) => a.foodId - b.foodId)
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box
        sx={{
          ...style,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "10px",
        }}
      >
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="w-full h-28 flex items-center border-2 border-slate-400 mb-5 px-5 space-x-5"
        >
          {(Array.isArray(selectedFoods) ? selectedFoods : [])
            .sort((a, b) => a.foodId - b.foodId)
            .map((food) => (
              <img
                key={food.foodId}
                src={food.foodImg}
                alt={`${food.foodName} 이미지`}
                className="w-20 h-20 cursor-pointer"
                onClick={() => handleRemoveSelectedFood(food.foodId)}
              />
            ))}
        </div>
        <div className="flex flex-col w-full h-80 overflow-y-scroll">
          {foods?.map((food: FoodInfo) => (
            <div
              key={food.foodId}
              draggable
              onDragStart={(event) => handleDragStart(event, food)}
              onClick={() => handleAddFood(food)}
              className="flex items-center w-full h-30 border border-slate-400 rounded mb-3 px-3"
            >
              <img
                src={food.foodImg}
                alt={`${food.foodName} 이미지`}
                className="w-20 h-20"
              />
              <div className="w-full flex justify-between items-center ms-3">
                <div className="flex flex-col">
                  <p className="text-xl font-bold">{food.foodName}</p>
                  <p className="text-base text-slate-400">
                    {food.foodDescription}
                  </p>
                </div>
                <p>{food.foodPrice}원</p>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{ marginTop: "20px" }}
        >
          등록완료
        </Button>
      </Box>
    </Modal>
  );
};

export default PlusFoodModal;
