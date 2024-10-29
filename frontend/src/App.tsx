import { useLocation, Location } from "react-router-dom";
import "./index.css";
import Header from "./components/common/Header";
import PageRoutes from "./routes/PageRoutes";
import Footer from "./components/common/Footer";

function App() {
  const location: Location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {location.pathname !== "/sign" && <Header />}
      <main className="flex-grow">
        <PageRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
