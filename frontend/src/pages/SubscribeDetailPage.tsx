import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useGetSubscribeDetail } from "../queries/queries";
import SubscribeCarousel from "../components/specific/Seller/MenuComponents/SubscribeCarousel";

const SubscribeDetail: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const subscribeId = Number(queryParams.get("item"));

  const itemDetailInfo = useGetSubscribeDetail(subscribeId);

  console.log(itemDetailInfo);

  return (
    <div className="w-full flex flex-col flex-grow bg-slate-200">
      <div className="my-10 mx-[200px]">
        <div className="w-full flex flex-col justify-center rounded-3xl bg-white mb-4 p-10">
          <h1 className="text-xl font-bold mb-5">
            {itemDetailInfo.subscribeName}
          </h1>
          <TextField
            id="subscribeDetailDescription"
            label="상품 설명"
            value={itemDetailInfo.subscribeDescription}
            InputLabelProps={{ shrink: true }}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            sx={{ width: "100%", marginBottom: "20px" }}
          />
          <SubscribeCarousel
            subscribeProducts={itemDetailInfo.subscribeProducts}
          />
          <TextField
            id="subscribeDetailBeforePrice"
            label="구독 전 상품 가격 총합"
            value={itemDetailInfo.subscribeBeforePrice}
            InputLabelProps={{ shrink: true }}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            sx={{ width: "100%", marginBottom: "20px" }}
          />
          <TextField
            id="subscribeDetailPrice"
            label="구독 가격"
            value={itemDetailInfo.subscribePrice}
            InputLabelProps={{ shrink: true }}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            sx={{ width: "100%", marginBottom: "20px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SubscribeDetail;
