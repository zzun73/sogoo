import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SubscribeCard from "../components/specific/Seller/MenuComponents/SubscribeCard";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useMutation } from "@tanstack/react-query";
import sogoo from "../services/sogoo";
import useRootStore from "../stores";
import { toast } from "react-toastify";

const AddSubscribe: React.FC = () => {
  const navigate = useNavigate();

  const storeId = useRootStore().selectedStoreId;

  console.log(storeId);

  const now = new Date().getMonth() + 1;
  const [subscribeMonth, setSubscribeMonth] = useState<number>(now);

  const [subscribeName, setSubscribeName] = useState<string>("");
  const [subscribeDescription, setSubscribeDescription] = useState<string>("");
  const [subscribeBeforePrice, setSubscribeBeforePrice] = useState<number>(0);
  const [subscribePrice, setSubscribePrice] = useState<number>(0);

  const [subscribeData, setSubscribeData] = useState<SubscribeData[]>([]);
  const [allFoods, setAllFoods] = useState<FoodInfo[][]>([]);

  const updateAllFoods = (round: number, selectedFoods: FoodInfo[]) => {
    setAllFoods((prevAllFoods) => {
      const updatedAllFoods = [...prevAllFoods];
      updatedAllFoods[round - 1] = selectedFoods;
      return updatedAllFoods;
    });
  };

  const updateSubscribeData = (
    subscribeDate: string,
    round: number,
    selectedFoods: FoodInfo[]
  ) => {
    setSubscribeData((prevData) => {
      const newData = prevData.filter((item) => item.subscribeRound !== round);
      return [
        ...newData,
        {
          subscribeDate: subscribeDate,
          subscribeRound: round,
          subscribeFood: selectedFoods.map((food) => food.foodId),
        },
      ].sort((a, b) => a.subscribeRound - b.subscribeRound);
    });
  };

  const handleMonthChange = (event: SelectChangeEvent) => {
    const newMonth = Number(event.target.value);
    setSubscribeMonth(newMonth);
  };

  useEffect(() => {
    const updatedTotalPrice = allFoods.reduce((acc, roundFoods) => {
      const roundTotal = roundFoods.reduce(
        (sum, food) => sum + food.foodPrice,
        0
      );
      return acc + roundTotal;
    }, 0);

    setSubscribeBeforePrice(updatedTotalPrice);
  }, [allFoods]);

  const { mutate: handleAddSubscribe } = useMutation({
    mutationFn: ({
      addSubscribeForm,
      storeId,
    }: {
      addSubscribeForm: AddSubscribeForm;
      storeId: StoreId;
    }) => sogoo.requestAddSubscribe(addSubscribeForm, storeId),
    onSuccess: async (response) => {
      console.log("구독 상품 등록 성공", response);
      navigate(`/seller/menus?store=${storeId}`);
    },
    onError: (error) => {
      console.error("구독 상품 등록 실패", error);
    },
  });

  const initiateAddSubscribe = (): void => {
    if (!storeId) {
      console.error("유효한 스토어 ID가 없습니다. 다시 시도해 주세요.");
      return;
    }

    switch (true) {
      case !subscribeName:
        toast.error("상품명을 입력해 주세요.");
        return;
      case !subscribeDescription:
        toast.error("상품 설명을 입력해 주세요.");
        return;
      case !subscribePrice:
        toast.error("판매가를 입력해 주세요.");
        return;
    }

    const emptyFoodCount = subscribeData.filter(
      (item) => item.subscribeFood.length === 0
    ).length;

    if (emptyFoodCount > 0) {
      toast.error(
        `${emptyFoodCount}개의 주차에 상품이 등록되지 않았습니다. 모든 주차에 최소 1개 이상의 상품을 추가해 주세요.`
      );
      return;
    }

    const addSubscribeForm: AddSubscribeForm = {
      subscribeName,
      subscribeDescription,
      subscribeBeforePrice,
      subscribePrice,
      subscribeProducts: subscribeData,
    };

    handleAddSubscribe({ addSubscribeForm, storeId });
  };

  return (
    <div className="w-[1100px] flex flex-col">
      <div className="flex flex-col justify-center items-center gap-8 mb-10">
        <h2 className="font-shilla text-5xl text-center">구독 상품 등록</h2>
        <div className="w-full flex flex-col justify-center items-center rounded-3xl bg-white p-10">
          <TextField
            required
            id="addSubscribeName"
            label="상품명"
            variant="outlined"
            onChange={(e) => setSubscribeName(e.target.value)}
            sx={{ width: "100%", marginBottom: "20px" }}
          />
          <TextField
            required
            id="addSubscribeDescription"
            label="상품 설명"
            variant="outlined"
            onChange={(e) => setSubscribeDescription(e.target.value)}
            sx={{ width: "100%", marginBottom: "20px" }}
          />
          <div className="w-full flex flex-col mb-5 p-2 border-[1px] border-gray-300 rounded">
            <Box sx={{ maxWidth: 120, margin: "2px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label1">월</InputLabel>
                <Select
                  labelId="demo-simple-select-label1"
                  id="demo-simple-select1"
                  label="Month"
                  value={subscribeMonth.toString()}
                  onChange={handleMonthChange}
                >
                  {[...Array(12)].map((_, index) => (
                    <MenuItem key={index} value={index + 1}>
                      {index + 1}월
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {[...Array(4)].map((_, index) =>
              storeId ? (
                <SubscribeCard
                  key={index}
                  storeId={storeId}
                  month={subscribeMonth}
                  round={index + 1}
                  onSubscribeDataChange={updateSubscribeData}
                  updateAllFoods={updateAllFoods}
                />
              ) : (
                <div key={index}>유효한 스토어 ID가 필요합니다.</div>
              )
            )}
          </div>
          <TextField
            id="addSubscribeBeforePrice"
            variant="outlined"
            label="원가"
            value={subscribeBeforePrice}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            sx={{ width: "100%", marginBottom: "20px" }}
          />
          <TextField
            required
            id="addSubscribePrice"
            label="판매가"
            variant="outlined"
            value={subscribePrice}
            onChange={(e) => {
              const inputPrice = Number(e.target.value);
              if (inputPrice > subscribeBeforePrice) {
                toast.warn(
                  "판매가는 원가를 초과할 수 없습니다. 원가로 설정됩니다."
                );
                setSubscribePrice(subscribeBeforePrice);
              } else {
                setSubscribePrice(inputPrice);
              }
            }}
            sx={{ width: "100%", marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            sx={{ width: "200px", alignSelf: "center" }}
            onClick={initiateAddSubscribe}
          >
            등록하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddSubscribe;
