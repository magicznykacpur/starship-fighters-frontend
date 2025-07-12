import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Battle from "components/battle/battle";
import Header from "components/ui/header";

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
