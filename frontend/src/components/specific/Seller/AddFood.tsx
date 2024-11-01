import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AddFood = () => {
  const [foodName, setFoodName] = useState("");
  const [foodDescription, setFoodDescription] = useState("");
  const [foodPrice, setFoodPrice] = useState("");

  console.log(foodName, foodDescription, foodPrice);

  return (
    <div className="w-full flex flex-col flex-grow bg-slate-200">
      <div className="flex flex-col justify-center items-center my-10 mx-[200px]">
        <h1 className="text-3xl font-bold mb-5">개별 반찬 등록하기</h1>
        <div className="w-full flex flex-col justify-center rounded-3xl bg-white p-10">
          <TextField
            required
            id="addFoodDetailName"
            label="상품명"
            variant="outlined"
            onChange={(e) => setFoodName(e.target.value)}
            sx={{ width: "100%", marginBottom: "20px" }}
          />
          <TextField
            required
            id="addFoodDetailDescription"
            label="상품 설명"
            variant="outlined"
            onChange={(e) => setFoodDescription(e.target.value)}
            sx={{ width: "100%", marginBottom: "20px" }}
          />
          <TextField
            required
            id="addFoodDetailPrice"
            label="가격"
            variant="outlined"
            onChange={(e) => setFoodPrice(e.target.value)}
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

export default AddFood;
