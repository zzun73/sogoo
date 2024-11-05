import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const SubscribeCard: React.FC = () => {
  return (
    <div className="w-full flex flex-col p-2 justify-center">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <TextField
            required
            id="addSubscribeRound1"
            variant="outlined"
            sx={{ width: "50px" }}
          />
          <p className="text-lg ms-1">주차</p>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker />
        </LocalizationProvider>
      </div>
      <div className="w-full h-32 flex justify-center items-center border-[1px] border-gray-300 rounded px-2 cursor-pointer">
        <p className="text-base">반찬 추가하기</p>
      </div>
    </div>
  );
};

export default SubscribeCard;
