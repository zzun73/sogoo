import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useGetFoodListForSubscribe } from "../../../../queries/queries";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  p: 4,
};

interface PlusFoodProps {
  open: boolean;
  onClose: () => void;
  storeId: number;
}

const PlusFood: React.FC<PlusFoodProps> = ({ open, onClose, storeId }) => {
  console.log(storeId);

  const { foods } = useGetFoodListForSubscribe(storeId);

  console.log(foods);

  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box
        sx={{
          ...style,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "10px",
        }}
      >
        <div className="w-full h-20 border-2 border-slate-400"></div>
      </Box>
    </Modal>
  );
};

export default PlusFood;
