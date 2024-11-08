import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RegisterStoreModal from "./RegisterStoreModal";
import { useGetMyStores } from "../../../../queries/queries";
import useRootStore from "../../../../stores";

interface StoreInfo {
  storeId: number;
  storeName: string;
}

const ChoiceStore = () => {
  const { selectedStoreId, setSelectedStoreId } = useRootStore();
  const [openStoreModal, setOpenStoreModal] = useState(false);

  const handleStoreModalOpen = () => {
    setOpenStoreModal(true);
  };

  const handleStoreModalClose = () => {
    setOpenStoreModal(false);
  };

  const results = useGetMyStores();
  const stores: StoreInfo[] | undefined = results.stores;

  useEffect(() => {
    if (stores && stores.length > 0) {
      const firstStoreId = stores[0].storeId;
      setSelectedStoreId(firstStoreId);
    }
  }, [stores]);

  const handleStoreClick = (storeId: number) => {
    setSelectedStoreId(storeId);
  };

  return (
    <div className="gap-y-5 w-full py-5 px-[200px]">
      <div className="flex space-x-2">
        {stores && stores.length > 0 ? (
          stores.map((store) => (
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
          ))
        ) : (
          <></>
        )}

        <Button
          variant="outlined"
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
    </div>
  );
};

export default ChoiceStore;
