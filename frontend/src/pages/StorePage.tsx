import StoreCard from "../components/specific/Store/StoreCard";
import { useGetStoreList } from "../queries/queries";

const StorePage = () => {
  const { stores } = useGetStoreList();

  if (stores) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <p>등록된 가게가 없습니다.</p>
      </div>
    );
  }

  const test = [
    {
      storeId: 5,
      name: "혁준이네 반찬가게",
      description: "ㄹㅇ밥도둑",
      img: "https://cdn.pixabay.com/photo/2019/01/25/21/35/restaurant-3955372_1280.jpg",
    },
    {
      storeId: 4,
      name: "승현이네 반찬가게",
      description: "고기반찬 ~ 고기반찬 ~ 고기반찬이 너무 좋아 ~ !",
      img: "https://cdn.pixabay.com/photo/2019/01/25/21/35/restaurant-3955372_1280.jpg",
    },
    {
      storeId: 4,
      name: "승현이네 반찬가게",
      description: "고기반찬 ~ 고기반찬 ~ 고기반찬이 너무 좋아 ~ !",
      img: "https://cdn.pixabay.com/photo/2019/01/25/21/35/restaurant-3955372_1280.jpg",
    },
    {
      storeId: 4,
      name: "승현이네 반찬가게",
      description: "고기반찬 ~ 고기반찬 ~ 고기반찬이 너무 좋아 ~ !",
      img: "https://cdn.pixabay.com/photo/2019/01/25/21/35/restaurant-3955372_1280.jpg",
    },
    {
      storeId: 4,
      name: "승현이네 반찬가게",
      description: "고기반찬 ~ 고기반찬 ~ 고기반찬이 너무 좋아 ~ !",
      img: "https://cdn.pixabay.com/photo/2019/01/25/21/35/restaurant-3955372_1280.jpg",
    },
    {
      storeId: 4,
      name: "승현이네 반찬가게",
      description: "고기반찬 ~ 고기반찬 ~ 고기반찬이 너무 좋아 ~ !",
      img: "https://cdn.pixabay.com/photo/2019/01/25/21/35/restaurant-3955372_1280.jpg",
    },
    {
      storeId: 4,
      name: "승현이네 반찬가게",
      description: "고기반찬 ~ 고기반찬 ~ 고기반찬이 너무 좋아 ~ !",
      img: "https://cdn.pixabay.com/photo/2019/01/25/21/35/restaurant-3955372_1280.jpg",
    },
    {
      storeId: 4,
      name: "승현이네 반찬가게",
      description: "고기반찬 ~ 고기반찬 ~ 고기반찬이 너무 좋아 ~ !",
      img: "https://cdn.pixabay.com/photo/2019/01/25/21/35/restaurant-3955372_1280.jpg",
    },
  ];

  return (
    <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
      {test.map((store) => (
        <StoreCard store={store} key={store.storeId} />
      ))}
    </div>
  );
};

export default StorePage;
