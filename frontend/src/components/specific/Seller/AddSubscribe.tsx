import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SubscribeCard from "./MenuComponents/SubscribeCard";
import { useLocation } from "react-router-dom";

const AddSubscribe: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storeId = Number(queryParams.get("store"));

  const [subscribeName, setSubscribeName] = useState<string>("");
  const [subscribeDescription, setSubscribeDescription] = useState<string>("");
  const [subscribeBeforePrice, setSubscribeBeforePrice] = useState<number>(0);
  const [subscribePrice, setSubscribePrice] = useState<number>(0);

  console.log(
    subscribeName,
    subscribeDescription,
    subscribeBeforePrice,
    subscribePrice
  );

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
            {[...Array(4)].map((_, index) => (
              <SubscribeCard key={index} storeId={storeId} />
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
