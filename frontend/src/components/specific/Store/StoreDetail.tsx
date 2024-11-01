import MenuSelect from "./Detail/MenuSelect";
import { useState } from "react";

type Tab = "subscribe" | "foods" | "review";
interface TabProps {
  key: Tab;
  word: string;
}

const StoreDetail = () => {
  const [selected, setSelected] = useState("subscribe");

  const info = {
    storeId: 5,
    name: "혁준이네 반찬가게",
    description: "ㄹㅇ밥도둑",
    img: "https://cdn.pixabay.com/photo/2019/01/25/21/35/restaurant-3955372_1280.jpg",
  };

  const tabs: TabProps[] = [
    { key: "subscribe", word: "구독 상품 목록" },
    { key: "foods", word: "개별 상품 목록" },
    { key: "review", word: "리뷰" },
  ];

  const handleTabBar = (select: Tab) => {
    setSelected(select);
  };

  return (
    <div>
      <div className="grid grid-cols-2 h-[600px] gap-x-6">
        <img src={info.img} className="inline-block h-[400px] w-full" />
        {/* 상품선택 */}
        <div className="flex flex-col gap-y-3 py-4">
          <p className="text-2xl font-bold">{info.name}</p>
          <p className="text-slate-500 text-base">{info.description}</p>
          <div className="flex">
            <p className="basis-1/6 py-3">상품 선택</p>
            <MenuSelect />
          </div>
        </div>
      </div>
      {/* Tabbar */}
      <div className="grid grid-cols-3 text-center mt-10">
        {tabs.map((item) => (
          <div
            className={`py-5 ${
              selected === item.key ? "border border-black border-b-0 " : null
            }`}
            onClick={() => handleTabBar(item.key)}
          >
            {item.word}
          </div>
        ))}
      </div>
      {/* 선택에 따라서 보여지는 내용 분리 */}
    </div>
  );
};

export default StoreDetail;
