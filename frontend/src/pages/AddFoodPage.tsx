import { useState, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useMutation } from "@tanstack/react-query";
import sogoo from "../services/sogoo";
import { useNavigate } from "react-router-dom";
import useRootStore from "../stores";

const AddFood: React.FC = () => {
  const storeId = useRootStore().selectedStoreId;

  console.log(storeId);

  const navigate = useNavigate();

  const [foodName, setFoodName] = useState<string>("");
  const [foodDescription, setFoodDescription] = useState<string>("");
  const [foodPrice, setFoodPrice] = useState<number>(0);
  const [foodImg, setFoodImg] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoodImg(file);

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

  const { mutate: handleAddFood } = useMutation({
    mutationFn: ({
      addFoodForm,
      storeId,
    }: {
      addFoodForm: AddFoodForm;
      storeId: StoreId;
    }) => sogoo.requestAddFood(addFoodForm, storeId),
    onSuccess: async (response) => {
      console.log("개별상품 등록 성공", response);
      navigate(`/seller/menus?store=${storeId}`);
    },
    onError: (error) => {
      console.error("개별상품 등록 실패", error);
    },
  });

  const initiateAddFood = (): void => {
    if (!storeId) {
      console.error("유효한 스토어 ID가 없습니다. 다시 시도해 주세요.");
      return;
    }

    switch (true) {
      case !foodName:
        alert("상품명을 입력해 주세요.");
        return;
      case !foodImg:
        alert("상품 이미지를 등록해 주세요");
        return;
      case !foodPrice:
        alert("판매가를 입력해 주세요.");
        return;
      case !foodDescription:
        alert("상품 설명을 입력해 주세요.");
        return;
    }

    const addFoodForm: AddFoodForm = {
      foodName,
      foodPrice,
      foodDescription,
      img: foodImg,
    };

    handleAddFood({ addFoodForm, storeId });
  };

  return (
    <div className="w-full flex flex-col flex-grow bg-slate-200">
      <div className="flex flex-col justify-center items-center my-10 mx-[200px]">
        <h1 className="text-3xl font-bold mb-5">개별 반찬 등록하기</h1>
        <div className="w-full flex flex-col justify-center items-center rounded-3xl bg-white p-10">
          <TextField
            required
            id="addFoodDetailName"
            label="상품명"
            variant="outlined"
            onChange={(e) => setFoodName(e.target.value)}
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
                className="w-fit max-h-72"
              />
            ) : (
              <span className="text-gray-500">이미지 등록</span>
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
            id="addFoodDetailDescription"
            label="상품 설명"
            variant="outlined"
            onChange={(e) => setFoodDescription(e.target.value)}
            sx={{ width: "100%", marginBottom: "20px" }}
          />
          <TextField
            required
            id="addFoodDetailPrice"
            label="가격"
            variant="outlined"
            onChange={(e) => setFoodPrice(Number(e.target.value))}
            sx={{ width: "100%", marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            sx={{ width: "fit-content", alignSelf: "center" }}
            onClick={initiateAddFood}
          >
            등 록 하 기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
