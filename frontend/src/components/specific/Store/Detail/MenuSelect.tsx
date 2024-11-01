import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

interface SubscribeItem {
  subscribeId: number;
  subscribeName: string;
  subscribePrice: number;
  subscribeBeforePrice: number;
}

interface FoodItem {
  foodId: number;
  foodName: string;
  foodPrice: number;
}

const MenuSelect = () => {
  const [choice, setChoice] = useState("");
  const [selectedItems, setSelectedItems] = useState<
    (SubscribeItem | FoodItem)[]
  >([]);
  const [selectedItemId, setSelectedItemId] = useState(""); // item 선택 후 select 초기화용

  const data = {
    subscribe: [
      {
        subscribeId: 1,
        subscribeName: "고기패키지",
        subscribePrice: 13000,
        subscribeBeforePrice: 0,
      },
    ],
    foods: [
      {
        foodId: 1,
        foodName: "감자탕",
        foodPrice: 10000,
      },
      {
        foodId: 2,
        foodName: "김치찌개",
        foodPrice: 8000,
      },
    ],
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setChoice(event.target.value);
    setSelectedItemId(""); // 카테고리 선택 시 초기화
  };

  const handleItemSelect = (event: SelectChangeEvent) => {
    const selectedId = Number(event.target.value);
    const selectedData = choice === "subscribe" ? data.subscribe : data.foods;
    const selectedItem = selectedData.find(
      (item) =>
        (choice === "subscribe" ? item.subscribeId : item.foodId) === selectedId
    );

    if (selectedItem && !selectedItems.includes(selectedItem)) {
      setSelectedItems([...selectedItems, selectedItem]);
    }
    setSelectedItemId(""); // item 선택 후 초기화
  };

  const renderOptions = () => {
    if (choice === "subscribe") {
      return data.subscribe.map((item) => (
        <MenuItem key={item.subscribeId} value={item.subscribeId}>
          {item.subscribeName}
        </MenuItem>
      ));
    }
    if (choice === "foods") {
      return data.foods.map((item) => (
        <MenuItem key={item.foodId} value={item.foodId}>
          {item.foodName}
        </MenuItem>
      ));
    }
    return null;
  };

  return (
    <div className="basis-5/6 flex flex-col gap-y-3">
      <FormControl className="w-full">
        <Select
          value={choice}
          onChange={handleCategoryChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>옵션 1 선택하기</em>
          </MenuItem>
          <MenuItem value="subscribe">
            <em>구독</em>
          </MenuItem>
          <MenuItem value="foods">
            <em>개별 상품</em>
          </MenuItem>
        </Select>
      </FormControl>
      {choice && (
        <FormControl className="w-full">
          <Select
            value={selectedItemId} // 선택 후 초기화
            onChange={handleItemSelect}
            displayEmpty
            // inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>옵션 2 선택하기</em>
            </MenuItem>
            {renderOptions()}
          </Select>
        </FormControl>
      )}
      <List>
        {selectedItems.map((item) => (
          <ListItem
            key={choice === "subscribe" ? item.subscribeId : item.foodId}
          >
            <ListItemText
              primary={
                choice === "subscribe" ? item.subscribeName : item.foodName
              }
              secondary={`가격: ${
                choice === "subscribe" ? item.subscribePrice : item.foodPrice
              }원`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MenuSelect;
