import { useLocation, Location } from "react-router-dom";
import "./index.css";
import Header from "./components/common/Header";
import PageRoutes from "./routes/PageRoutes";
import Footer from "./components/common/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();
  const location: Location = useLocation();

  console.log(location.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        {location.pathname !== "/sign" && <Header />}
        <main className={`flex-grow ${location.pathname === "/" ? "" : "px-[200px]"}`}>
          <PageRoutes />
        </main>
        <Footer />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
