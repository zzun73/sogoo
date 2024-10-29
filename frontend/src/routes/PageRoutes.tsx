import { Route, Routes } from "react-router-dom";

import SignPage from "../pages/Sign/SignPage";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/sign" element={<SignPage />} />
    </Routes>
  );
};

export default PageRoutes;
