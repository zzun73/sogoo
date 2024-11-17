import Box from "../../../common/Box";
import Button from "@mui/material/Button";

interface BestAndWorstProps {
  storeId: number;
}

const BestAndWorst = ({ storeId }: BestAndWorstProps) => {
  return (
    <Box className="flex flex-col w-full h-[300px] gap-y-3">
      <div>
        <p className="text-xl text-center font-bold">판매랭킹 Top 5</p>
      </div>
      <div className="flex justify-evenly items-center">
        <Button variant="contained" size="small">
          Best
        </Button>
        <Button variant="contained" size="small">
          Worst
        </Button>
      </div>
      <div className="bg-slate-300 h-full rounded-xl">
        <p>현재 선택된 가게: {storeId}</p>
      </div>
    </Box>
  );
};

export default BestAndWorst;
