interface AddFoodForm {
  foodName: string;
  foodPrice: number;
  foodDescription: string;
  img: File | null;
}

interface FoodInfo {
  foodId: number;
  foodName: string;
  foodDescription: string;
  foodPrice: number;
  foodImg: string;
}
