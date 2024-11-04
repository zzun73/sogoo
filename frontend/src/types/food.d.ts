interface AddFoodForm {
  data: {
    foodName: string;
    foodPrice: number;
    foodDescription: string;
  };
  img: File | null;
}
