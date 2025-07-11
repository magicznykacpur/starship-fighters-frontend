import Button from "@mui/material/Button";
import StarshipCard from "components/cards/starship-card";
import useStarships from "hooks/useStarships";
import { useEffect, useState } from "react";
import type { Starship, StarshipResources } from "types/starships";
import { getRandomInt } from "utils/random-numbers";

type StarshipsBattleOutcomeProps = {
  resource: StarshipResources;
  handleResetBattle: () => void;
};

type SelectingRandomStatus = "started" | "finished" | "idle";

export default function StarshipsBattleOutcome({
  resource,
  handleResetBattle,
}: StarshipsBattleOutcomeProps) {
  const { data } = useStarships();
  const [selectingRandom, setSelectingRandom] =
    useState<SelectingRandomStatus>("idle");

  const [winner, setWinner] = useState<Starship>();
  const [loser, setLoser] = useState<Starship>();

  const selectRandomStarships = (): Starship[] => {
    const peopleLenght = data!.allStarships.length;

    let firstIdx = getRandomInt(0, peopleLenght);
    let secondIdx = getRandomInt(0, peopleLenght);

    while (firstIdx === secondIdx) {
      firstIdx = getRandomInt(0, peopleLenght);
      secondIdx = getRandomInt(0, peopleLenght);
    }

    return [data!.allStarships[firstIdx], data!.allStarships[secondIdx]];
  };

  const decideWinner = (fighters: Starship[]) => {
    if (fighters[0][resource] > fighters[1][resource]) {
      setWinner(fighters[0]);
      setLoser(fighters[1]);
    } else {
      setWinner(fighters[1]);
      setLoser(fighters[0]);
    }
  };

  const playoutFight = () => {
    setSelectingRandom("started");

    const randomFighters = selectRandomStarships();

    setSelectingRandom("finished");

    decideWinner(randomFighters);

    setSelectingRandom("idle");
  };

  useEffect(() => {
    playoutFight();
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
      
      {selectingRandom === "started" && (
        <div className="mt-10 text-2xl font-bold">
          Selecting random fighters...
        </div>
      )}

      {winner && loser && (
        <>
          <div className="grid grid-cols-2 gap-5 mt-15 w-2/3">
            <StarshipCard
              starship={winner}
              background="#a7f3d0"
              className="justify-self-end lg:w-[420px] md:w-[320px] sm:w-[220px]"
            />
            <StarshipCard
              starship={loser}
              background="#fecdd3"
              className="lg:w-[420px] md:w-[320px] sm:w-[220px]"
            />
          </div>
          <div className="flex justify-center text-emerald-700 text-2xl mt-15">
            The winner is {winner.name} with
            <strong className="mx-2">{winner[resource]}</strong>
            {resource}!
          </div>
        </>
      )}
    </div>
  );
}
