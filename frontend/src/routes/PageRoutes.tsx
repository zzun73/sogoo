import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignPage from "../pages/Sign/SignPage";

const PageRoutes = () => {
  return (
    <Routes>
      {/* Common Domain */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign" element={<SignPage />} />
    </Routes>
  );
};

export default PageRoutes;
