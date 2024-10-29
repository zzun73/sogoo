import { useLocation, Location } from "react-router-dom";
import "./index.css";
import Header from "./components/common/Header";
import PageRoutes from "./routes/PageRoutes";

function App() {
  const location: Location = useLocation();

  return (
    <>
      {location.pathname !== "/sign" && <Header />}
      <PageRoutes />
    </>
  );
}

export default App;
