import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import { Add, Remove, Close } from "@mui/icons-material";
import { menuData } from "../../../../assets/dummyData";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface Item {
  id: number;
  name: Name;
  price: number;
  beforePrice?: number;
}

interface SelectedItem extends Item {
  quantity: number;
  category: string;
}

const MenuSelect = () => {
  const [category, setCategory] = useState("");
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState("");

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
    setSelectedItemId("");
  };

  const handleItemSelect = (event: SelectChangeEvent) => {
    const selectedId = Number(event.target.value);
    const selectedData =
      category === "subscribe" ? menuData.subscribe : menuData.foods;
    const selectedItem = selectedData.find(
      (item: Item) => item.id === selectedId
    );

    if (selectedItem && !selectedItems.find((item) => item.id === selectedId)) {
      setSelectedItems([
        ...selectedItems,
        { ...selectedItem, quantity: 1, category },
      ]);
    }
    setSelectedItemId("");
  };

  const renderOptions = () => {
    if (category === "subscribe") {
      return menuData.subscribe.map((item) => (
        <MenuItem
          key={item.name}
          value={item.id}
          disabled={!!selectedItems.find((i) => i.category === "subscribe")}
        >
          {item.name}
        </MenuItem>
      ));
    }
    if (category === "foods") {
      return menuData.foods.map((item) => (
        <MenuItem key={`food${item.id}`} value={item.id}>
          {item.name}
        </MenuItem>
      ));
    }
    return null;
  };

  const handleQuantityChange = (
    id: number,
    category: string,
    amount: number
  ) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item) =>
        (item.id === id || item.category == category) &&
        item.quantity + amount > 0
          ? { ...item, quantity: item.quantity + amount }
          : item
      )
    );
  };

  const handleRemoveItem = (id: number, category: string) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== id && item.category !== category)
    );
  };

  return (
    <div className="basis-5/6 flex flex-col gap-y-3">
      <FormControl className="w-full">
        <Select
          value={category}
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
      {category && (
        <FormControl className="w-full">
          <Select
            value={selectedItemId}
            onChange={handleItemSelect}
            displayEmpty
          >
            <MenuItem value="">
              <em>옵션 2 선택하기</em>
            </MenuItem>
            {renderOptions()}
          </Select>
        </FormControl>
      )}
      <List className="h-[400px] ">
        {selectedItems.map((item) => (
          <ListItem
            key={`${item.category}${item.id}`}
            className="flex items-center gap-4"
          >
            <ListItemText
              primary={item.name}
              secondary={`가격: ${item.price}원`}
            />
            {item.category === "foods" && (
              <div className="flex items-center gap-2">
                <IconButton
                  onClick={() =>
                    handleQuantityChange(item.id, item.category, -1)
                  }
                >
                  <Remove />
                </IconButton>
                <span>{item.quantity}</span>
                <IconButton
                  onClick={() =>
                    handleQuantityChange(item.id, item.category, 1)
                  }
                >
                  <Add />
                </IconButton>
              </div>
            )}
            <IconButton
              onClick={() => handleRemoveItem(item.id, item.category)}
            >
              <Close />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Stack direction="row" spacing={5}>
        <Button
          variant="contained"
          className="w-full h-10"
          disabled={selectedItems.length === 0}
        >
          장바구니 담기
        </Button>
        <Button variant="contained" className="w-full h-10">
          구매하기
        </Button>
      </Stack>
    </div>
  );
};

export default MenuSelect;
