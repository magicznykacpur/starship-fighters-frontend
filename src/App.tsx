import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import Header from "components/ui/header";
import Battle from "components/battle/battle";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-slate-200">
        <Header />
        <Battle />
      </div>
    </QueryClientProvider>
  );
}

export default App;
