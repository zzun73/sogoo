// FoodDetailModal.tsx
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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

interface Food {
  foodId: number;
  foodName: string;
  foodDescription: string;
  foodPrice: number;
  foodImg: string;
}

interface FoodDetailModalProps {
  open: boolean;
  onClose: () => void;
  food: Food | null;
}

const FoodDetailModal: React.FC<FoodDetailModalProps> = ({
  open,
  onClose,
  food,
}) => {
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
        <TextField
          id="foodDetailName"
          label="상품명"
          defaultValue={food?.foodName}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          sx={{ width: "100%", marginBottom: "20px" }}
        />
        <img
          className="w-80 h-80 mb-5 flex justify-center"
          src={food?.foodImg}
          alt={`${food?.foodName} 이미지`}
        />
        <TextField
          id="foodDetailDescription"
          label="상품 설명"
          defaultValue={food?.foodDescription}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          sx={{ width: "100%", marginBottom: "20px" }}
        />
        <TextField
          id="foodDetailPrice"
          label="가격"
          defaultValue={food?.foodPrice}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          sx={{ width: "100%", marginBottom: "20px" }}
        />
        <Button variant="contained" color="error">
          삭 제 하 기
        </Button>
      </Box>
    </Modal>
  );
};

export default FoodDetailModal;
