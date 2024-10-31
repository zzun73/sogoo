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

const Menus = () => {
  const menuLists = dummyData;
  const [activeView, setActiveView] = useState("전체 보기");

  const handleButtonClick = (view: string) => {
    setActiveView(view);
  };

  const filteredMenus = {
    subscribes: activeView === "전체 보기" || activeView === "구독 상품" ? menuLists.subscribes : [],
    foods: activeView === "전체 보기" || activeView === "개별 상품" ? menuLists.foods : [],
  };

  return (
    <div className="w-full flex flex-col flex-grow bg-slate-200">
      <div className="my-10 mx-[200px]">
        <div className="w-full h-40 flex flex-col justify-center rounded-t-3xl bg-white mb-4 px-10">
          <h1 className="text-xl font-bold mb-7">내 상품 목록</h1>
          <div className="w-full flex justify-between">
            <Stack spacing={2} direction="row">
              <Button variant={activeView === "전체 보기" ? "contained" : "outlined"} size="large" onClick={() => handleButtonClick("전체 보기")}>
                전체 보기
              </Button>
              <Button variant={activeView === "구독 상품" ? "contained" : "outlined"} size="large" onClick={() => handleButtonClick("구독 상품")}>
                구독 상품
              </Button>
              <Button variant={activeView === "개별 상품" ? "contained" : "outlined"} size="large" onClick={() => handleButtonClick("개별 상품")}>
                개별 상품
              </Button>
            </Stack>
            <Stack spacing={2} direction="row">
              <Button variant="outlined" size="large">
                구독 상품 추가
              </Button>
              <Button variant="outlined" size="large">
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
                      <ListItemText primary={`${food.subscribeName} (월 ${food.subscribePrice}원)`} secondary={food.subscribeDescription} />
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
                        <Button variant="text" size="small">
                          상세보기
                        </Button>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <img src={food.foodImg} alt={`${food.foodName} 이미지`} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={`${food.foodName} (${food.foodPrice}원)`} secondary={food.foodDescription} />
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
