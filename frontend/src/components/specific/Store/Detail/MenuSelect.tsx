import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  MenuItem,
  FormControl,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Add, Remove, Close } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate, useParams } from "react-router-dom";
import useRootStore from "../../../../stores";
import { useGetStoreItems } from "../../../../queries/queries";
import formatters from "../../../../utils/formatters";
import { toast } from "react-toastify";
import ConfirmToast from "../../../common/ConfirmToast";

interface MenuSelectProps {
  storeImg: string;
  storeName: string;
}

const MenuSelect = ({ storeImg, storeName }: MenuSelectProps) => {
  const { id } = useParams();
  const currentStoreId = Number(id);
  const [category, setCategory] = useState("");
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const storeItems = useGetStoreItems(currentStoreId);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
    setSelectedItemId("");
  };

  const handleItemSelect = (event: SelectChangeEvent) => {
    const selectedId = Number(event.target.value);
    const selectedData =
      category === "subscribe" ? storeItems.subscribe : storeItems.foods;
    const selectedItem = selectedData.find(
      (item: Item) => item.id === selectedId
    );

    if (
      category === "subscribe" &&
      selectedItems.find((item) => item.category === "subscribe")
    ) {
      toast.error("구독 상품은 1개만 선택 가능합니다.");
      // setCategory("");
      return;
    }

    if (
      selectedItem &&
      selectedItems.find(
        (item) => item.id === selectedId && item.category === category
      )
    ) {
      toast.error("이미 추가된 상품입니다.");
      // setCategory("");
      return;
    }

    if (selectedItem) {
      setSelectedItems([
        ...selectedItems,
        {
          ...selectedItem,
          count: 1,
          category,
          image: selectedItem.image ? selectedItem.image : storeImg,
        },
      ]);
    }
    setSelectedItemId("");
    // setCategory("");
  };

  const renderOptions = () => {
    if (category === "subscribe") {
      return storeItems.subscribe.map((item: SelectedItem) => (
        <MenuItem key={item.name} value={item.id}>
          {item.name}
        </MenuItem>
      ));
    }
    if (category === "foods") {
      return storeItems.foods.map((item: SelectedItem) => (
        <MenuItem key={`food${item.id}`} value={item.id}>
          {item.name}
        </MenuItem>
      ));
    }
    return null;
  };

  const handleCountChange = (id: number, category: string, amount: number) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.category === category && item.count + amount > 0
          ? { ...item, count: item.count + amount }
          : item
      )
    );
  };

  const handleRemoveItem = (id: number, category: string) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== id || item.category !== category)
    );
  };

  // 여기부터는 장바구니!
  const navigate = useNavigate();
  const {
    storeId,
    subscribe,
    setFoodList,
    setSubscribe,
    setStoreId,
    setStoreName,
  } = useRootStore();

  /**
   * 장바구니에 상품 담기
   * @dev 로직 설명
   * - 장바구니에 상품 없을 때 : 그냥 담기
   * - 장바구니에 상품이 있을 떄
   *  - 현재 매장과 일치
   *    - 개수 추가 후 메뉴 선택 초기화
   *  - 현재 매장과 불일치
   *    - 기존 매장 유지 선택 : return으로 종료
   *    - 초기화 후 상품 추가 선택 : storeId 갱신, 기존 items 초기화 후
   */
  const goToCart = async () => {
    // 다른 매장의 상품이 있는 경우 처리
    if (storeId && storeId !== currentStoreId) {
      const confirmResetCart = await ConfirmToast({
        message:
          "다른 매장의 상품이 있습니다. 장바구니를 비우고 새로운 상품을 담으시겠습니까?",
        confirmText: "비우기",
        cancelText: "취소",
        toastOptions: {
          position: "top-center",
          theme: "light",
        },
      });

      if (!confirmResetCart) {
        return;
      }

      // 장바구니 초기화
      setStoreId(null);
      setStoreName("");
      setSubscribe(null);
      setFoodList([]);
    }

    // 선택된 상품 유효성 검증
    if (selectedItems.length === 0) {
      toast.error("선택된 상품이 없습니다.");
      return;
    }

    try {
      // 구독 상품 처리
      const subItem = selectedItems.find(
        (item) => item.category === "subscribe"
      );
      if (subItem) {
        if (subscribe) {
          toast.error("구독 상품은 1개만 선택 가능합니다.");
          return;
        }
        setSubscribe(subItem);
      }

      // 일반 상품 처리
      const foodItems = selectedItems.filter(
        (item) => item.category === "foods"
      );
      if (foodItems.length > 0) {
        setFoodList(foodItems);
      }

      setStoreId(currentStoreId);
      setStoreName(storeName);

      // 장바구니 페이지 이동 확인
      const confirmGoToCart = await ConfirmToast({
        message: "장바구니로 이동하시겠습니까?",
        confirmText: "이동",
        cancelText: "계속 쇼핑하기",
        toastOptions: {
          position: "top-center",
          theme: "light",
        },
      });

      // 장바구니 이동
      if (confirmGoToCart) {
        navigate("/orders/cart");
      }

      setSelectedItems([]);
    } catch (error) {
      toast.error("장바구니 담기에 실패했습니다. 다시 시도해주세요.");
      console.error("장바구니 담기 실패:", error);
    }
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
      <FormControl className="w-full">
        <Select value={selectedItemId} onChange={handleItemSelect} displayEmpty>
          <MenuItem value="">
            <em>옵션 2 선택하기</em>
          </MenuItem>
          {renderOptions()}
        </Select>
      </FormControl>
      <List className="max-h-[200px] overflow-y-auto w-full overscroll-auto">
        {selectedItems.map((item) => (
          <ListItem
            key={`${item.category}${item.id}`}
            className="flex flex-row items-center"
          >
            <div></div>
            <ListItemText
              primary={item.name}
              secondary={
                <>
                  <span>가격: </span>
                  {item.category === "subscribe" ? (
                    <span className="line-through mr-1 text-gray-500">
                      {item.beforePrice &&
                        formatters.formatToCurrency(item.beforePrice)}
                    </span>
                  ) : null}
                  <span>{formatters.formatToCurrency(item.price)}</span>
                </>
              }
            />
            {item.category === "foods" && (
              <div className="flex items-center gap-2">
                <IconButton
                  onClick={() => handleCountChange(item.id, item.category, -1)}
                >
                  <Remove />
                </IconButton>
                <span>{item.count}</span>
                <IconButton
                  onClick={() => handleCountChange(item.id, item.category, 1)}
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
          onClick={goToCart}
          variant="contained"
          className="w-full h-10"
          disabled={selectedItems.length === 0}
        >
          장바구니 담기
        </Button>
      </Stack>
    </div>
  );
};

export default MenuSelect;
