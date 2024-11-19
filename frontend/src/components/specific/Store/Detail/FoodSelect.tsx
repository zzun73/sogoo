import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useParams } from "react-router-dom";
import { useGetStoreFoods } from "../../../../queries/queries";

interface FoodSelectProps {
  selectedId: number;
  handleClick: (event: SelectChangeEvent) => void;
}

const FoodSelect = ({ selectedId, handleClick }: FoodSelectProps) => {
  const { id } = useParams();
  const foods = useGetStoreFoods(Number(id));

  return (
    <div className="flex justify-end me-3">
      <FormControl className="w-64">
        <Select
          value={selectedId.toString()}
          onChange={handleClick}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          className="h-10"
        >
          <MenuItem value={-1}>
            <em>전체보기</em>
          </MenuItem>
          {foods.map((food) => (
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
