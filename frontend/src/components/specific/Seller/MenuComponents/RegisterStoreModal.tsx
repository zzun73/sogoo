import { useState, ChangeEvent } from "react";
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

interface RegisterStoreModalProps {
  open: boolean;
  onClose: () => void;
}

const RegisterStoreModal: React.FC<RegisterStoreModalProps> = ({
  open,
  onClose,
}) => {
  const [storeName, setStoreName] = useState<string>("");
  const [storeAddress, setStoreAddress] = useState<string>("");
  const [storeDescription, setStoreDescription] = useState<string>("");
  const [storeImg, setStoreImg] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  console.log(storeName, storeImg, storeAddress, storeDescription);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStoreImg(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById("imageUploadInput")?.click();
  };

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
          required
          id="storeName"
          label="가게명"
          variant="outlined"
          onChange={(e) => setStoreName(e.target.value)}
          sx={{ width: "100%", marginBottom: "20px" }}
        />
        <div
          className="w-80 h-80 mb-5 flex justify-center items-center border border-gray-300 cursor-pointer"
          onClick={handleImageClick}
        >
          {previewImage ? (
            <img
              src={previewImage}
              alt="미리보기"
              className="w-fit object-cover"
            />
          ) : (
            <span className="text-gray-500">가게 이미지 등록</span>
          )}
        </div>
        <input
          type="file"
          id="imageUploadInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        <TextField
          required
          id="storeAddress"
          label="가게 주소"
          variant="outlined"
          onChange={(e) => setStoreAddress(e.target.value)}
          sx={{ width: "100%", marginBottom: "20px" }}
        />
        <TextField
          required
          id="storeDescription"
          label="가게 설명"
          variant="outlined"
          onChange={(e) => setStoreDescription(e.target.value)}
          sx={{ width: "100%", marginBottom: "20px" }}
        />
        <Button
          variant="contained"
          sx={{ width: "fit-content", alignSelf: "center" }}
        >
          등 록 하 기
        </Button>
      </Box>
    </Modal>
  );
};

export default RegisterStoreModal;
