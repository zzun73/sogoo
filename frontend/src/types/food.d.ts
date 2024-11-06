type FoodId = number;
type FoodName = string;
type FoodPrice = number;
type FoodDescription = string;
type FoodImg = File | null;

interface AddFoodForm {
  foodName: string;
  foodPrice: number;
  foodDescription: string;
  img: File | null;
}
