import { Card, CardMedia, CardContent } from "@mui/material";
import formatters from "../../../../utils/formatters";
import { useGetStoreFoods } from "../../../../queries/queries";
import { useParams } from "react-router-dom";

const FoodList = () => {
  const { id } = useParams();
  const foods = useGetStoreFoods(Number(id));
  console.log(foods);

  if (!foods || foods.length === 0) {
    return (
      <div className="flex flex-col gap-y-5 min-h-80 mt-5 w-11/12 justify-center items-center">
        <p className="text-lg font-bold">등록된 반찬이 없습니다.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 gap-6 mx-3 my-5 w-full">
      {foods.map((food) => {
        const { foodName, foodDescription, foodImg, foodPrice, foodId } = food;
        const currency = formatters.formatToCurrency(foodPrice);
        return (
          <Card className="min-h-[230px]" key={foodId}>
            <CardMedia
              component="img"
              image={foodImg}
              alt={foodName}
              sx={{
                width: "100px",
                aspectRatio: "1 / 1",
                objectFit: "cover",
                margin: "auto",
                borderRadius: "50%",
              }}
            />
            <div className="flex flex-row justify-between px-4 items-center py-2"></div>
            <CardContent sx={{ marginTop: "0", paddingY: "0" }}>
              <p className="text-lg font-bold text-center">{foodName}</p>
              <p className="text-base text-slate-700 text-center">{currency}</p>
              <p className="text-sm my-2">{foodDescription}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default FoodList;
