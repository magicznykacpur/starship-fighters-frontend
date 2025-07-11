import Button from "@mui/material/Button";
import StarshipCard from "components/cards/starship-card";
import useStarships from "hooks/useStarships";
import { useEffect, useState } from "react";
import {
  type StarshipCardType,
  type Starship,
  type StarshipResources,
} from "types/starships";
import { getRandomInt } from "utils/random-numbers";

type StarshipsBattleOutcomeProps = {
  resource: StarshipResources;
  handleResetBattle: () => void;
};

export default function StarshipsBattleOutcome({
  resource,
  handleResetBattle,
}: StarshipsBattleOutcomeProps) {
  const { data } = useStarships();

  const [starshipCards, setStarshipCards] = useState<StarshipCardType[]>([]);
  const [winner, setWinner] = useState<Starship>();

  const selectRandomStarships = (): Starship[] => {
    const peopleLenght = data!.allStarships.length;

    let firstIdx = getRandomInt(0, peopleLenght);
    let secondIdx = getRandomInt(0, peopleLenght, firstIdx);

    return [data!.allStarships[firstIdx], data!.allStarships[secondIdx]];
  };

  const decideWinner = (fighters: Starship[]) => {
    if (fighters[0][resource] > fighters[1][resource]) {
      setStarshipCards([
        { starship: fighters[0], won: true },
        { starship: fighters[1], won: false },
      ]);

      setWinner(fighters[0]);
    } else {
      setStarshipCards([
        { starship: fighters[0], won: false },
        { starship: fighters[1], won: true },
      ]);

      setWinner(fighters[1]);
    }
  };

  const playoutFight = () => {
    const randomFighters = selectRandomStarships();
    decideWinner(randomFighters);
  };

  useEffect(() => {
    data?.allStarships && playoutFight();
  }, []);

  return (
    <div className="flex flex-col w-full items-center justify-center py-20">
      <div className="grid grid-cols-2 gap-10 w-2/3">
        <Button
          color="primary"
          variant="contained"
          size="medium"
          className="w-[200px] justify-self-end"
          onClick={() => handleResetBattle()}
        >
          Back to battle type
        </Button>
        <Button
          color="primary"
          variant="contained"
          size="medium"
          className="w-[200px]"
          onClick={playoutFight}
        >
          Fight again
        </Button>
      </div>

      <div className="text-2xl mt-10">
        Two random starships fighting against each others {resource}!
      </div>

      <div className="flex justify-around w-[80%] mt-10">
        {starshipCards.map((card) => (
          <StarshipCard
            key={card.starship.id}
            starship={card.starship}
            {...(card.won !== undefined && {
              ...{ background: card.won ? "#a7f3d0" : "#fecdd3" },
            })}
          />
        ))}
      </div>

      {winner && (
        <div className="flex justify-center text-emerald-700 text-2xl mt-15">
          The winner is {winner.name} with
          <strong className="mx-2">{winner[resource]}</strong>
          {resource}!
        </div>
      )}
    </div>
  );
}
