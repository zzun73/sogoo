import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useGetAllFoods } from "../../../../queries/queries";

interface FoodSelectProps {
  foodId: number;
  storeId: number;
  handleClick: (event: SelectChangeEvent) => void;
}

const FoodSelect = ({ foodId, storeId, handleClick }: FoodSelectProps) => {
  const foods = useGetAllFoods(storeId);
  return (
    <div className="flex justify-end me-3">
      <FormControl className="w-64">
        <Select
          value={foodId.toString()}
          onChange={handleClick}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          className="h-10"
        >
          {!foods && (
            <MenuItem value={-1}>
              <em>전체보기</em>
            </MenuItem>
          )}
          {foods &&
            foods.map((food) => (
              <MenuItem value={food.foodId} key={`select-${food.foodId}`}>
                <em>{food.foodName}</em>
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FoodSelect;
