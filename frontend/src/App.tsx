import { useLocation, Location } from "react-router-dom";
import "./index.css";
import Header from "./components/common/Header";
import PageRoutes from "./routes/PageRoutes";
import Footer from "./components/common/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LicenseInfo } from "@mui/x-license";

function App() {
  LicenseInfo.setLicenseKey(import.meta.env.VITE_MUI_LICENSE);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
  });
  const location: Location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        {location.pathname !== "/sign" && <Header />}
        <main className="flex flex-grow justify-center">
          <PageRoutes />
        </main>
        {location.pathname !== "/sign" && <Footer />}
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
