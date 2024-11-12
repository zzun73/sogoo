import Box from "../../../common/Box";
import { useGetTodaySales } from "../../../../queries/queries";
import { Skeleton } from "@mui/material";

interface TodaySalesProps {
  storeId: number;
}

const SkeletonUI = () => {
  return (
    <Box className="flex flex-col items-center justify-between w-full h-[300px]">
      <Skeleton variant="text" width="150px" height={40} />
      <div className="w-full">
        {[...Array(7)].map((_, idx1) => (
          <div key={`table${idx1}`} className="grid grid-cols-5 gap-10">
            {[...Array(5)].map((_, idx2) => (
              <Skeleton
                key={`skeleton${idx1}-${idx2}`}
                variant="text"
                width={!idx1 ? "100%" : "60%"}
                height={30}
                className="mx-auto"
              />
            ))}
          </div>
        ))}
      </div>
    </Box>
  );
};

const TodaySalesStatus = ({ storeId }: TodaySalesProps) => {
  const list = useGetTodaySales(storeId);
  if (!list) {
    return <SkeletonUI />;
  }
  if (!list.length) {
    return (
      <Box className="flex flex-col items-center justify-center w-full h-[300px]">
        <p className="text-lg font-bold">당일 판매된 상품이 없습니다.</p>
      </Box>
    );
  }

  const updatedList = list.map((item, idx) => {
    return { ...item, id: idx + 1 };
  });

  const data = {
    columns: [
      { field: "id", headerName: "순위" },
      { field: "productName", headerName: "상품" },
      { field: "salesSum", headerName: "매출액" },
      { field: "price", headerName: "개당 가격" },
      {
        field: "productCnt",
        headerName: "수량 (단위 : 1개)",
        width: 140,
        maxWidth: 140,
      },
    ],
    rows: updatedList,
  };

  return (
    <Box className="w-full h-[300px] flex flex-col justify-between">
      <p className="text-xl text-center font-bold">당일 매출 현황</p>
      <div className="h-[250px] overflow-y-auto w-full">
        <table className="w-full" border={1} cellPadding="5" cellSpacing="0">
          <thead className="sticky top-0 bg-gray-50">
            <tr>
              {data.columns.map((column) => (
                <th key={column.field} className="text-base">
                  {column.headerName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.id} className="text-center">
                <td className="text-center text-sm">{row.id}</td>
                <td className="text-center text-sm">{row.productName}</td>
                <td className="text-center text-sm">
                  {row.salesSum.toLocaleString()} 원
                </td>
                <td className="text-center text-sm">
                  {row.price.toLocaleString()} 원
                </td>
                <td className="text-center text-sm">{row.productCnt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default TodaySalesStatus;
