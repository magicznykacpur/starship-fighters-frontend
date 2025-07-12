import type { SelectChangeEvent } from "@mui/material";
import GameMode, {
  type GameModeType,
  type ScoreType,
} from "components/battle/game-mode";
import usePeople from "hooks/usePeople";
import useStarships from "hooks/useStarships";
import { useState } from "react";
import CardSelect, { type CardType } from "./card-select";
import PeopleBattleOutcome from "./people-battle-outcome";
import StarshipsBattleOutcome from "./starships-battle-outcome";

export default function Battle() {
  const { data: starshipsData } = useStarships();
  const { data: peopleData } = usePeople();

  const [gameMode, setGameMode] = useState<GameModeType>("single-player");
  const [score, setScore] = useState<ScoreType>({
    playerOne: 0,
    playerTwo: 0,
    roundFinished: false,
  });
  const [cardType, setCardType] = useState<CardType>("person");

  const handleCardTypeChange = (event: SelectChangeEvent) => {
    resetCards();
    setCardType(event.target.value as CardType);
  };

  const resetCards = () => {
    setScore({ ...score, roundFinished: false });
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <GameMode
        gameMode={gameMode}
        score={score}
        setGameMode={setGameMode}
        setScore={setScore}
      />

      <CardSelect cardType={cardType} setCardType={handleCardTypeChange} />

      {cardType === "starship" && starshipsData && (
        <StarshipsBattleOutcome
          starships={starshipsData.allStarships}
          score={score}
          setScore={setScore}
        />
      )}

      {cardType === "person" && peopleData && (
        <PeopleBattleOutcome
          people={peopleData.allPeople}
          score={score}
          setScore={setScore}
        />
      )}
    </div>
  );
}
