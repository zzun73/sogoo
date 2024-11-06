import Box from "../../../common/Box";

const ScheduledProducts = () => {
  const data = {
    columns: [
      { field: "id", headerName: "순위" },
      { field: "product", headerName: "상품" },
      { field: "quantity", headerName: "수량" },
    ],
    rows: [
      { id: 1, product: "Gold", quantity: 50 },
      { id: 2, product: "Silver", quantity: 200 },
      { id: 3, product: "Crude Oil", quantity: 500 },
      { id: 4, product: "Copper", quantity: 300 },
      { id: 5, product: "Natural Gas", quantity: 150 },
      { id: 6, product: "Platinum", quantity: 100 },
      { id: 7, product: "Palladium", quantity: 25 },
      { id: 8, product: "Corn", quantity: 800 },
      { id: 9, product: "Soybeans", quantity: 600 },
      { id: 10, product: "Wheat", quantity: 400 },
    ],
  };

  return (
    <Box className="w-full h-[300px] flex flex-col justify-between">
      <p className="text-xl text-center font-bold">다음주 출고 예정 상품</p>
      <div className="relative max-h-[230px] overflow-y-auto w-full">
        <table className="w-full" border={1} cellPadding="5" cellSpacing="0">
          <thead className="sticky top-0 bg-gray-50">
            <tr>
              {data.columns.map((column) => (
                <th key={column.field} className="text-base">
                  {column.headerName}{" "}
                  {column.field === "quentity" && <span></span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.id} className="text-center">
                <td className="text-sm text-center">{row.id}</td>
                <td className="text-sm text-center">{row.product}</td>
                <td className="text-sm text-center">{row.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default ScheduledProducts;
