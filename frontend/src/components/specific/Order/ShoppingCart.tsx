import { useState } from "react";
import SubscribeCart from "./ShoppingCart/SubscribeCart";
import FoodCart from "./ShoppingCart/FoodCart";

const ShoppingCart = () => {
  return (
    <div>
      <h2 className="text-5xl font-shilla text-center">장바구니</h2>
      <div className="min-w-[800px] my-10 flex flex-col gap-4">
        <div className="flex flex-col gap-8 w-full p-8 rounded-t-3xl bg-white">
          <h3 className="text-xl font-bold">🧾 구독 상품</h3>
        </div>
        <SubscribeCart />
      </div>
      <div className="min-w-[800px] my-10 flex flex-col gap-4">
        <div className="flex flex-col gap-8 w-full p-8 rounded-t-3xl bg-white">
          <h3 className="text-xl font-bold">🧾 반찬 상품</h3>
        </div>
        <FoodCart />
      </div>
    </div>
  );
};

export default ShoppingCart;
