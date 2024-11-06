import Box from "../../../common/Box";

const TodaySalesStatus = () => {
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
    rows: [
      {
        id: 1,
        productName: "불고기",
        salesSum: 130000,
        price: 13000,
        productCnt: 10,
      },
      {
        id: 2,
        productName: "제육볶음",
        salesSum: 91000,
        price: 7000,
        productCnt: 13,
      },
      {
        id: 3,
        productName: "김치",
        salesSum: 63000,
        price: 9000,
        productCnt: 7,
      },
      {
        id: 4,
        productName: "된장찌개",
        salesSum: 54000,
        price: 6000,
        productCnt: 9,
      },
      {
        id: 5,
        productName: "비빔밥",
        salesSum: 80000,
        price: 8000,
        productCnt: 10,
      },
      {
        id: 6,
        productName: "잡채",
        salesSum: 72000,
        price: 9000,
        productCnt: 8,
      },
      {
        id: 7,
        productName: "콩나물무침",
        salesSum: 32000,
        price: 4000,
        productCnt: 8,
      },
      {
        id: 8,
        productName: "오이무침",
        salesSum: 45000,
        price: 5000,
        productCnt: 9,
      },
      {
        id: 9,
        productName: "계란말이",
        salesSum: 78000,
        price: 6500,
        productCnt: 12,
      },
      {
        id: 10,
        productName: "닭볶음탕",
        salesSum: 150000,
        price: 15000,
        productCnt: 10,
      },
    ],
  };

  return (
    <Box className="w-full h-[300px] flex flex-col justify-between">
      <p className="text-xl text-center font-bold">당일 매출 현황</p>
      <div className="max-h-[230px] overflow-y-auto w-full">
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
