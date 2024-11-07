import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { dummyData } from "./MenuComponents/DummyMenus";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import FoodDetailModal from "./MenuComponents/FoodDetailModal";
import { useNavigate, useLocation } from "react-router-dom";

interface Food {
  foodId: number;
  foodName: string;
  foodDescription: string;
  foodPrice: number;
  foodImg: string;
}

const Menus: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storeId = queryParams.get("store");

  console.log(storeId);

  const menuLists = dummyData;
  const [activeView, setActiveView] = useState("전체 보기");
  const [openFoodModal, setOpenFoodModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

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
        ? menuLists.subscribes
        : [],
    foods:
      activeView === "전체 보기" || activeView === "개별 상품"
        ? menuLists.foods
        : [],
  };

  const goToAddFood = () => {
    navigate(`/seller/add/food?store=${storeId}`);
  };

  const goToAddSubscribe = () => {
    navigate(`/seller/add/subscribe?store=${storeId}`);
  };

  return (
    <div className="w-full flex flex-col flex-grow bg-slate-200">
      <div className="my-10 mx-[200px]">
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
          {filteredMenus.subscribes.length > 0 && (
            <>
              <h1 className="text-xl font-bold my-7">구독 상품</h1>
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
                {filteredMenus.subscribes.map((food, index) => (
                  <div key={food.subscribeId}>
                    <ListItem
                      secondaryAction={
                        <Button variant="text" size="small">
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
                              {food.subscribeName}
                            </span>
                            <br />
                            <span
                              style={{
                                textDecoration: "line-through",
                                marginRight: 5,
                              }}
                            >
                              {food.subscribeBeforePrice}
                            </span>
                            (월 {food.subscribePrice} 원)
                          </>
                        }
                        secondary={
                          <>
                            <div className="mt-5">
                              {food.subscribeDescription}
                            </div>
                          </>
                        }
                      />
                    </ListItem>
                    {index < filteredMenus.subscribes.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
            </>
          )}
          {filteredMenus.foods.length > 0 && (
            <>
              <h1 className="text-xl font-bold my-7">개별 상품</h1>
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
                {filteredMenus.foods.map((food, index) => (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menus;
