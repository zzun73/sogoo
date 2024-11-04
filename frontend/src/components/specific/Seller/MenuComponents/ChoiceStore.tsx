import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RegisterStoreModal from "./RegisterStoreModal";

const ChoiceStore = () => {
  const [openStoreModal, setOpenStoreModal] = useState<boolean>(false);

  const handleStoreModalOpen = () => {
    setOpenStoreModal(true);
  };

  const handleStoreModalClose = () => {
    setOpenStoreModal(false);
  };

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
          onClick={handleStoreModalOpen}
        >
          <Typography sx={{ fontSize: "30px", margin: 0 }}>+</Typography>
        </Button>
        <RegisterStoreModal
          open={openStoreModal}
          onClose={handleStoreModalClose}
        />
      </div>
    </div>
  );
};

export default ChoiceStore;
