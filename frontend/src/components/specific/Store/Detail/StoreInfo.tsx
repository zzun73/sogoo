import MenuSelect from "./MenuSelect";

interface StoreInfo {
  storeId: number;
  name: string;
  description: string;
  img: string;
}

const StoreInfo = () => {
  const info: StoreInfo = {
    storeId: 5,
    name: "혁준이네 반찬가게",
    description: "ㄹㅇ밥도둑",
    img: "https://cdn.pixabay.com/photo/2019/01/25/21/35/restaurant-3955372_1280.jpg",
  };

  return (
    <div className="grid grid-cols-2 h-[500px] gap-x-6">
      <img src={info.img} className="inline-block h-[400px] w-full" />
      <div className="flex flex-col gap-y-3 py-4">
        <p className="text-2xl font-bold">{info.name}</p>
        <p className="text-slate-500 text-base">{info.description}</p>
        <div className="flex">
          <p className="basis-1/6 py-3">상품 선택</p>
          <MenuSelect />
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;
