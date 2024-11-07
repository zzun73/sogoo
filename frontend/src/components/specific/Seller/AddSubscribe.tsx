import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SubscribeCard from "./MenuComponents/SubscribeCard";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SubscribeData {
  subscribeRound: number;
  subscribeFood: FoodInfo[];
}

const AddSubscribe: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storeId = Number(queryParams.get("store"));

  const [subscribeName, setSubscribeName] = useState<string>("");
  const [subscribeDescription, setSubscribeDescription] = useState<string>("");
  const [subscribeBeforePrice, setSubscribeBeforePrice] = useState<number>(0);
  const [subscribePrice, setSubscribePrice] = useState<number>(0);

  const now = new Date().getMonth() + 1;
  const [subscribeMonth, setSubscribeMonth] = useState<number>(now);

  const [subscribeData, setSubscribeData] = useState<SubscribeData[]>([]);

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
          subscribeFood: selectedFoods,
        },
      ].sort((a, b) => a.subscribeRound - b.subscribeRound);
    });
  };

  console.log(subscribeData);

  console.log(
    subscribeName,
    subscribeDescription,
    subscribeBeforePrice,
    subscribePrice,
    subscribeMonth
  );

  const handleMonthChange = (event: SelectChangeEvent) => {
    const newMonth = Number(event.target.value);
    setSubscribeMonth(newMonth);
  };

  return (
    <div className="w-full flex flex-col flex-grow bg-slate-200">
      <div className="flex flex-col justify-center items-center my-10 mx-[200px]">
        <h1 className="text-3xl font-bold mb-5">구독 상품 등록하기</h1>
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
            {[...Array(4)].map((_, index) => (
              <SubscribeCard
                key={index}
                storeId={storeId}
                month={subscribeMonth}
                round={index + 1}
                onSubscribeDataChange={updateSubscribeData}
              />
            ))}
          </div>
          <TextField
            required
            id="addSubscribeBeforePrice"
            label="원가"
            variant="outlined"
            onChange={(e) => setSubscribeBeforePrice(Number(e.target.value))}
            sx={{ width: "100%", marginBottom: "20px" }}
          />
          <TextField
            required
            id="addSubscribePrice"
            label="판매가"
            variant="outlined"
            onChange={(e) => setSubscribePrice(Number(e.target.value))}
            sx={{ width: "100%", marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            sx={{ width: "fit-content", alignSelf: "center" }}
          >
            등 록 하 기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddSubscribe;
