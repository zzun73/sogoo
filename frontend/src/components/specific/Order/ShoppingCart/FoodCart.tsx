import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Button,
} from "@mui/material";
import { Remove, Add, Close } from "@mui/icons-material";
import useRootStore from "../../../../stores";

const FoodCart = () => {
  const { foodList, deleteSelectedItem, changeFoodCount } = useRootStore();
  const [checked, setChecked] = useState<number[]>([]);

  const handleChecked = (id: number) => {
    if (checked.includes(id)) {
      const updatedChecked = checked.filter((foodId) => foodId !== id);
      setChecked(updatedChecked);
      return;
    }
    setChecked((prev) => [...prev, id]);
  };

  const navigate = useNavigate();

  /**
   * 구독 구매 페이지 이동 => 이쪽 수정 필요!!
   * */
  const goToOrder = () => {
    navigate(`/orders/form`);
  };
  if (!foodList) {
    return (
      <div className=" flex flex-col justify-center h-32 w-full rounded-b-3xl bg-white my-3">
        <p className="text-lg font-semibold text-center">
          담긴 반찬 상품이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-b-3xl bg-white my-3 flex flex-col gap-8 pt-3">
      {foodList &&
        foodList.map((item) => (
          <ListItem key={item.id} className="flex items-center py-3">
            <Checkbox
              onChange={() => handleChecked(item.id)}
              checked={checked.includes(item.id)}
            />
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-lg mr-3"
            />
            <ListItemText
              primary={item.name}
              secondary={
                <span className="text-lg font-bold">
                  {item.price.toLocaleString()}원
                </span>
              }
            />
            <div className="flex items-center">
              <IconButton
                onClick={() => changeFoodCount(item.id, -1)}
                disabled={item.count === 1}
              >
                <Remove />
              </IconButton>
              <span>{item.count}</span>
              <IconButton onClick={() => changeFoodCount(item.id, 1)}>
                <Add />
              </IconButton>
            </div>
            <IconButton onClick={() => deleteSelectedItem(item.id)}>
              <Close />
            </IconButton>
          </ListItem>
        ))}
      <Button onClick={goToOrder}>구매하기</Button>
    </div>
  );
};

export default FoodCart;
