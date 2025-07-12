import Button from "@mui/material/Button";

export type GameModeType = "single-player" | "two-players";
export type ScoreType = {
  playerOne: number;
  playerTwo: number;
  roundFinished: boolean;
};

type GameModeProps = {
  gameMode: GameModeType;
  score: ScoreType;
  setGameMode: (mode: GameModeType) => void;
};

export default function GameMode({
  gameMode,
  score,
  setGameMode,
}: GameModeProps) {
  const pickColor = (scoreOne: number, scoreTwo: number) => {
    if (scoreOne === scoreTwo) return "text-blue-500";
    if (scoreOne > scoreTwo) return "text-emerald-700";
    if (scoreTwo > scoreOne) return "text-rose-700";
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        <Button
          variant="outlined"
          disabled={gameMode === "single-player"}
          onClick={() => setGameMode("single-player")}
        >
          Single player
        </Button>
        <Button
          variant="outlined"
          disabled={gameMode === "two-players"}
          onClick={() => setGameMode("two-players")}
        >
          Two players
        </Button>
      </div>

      {gameMode === "two-players" && (
        <div className="flex justify-around w-full mt-5">
          <div className="text-2xl">
            Player 1:
            <strong
              className={`ml-2 ${pickColor(score.playerOne, score.playerTwo)}`}
            >
              {score.playerOne}
            </strong>
          </div>
          <div className="text-2xl">
            Player 2:
            <strong
              className={`ml-2 ${pickColor(score.playerTwo, score.playerOne)}`}
            >
              {score.playerTwo}
            </strong>
          </div>
        </div>
      )}
    </>
  );
}
