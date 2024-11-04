import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const FoodSelect = () => {
  const [category, setCategory] = useState("");

  // 카테고리 선택
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  return (
    <div className="flex justify-end me-3">
      <FormControl className="w-64">
        <Select
          value={category}
          onChange={handleCategoryChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          className="h-10"
        >
          <MenuItem value="">
            <em>전체보기</em>
          </MenuItem>
          <MenuItem value="foods">
            <em>개별 상품</em>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FoodSelect;
