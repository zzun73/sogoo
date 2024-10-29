import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";

const PageRoutes = () => {
  return (
    <Routes>
      {/* Common Domain */}
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default PageRoutes;
