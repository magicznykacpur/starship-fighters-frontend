import { Button, type SelectChangeEvent } from "@mui/material";
import StarshipCard from "components/cards/starship-card";
import ResourceControl from "components/battle/resource-control";
import { starshipResources } from "constants/resources";
import { useState } from "react";
import type {
  Starship,
  StarshipCardType,
  StarshipResources,
} from "types/starships";
import { getRandomInt } from "utils/random-numbers";
import type { ScoreType } from "./game-mode";

type StarshipsBattleOutcomeProps = {
  starships: Starship[];
  score: ScoreType;
  setScore: (score: ScoreType) => void;
};

export default function StarshipsBattleOutcome({
  starships,
  score,
  setScore,
}: StarshipsBattleOutcomeProps) {
  const [prevIndex, setPrevIndex] = useState<number | undefined>();
  const [cards, setCards] = useState<StarshipCardType[]>([]);
  const [resource, setResource] = useState<StarshipResources | "">("");

  const handleResourceTypeChange = (event: SelectChangeEvent) => {
    setResource(event.target.value as StarshipResources);
  };

  const handleResetCards = () => {
    setCards([]);
    setScore({ ...score, roundFinished: false });
  };

  const selectRandomStarship = () => {
    const maxRange = starships.length;

    const randomIndex = getRandomInt(0, maxRange, prevIndex);
    setPrevIndex(randomIndex);

    setCards([...cards, { starship: starships[randomIndex] }]);
  };

  const decideWinner = () => {
    if (
      cards[0].starship[resource as StarshipResources] >
      cards[1].starship[resource as StarshipResources]
    ) {
      !score.roundFinished &&
        setScore({
          ...score,
          playerOne: score.playerOne + 1,
          roundFinished: true,
        });

      setCards([
        { ...cards[0], won: true },
        { ...cards[1], won: false },
      ]);
    } else {
      !score.roundFinished &&
        setScore({
          ...score,
          playerTwo: score.playerTwo + 1,
          roundFinished: true,
        });

      setCards([
        { ...cards[0], won: false },
        { ...cards[1], won: true },
      ]);
    }
  };

  const isGameReady = cards.length === 2;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-2 gap-5">
        <Button
          variant="contained"
          color="success"
          onClick={selectRandomStarship}
          disabled={isGameReady}
        >
          Pick random starship
        </Button>
        <Button variant="contained" color="success" onClick={handleResetCards}>
          Reset cards
        </Button>
      </div>

      <div className="flex justify-between mt-10">
        {cards.map((card) => (
          <StarshipCard
            key={card.starship.id}
            starship={card.starship}
            {...(card.won !== undefined && {
              ...{ background: card.won ? "#a7f3d0" : "#fecdd3" },
            })}
          />
        ))}
      </div>

      {isGameReady && (
        <div className="flex flex-col justify-self-center mt-10">
          <ResourceControl
            resource={resource}
            resources={starshipResources}
            handleResourceTypeChange={handleResourceTypeChange}
          />

          <Button
            variant="contained"
            color="warning"
            className="w-[200px]"
            onClick={decideWinner}
            disabled={resource === ""}
          >
            FIGHT
          </Button>
        </div>
      )}
    </div>
  );
}
