import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RegisterStoreModal from "./RegisterStoreModal";
import { useGetMyStores } from "../../../../queries/queries";

interface StoreInfo {
  storeId: string;
  storeName: string;
}

interface ChoiceStoreProps {
  onStoreSelect: (storeId: string | null) => void;
}

const ChoiceStore: React.FC<ChoiceStoreProps> = ({ onStoreSelect }) => {
  const [openStoreModal, setOpenStoreModal] = useState<boolean>(false);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

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
      onStoreSelect(firstStoreId);
    }
  }, [stores]);

  const handleStoreClick = (storeId: string) => {
    setSelectedStoreId(storeId);
    onStoreSelect(storeId);
  };

  return (
    <div className="w-screen p-5">
      <div className="flex space-x-2">
        {stores && stores.length > 0 ? (
          stores.map((store) => (
            <Button
              key={store.storeId}
              variant={
                selectedStoreId === store.storeId ? "contained" : "outlined"
              }
              sx={{ minWidth: "200px", minHeight: "50px" }}
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
          sx={{ minWidth: "200px", minHeight: "50px" }}
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
