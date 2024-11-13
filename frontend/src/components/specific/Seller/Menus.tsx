import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import FoodDetailModal from "./MenuComponents/FoodDetailModal";
import { useNavigate } from "react-router-dom";
import { useGetAllMenus } from "../../../queries/queries";
import useRootStore from "../../../stores";

const Menus: React.FC = () => {
  const storeId = useRootStore().selectedStoreId;

  const { setSelectedSubscribeId } = useRootStore();

  const menuLists = useGetAllMenus(storeId);
  const [activeView, setActiveView] = useState("전체 보기");
  const [openFoodModal, setOpenFoodModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodInfo | null>(null);

  const navigate = useNavigate();

  const handleButtonClick = (view: string) => {
    setActiveView(view);
  };

  const handleFoodModalOpen = (food: (typeof menuLists.foods)[0]) => {
    setSelectedFood(food);
    setOpenFoodModal(true);
  };
  const handleFoodModalClose = () => {
    setSelectedFood(null);
    setOpenFoodModal(false);
  };

  const filteredMenus = {
    subscribes:
      activeView === "전체 보기" || activeView === "구독 상품"
        ? menuLists?.subscribes || []
        : [],
    foods:
      activeView === "전체 보기" || activeView === "개별 상품"
        ? menuLists?.foods || []
        : [],
  };

  const goToAddFood = () => {
    navigate(`/seller/add/food`);
  };

  const goToAddSubscribe = () => {
    navigate(`/seller/add/subscribe`);
  };

  const goToSubscribeDetail = (selectedSubscribeId: SelectedSubscribeId) => {
    setSelectedSubscribeId(selectedSubscribeId);
    navigate(`/seller/subscribe/detail`);
  };

  if (!menuLists) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  return (
    <div className="w-[1100px] flex flex-col gap-8 mb-10">
      <h2 className="font-shilla text-5xl text-center">판매 상품 관리</h2>
      <div className="">
        <div className="w-full h-40 flex flex-col justify-center rounded-t-3xl bg-white mb-4 px-10">
          <h1 className="text-xl font-bold mb-7">내 상품 목록</h1>
          <div className="w-full flex justify-between">
            <Stack spacing={2} direction="row">
              <Button
                variant={activeView === "전체 보기" ? "contained" : "outlined"}
                size="large"
                onClick={() => handleButtonClick("전체 보기")}
              >
                전체 보기
              </Button>
              <Button
                variant={activeView === "구독 상품" ? "contained" : "outlined"}
                size="large"
                onClick={() => handleButtonClick("구독 상품")}
              >
                구독 상품
              </Button>
              <Button
                variant={activeView === "개별 상품" ? "contained" : "outlined"}
                size="large"
                onClick={() => handleButtonClick("개별 상품")}
              >
                개별 상품
              </Button>
            </Stack>
            <Stack spacing={2} direction="row">
              <Button
                variant="outlined"
                size="large"
                onClick={goToAddSubscribe}
              >
                구독 상품 추가
              </Button>
              <Button variant="outlined" size="large" onClick={goToAddFood}>
                개별 상품 추가
              </Button>
            </Stack>
          </div>
        </div>
        <div className="w-full flex flex-col rounded-b-3xl bg-white px-10">
          {(activeView === "전체 보기" || activeView === "구독 상품") && (
            <>
              <h1 className="text-xl font-bold my-7">구독 상품</h1>
              {filteredMenus.subscribes.length > 0 ? (
                <List
                  sx={{
                    width: "100%",
                    padding: 0,
                    border: 1,
                    borderColor: "grey.300",
                    borderRadius: 2,
                    marginBottom: "28px",
                  }}
                >
                  {filteredMenus.subscribes.map(
                    (subscribe: SubscribeInfo, index: number) => (
                      <div key={subscribe.subscribeId}>
                        <ListItem
                          secondaryAction={
                            <Button
                              variant="text"
                              size="small"
                              onClick={() =>
                                goToSubscribeDetail(subscribe.subscribeId)
                              }
                            >
                              상세보기
                            </Button>
                          }
                        >
                          <ListItemText
                            primary={
                              <>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                  }}
                                >
                                  {subscribe.subscribeName}
                                </span>
                                <br />
                                <span
                                  style={{
                                    textDecoration: "line-through",
                                    marginRight: 5,
                                  }}
                                >
                                  {subscribe.subscribeBeforePrice}
                                </span>
                                (월 {subscribe.subscribePrice} 원)
                              </>
                            }
                            secondary={
                              <>
                                <span className="inline-block mt-5">
                                  {subscribe.subscribeDescription}
                                </span>
                              </>
                            }
                          />
                        </ListItem>
                        {index < filteredMenus.subscribes.length - 1 && (
                          <Divider />
                        )}
                      </div>
                    )
                  )}
                </List>
              ) : (
                <div className="w-full h-20 flex items-center border p-5 mb-7 border-slate-300 rounded">
                  <span>구독 상품이 아직 등록되지 않았습니다.</span>
                </div>
              )}
            </>
          )}
          {(activeView === "전체 보기" || activeView === "개별 상품") && (
            <>
              <h1 className="text-xl font-bold my-7">개별 상품</h1>
              {filteredMenus.foods.length > 0 ? (
                <List
                  sx={{
                    width: "100%",
                    padding: 0,
                    border: 1,
                    borderColor: "grey.300",
                    borderRadius: 2,
                    marginBottom: "28px",
                  }}
                >
                  {filteredMenus.foods.map((food: FoodInfo, index: number) => (
                    <div key={food.foodId}>
                      <ListItem
                        secondaryAction={
                          <>
                            <Button
                              variant="text"
                              size="small"
                              onClick={() => handleFoodModalOpen(food)}
                            >
                              상세보기
                            </Button>
                            <FoodDetailModal
                              open={openFoodModal}
                              onClose={handleFoodModalClose}
                              food={selectedFood}
                            />
                          </>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <img
                              src={food.foodImg}
                              alt={`${food.foodName} 이미지`}
                            />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${food.foodName} (${food.foodPrice}원)`}
                          secondary={food.foodDescription}
                        />
                      </ListItem>
                      {index < filteredMenus.foods.length - 1 && <Divider />}
                    </div>
                  ))}
                </List>
              ) : (
                <div className="w-full h-20 flex items-center border p-5 mb-7 border-slate-300 rounded">
                  <span>개별 상품이 아직 등록되지 않았습니다.</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menus;
