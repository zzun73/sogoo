import Box from "../../../common/Box";
import { useGetScheduledProduct } from "../../../../queries/queries";
import { Skeleton } from "@mui/material";
import { CiDeliveryTruck } from "react-icons/ci";
interface ScheduledProductsProps {
  storeId: number;
}
const SkeletonUI = () => {
  return (
    <Box className="flex flex-col items-center justify-between w-full h-[300px]">
      <Skeleton variant="text" width="150px" height={40} />
      <div className="w-full">
        {[...Array(7)].map((i, idx) => (
          <div key={`table${idx}`} className="grid grid-cols-3 gap-10">
            <Skeleton
              variant="text"
              width={!idx ? "100%" : "60%"}
              height={30}
              className="mx-auto"
            />
            <Skeleton
              variant="text"
              width={!idx ? "100%" : "60%"}
              height={30}
              className="mx-auto"
            />
            <Skeleton
              variant="text"
              width={!idx ? "100%" : "60%"}
              height={30}
              className="mx-auto"
            />
          </div>
        ))}
      </div>
    </Box>
  );
};

const ScheduledProducts = ({ storeId }: ScheduledProductsProps) => {
  const list = useGetScheduledProduct(storeId);

  if (!storeId || !list) {
    return <SkeletonUI />;
  }

  if (!list.length) {
    return (
      <Box className="flex flex-col items-center justify-center gap-4 w-full h-[300px]">
        <CiDeliveryTruck className="text-5xl text-gray-700" />
        <p className="text-lg text-gray-700">
          다음주 출고 예정인 상품이 없습니다.
        </p>
      </Box>
    );
  }

  const updatedList = list.map((item, idx) => {
    return { ...item, id: idx + 1 };
  });

  const table = {
    columns: [
      { field: "id", headerName: "순위" },
      { field: "foodName", headerName: "상품" },
      { field: "foodCnt", headerName: "수량" },
    ],
    rows: updatedList,
  };

  return (
    <Box className="w-full h-[300px] flex flex-col justify-between">
      <p className="text-xl text-center font-bold">다음주 출고 예정 상품</p>
      <div className="relative h-[250px] overflow-y-auto w-full">
        <table className="w-full" border={1} cellPadding="5" cellSpacing="0">
          <thead className="sticky top-0 bg-gray-50">
            <tr>
              {table.columns.map((column) => (
                <th key={column.field} className="text-base">
                  {column.headerName}{" "}
                  {column.field === "foodCnt" && <span></span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.id} className="text-center">
                <td className="text-sm text-center">{row.id}</td>
                <td className="text-sm text-center">{row.foodName}</td>
                <td className="text-sm text-center">{row.foodCnt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default ScheduledProducts;
