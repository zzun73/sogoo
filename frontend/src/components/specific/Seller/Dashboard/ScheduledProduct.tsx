import { DataGridPro } from "@mui/x-data-grid-pro";
import Box from "../../../common/Box";

const ScheduledProducts = () => {
  const data = {
    columns: [
      { field: "id", headerName: "순위", width: 20, maxWidth: 30 },
      {
        field: "product",
        headerName: "상품",
        width: 200,
        maxWidth: 250,
        editable: false,
      },
      {
        field: "quantity",
        headerName: "수량 (단위 : 1개)",
        width: 200,
        maxWidth: 250,

        editable: false,
      },
    ],
    rows: [
      {
        id: 1,
        product: "Gold",
        quantity: 50,
      },
      {
        id: 2,
        product: "Silver",
        quantity: 200,
      },
      {
        id: 3,
        product: "Crude Oil",
        quantity: 500,
      },
      {
        id: 4,
        product: "Copper",
        quantity: 300,
      },
      {
        id: 5,
        product: "Natural Gas",
        quantity: 150,
      },
      {
        id: 6,
        product: "Platinum",
        quantity: 100,
      },
      {
        id: 7,
        product: "Palladium",
        quantity: 25,
      },
      {
        id: 8,
        product: "Corn",
        quantity: 800,
      },
      {
        id: 9,
        product: "Soybeans",
        quantity: 600,
      },
      {
        id: 10,
        product: "Wheat",
        quantity: 400,
      },
    ],
  };

  return (
    <Box className="w-full h-full flex flex-col justify-end">
      <p className="text-xl text-center font-bold">다음주 출고 예정 상품</p>
      <DataGridPro
        {...data}
        loading={data.rows.length === 0}
        rowHeight={30}
        disableColumnPinning
        className="w-full"
      />
    </Box>
  );
};

export default ScheduledProducts;
