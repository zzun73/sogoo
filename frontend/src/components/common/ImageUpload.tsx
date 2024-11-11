import React, { useRef, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
  selectedImage: string | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, selectedImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError("");

    if (file) {
      // 파일 크기 제한 (5MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("파일 크기는 10MB 이하여야 합니다.");
        return;
      }

      // 이미지 파일 형식 검사
      if (!file.type.startsWith("image/")) {
        setError("이미지 파일만 업로드 가능합니다.");
        return;
      }

      onImageSelect(file);
    }
  };

  const handleRemoveImage = () => {
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Box>
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />

      {!selectedImage ? (
        <Button variant="outlined" onClick={handleClick} startIcon={<ImageIcon />} fullWidth sx={{ height: "250px" }}>
          이미지 업로드
        </Button>
      ) : (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "250px",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <img
            src={selectedImage}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <Button
            onClick={handleRemoveImage}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              minWidth: "auto",
              p: 0.5,
              bgcolor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            <CloseIcon />
          </Button>
        </Box>
      )}

      {error && (
        <Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default ImageUpload;
