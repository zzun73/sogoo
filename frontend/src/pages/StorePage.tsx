import { Outlet } from "react-router-dom";

const StorePage = () => {
  return (
    <div className="w-full my-10 mx-[200px]">
      <Outlet />
    </div>
  );
};

export default StorePage;
