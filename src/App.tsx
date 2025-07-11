import Button from "@mui/material/Button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BlitzBattle from "components/blitz-battle/blitz-battle";
import ClassicBattle from "components/classic-battle/classic-battle";
import Header from "components/ui/header";
import { useState } from "react";
import { Slide, ToastContainer } from "react-toastify";

const queryClient = new QueryClient();
type GameMode = "classic" | "blitz";

function App() {
  const [mode, setMode] = useState<GameMode>('classic');

  const handleModeChange = (mode: GameMode) => setMode(mode);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-slate-200">
        <Header />

        <div className="grid grid-cols-2 gap-5 w-2/3 justify-self-center my-5">
          <Button
            size="large"
            variant="contained"
            onClick={() => handleModeChange("classic")}
          >
            Classic mode
          </Button>
          <Button
            size="large"
            variant="contained"
            onClick={() => handleModeChange("blitz")}
          >
            Blitz mode
          </Button>
        </div>

        {mode === "classic" && <ClassicBattle />}
        {mode === "blitz" && <BlitzBattle />}

        <ToastContainer position="bottom-right" transition={Slide} theme="colored" />
      </div>
    </QueryClientProvider>
  );
}

export default App;
