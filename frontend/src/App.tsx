import "./index.css";
import Header from "./components/common/Header";
import PageRoutes from "./routes/PageRoutes";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <PageRoutes />
      </main>
    </div>
  );
}

export default App;
