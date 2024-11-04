import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ChoiceStore = () => {
  return (
    <div className="w-screen p-5">
      <div className="flex">
        <Button
          variant="contained"
          sx={{ minWidth: "200px", minHeight: "50px" }}
        >
          <Typography sx={{ fontSize: "18px", margin: 0 }}>가게 1</Typography>
        </Button>
        <Button
          variant="outlined"
          sx={{ minWidth: "200px", minHeight: "50px" }}
        >
          <Typography sx={{ fontSize: "30px", margin: 0 }}>+</Typography>
        </Button>
      </div>
    </div>
  );
};

export default ChoiceStore;
