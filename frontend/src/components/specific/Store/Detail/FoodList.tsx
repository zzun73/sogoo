import { Card, CardMedia, CardContent } from "@mui/material";
import formatters from "../../../../utils/formatters";
import { foodData } from "../../../../assets/dummyData";

const FoodList = () => {
  return (
    <div className="grid grid-cols-4 gap-6 my-5 w-full">
      {foodData.map((food) => {
        const { foodName, foodDescription, foodImg, foodPrice, foodId } = food;
        const currency = formatters.formatToCurrency(foodPrice);
        return (
          <Card className="h-[230px]" key={foodId}>
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
