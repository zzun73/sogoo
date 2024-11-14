import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RegisterStoreModal from "./RegisterStoreModal";
import { useGetMyStores } from "../../../../queries/queries";
import useRootStore from "../../../../stores";
import { useNavigate } from "react-router-dom";

interface StoreInfo {
  storeId: number;
  storeName: string;
}

const ChoiceStore = () => {
  const { selectedStoreId, setSelectedStoreId } = useRootStore();
  const [openStoreModal, setOpenStoreModal] = useState(false);

  const navigate = useNavigate();

  const handleStoreModalOpen = () => {
    setOpenStoreModal(true);
  };

  const handleStoreModalClose = () => {
    setOpenStoreModal(false);
  };

  const results = useGetMyStores();
  const stores: StoreInfo[] | undefined = results.stores;

  useEffect(() => {
    if (selectedStoreId) return;
    if (stores && stores.length > 0) {
      const firstStoreId = stores[0].storeId;
      setSelectedStoreId(firstStoreId);
    }
  }, [stores, selectedStoreId, setSelectedStoreId]);

  const handleStoreClick = (storeId: number) => {
    setSelectedStoreId(storeId);
    navigate("/seller");
  };

  const goToBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-w-[1100px] flex justify-between items-center py-5">
      <div className="flex space-x-2">
        {stores && stores.length > 0 ? (
          <div className="max-w-[850px] overflow-x-scroll whitespace-nowrap space-x-1">
            {stores.map((store) => (
              <Button
                key={store.storeId}
                variant={
                  selectedStoreId === store.storeId ? "contained" : "outlined"
                }
                sx={{
                  minWidth: "100px",
                  minHeight: "50px",
                }}
                onClick={() => handleStoreClick(store.storeId)}
              >
                <Typography sx={{ fontSize: "18px", margin: 0 }}>
                  {store.storeName}
                </Typography>
              </Button>
            ))}
          </div>
        ) : (
          <></>
        )}

        <Button
          variant="text"
          sx={{ minWidth: "150px", minHeight: "50px" }}
          onClick={handleStoreModalOpen}
        >
          <Typography sx={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>
            가게 신규 등록
          </Typography>
        </Button>

        <RegisterStoreModal
          open={openStoreModal}
          onClose={handleStoreModalClose}
        />
      </div>
      <Button variant="outlined" onClick={goToBack}>
        뒤로가기
      </Button>
    </div>
  );
};

export default ChoiceStore;
