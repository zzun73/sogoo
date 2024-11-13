import TextField from "@mui/material/TextField";
import { useGetSubscribeDetail } from "../queries/queries";
import SubscribeCarousel from "../components/specific/Seller/MenuComponents/SubscribeCarousel";
import useRootStore from "../stores";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import formatters from "../utils/formatters";

const SubscribeDetail: React.FC = () => {
  const subscribeId = useRootStore().selectedSubscribeId;

  const itemDetailInfo = useGetSubscribeDetail(subscribeId!);

  console.log(itemDetailInfo);

  const navigate = useNavigate();

  const goToBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full flex flex-col flex-grow">
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
            value={
              itemDetailInfo.subscribeBeforePrice !== undefined
                ? formatters.formatToCurrency(
                    itemDetailInfo.subscribeBeforePrice
                  )
                : "가격 정보 없음"
            }
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
            value={
              itemDetailInfo.subscribePrice !== undefined
                ? formatters.formatToCurrency(itemDetailInfo.subscribePrice)
                : "가격 정보 없음"
            }
            InputLabelProps={{ shrink: true }}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            sx={{ width: "100%", marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            size="large"
            sx={{ width: "fit-content", alignSelf: "center" }}
            onClick={goToBack}
          >
            돌 아 가 기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeDetail;
