import { useState } from "react";
import Box from "../../../common/Box";
import Button from "@mui/material/Button";
import { useGetMenuRankList } from "../../../../queries/queries";

interface BestAndWorstProps {
  storeId: number;
}

const BestAndWorst = ({ storeId }: BestAndWorstProps) => {
  const menuRankList = useGetMenuRankList(storeId);
  const [selectedView, setSelectedView] = useState<"best" | "worst">("best");

  console.log(menuRankList);

  const positiveRankList = menuRankList?.positiveLankList || [];
  const negativeRankList = menuRankList?.negativeLankList || [];

  return (
    <Box className="flex flex-col w-full h-[300px] gap-y-3">
      <div>
        <p className="text-xl text-center font-bold">리뷰 랭킹 Top 5</p>
      </div>
      <div className="flex justify-evenly items-center">
        <Button
          variant={selectedView === "best" ? "contained" : "outlined"}
          size="small"
          onClick={() => setSelectedView("best")}
        >
          Best
        </Button>
        <Button
          variant={selectedView === "worst" ? "contained" : "outlined"}
          size="small"
          onClick={() => setSelectedView("worst")}
        >
          Worst
        </Button>
      </div>
      <div className="flex flex-col justify-evenly h-full border-2 border-slate-300 rounded-xl px-2">
        {selectedView === "best" ? (
          positiveRankList.length > 0 ? (
            positiveRankList.map((item, index) => (
              <p key={index} className="text-lg font-bold">
                {index + 1}위 : {item}
              </p>
            ))
          ) : (
            <p className="text-center">Best 데이터가 없습니다.</p>
          )
        ) : negativeRankList.length > 0 ? (
          negativeRankList.map((item, index) => (
            <p key={index} className="text-lg font-bold">
              {index + 1}위 : {item}
            </p>
          ))
        ) : (
          <p className="text-center">Worst 데이터가 없습니다.</p>
        )}
      </div>
    </Box>
  );
};

export default BestAndWorst;
