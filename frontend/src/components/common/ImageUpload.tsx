import React, { useRef, useState, useEffect, DragEvent } from "react";
import { Button, Box, Typography } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
  selectedImage: string | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, selectedImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  const validateAndProcessFile = (file: File) => {
    setError("");

    // 파일 크기 제한 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("파일 크기는 10MB 이하여야 합니다.");
      return false;
    }

    // 이미지 파일 형식 검사
    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 업로드 가능합니다.");
      return false;
    }

    // 이전 URL 객체가 있다면 정리
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }

    // 새로운 URL 객체 생성 및 저장
    const newObjectUrl = URL.createObjectURL(file);
    setObjectUrl(newObjectUrl);
    onImageSelect(file);
    return true;
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleRemoveImage = () => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };

  const getUploadBoxStyles = () => {
    const baseStyles = {
      height: "250px",
      border: "2px dashed",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      transition: "all 0.2s ease-in-out",
      cursor: "pointer",
    };

    if (isDragging) {
      return {
        ...baseStyles,
        borderColor: "primary.main",
        backgroundColor: "action.hover",
        transform: "scale(1.01)",
      };
    }

    return {
      ...baseStyles,
      borderColor: "grey.300",
      "&:hover": {
        borderColor: "primary.main",
        backgroundColor: "action.hover",
      },
    };
  };

  return (
    <Box>
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />

      {!selectedImage ? (
        <Box
          onClick={handleClick}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={getUploadBoxStyles()}
        >
          <FileUploadIcon color={isDragging ? "primary" : "action"} sx={{ fontSize: 40 }} />
          <Typography variant="body1" color={isDragging ? "primary.main" : "text.secondary"} sx={{ paddingX: "10px", textAlign: "center" }}>
            이미지를 드래그하여 업로드하거나 클릭하세요
          </Typography>
          <Typography variant="caption" color="text.secondary">
            최대 10MB, 이미지 파일만 가능
          </Typography>
        </Box>
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
