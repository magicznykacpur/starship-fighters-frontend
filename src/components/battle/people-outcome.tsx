import Button from "@mui/material/Button";
import PersonCard from "components/cards/person-card";
import usePeople from "hooks/usePeople";
import { useEffect, useState } from "react";
import { type Person, type PersonResources } from "types/person";
import { getRandomInt } from "utils/random-numbers";

type PeopleBattleOutcome = {
  resource: PersonResources;
  handleResetBattle: () => void;
};

type SelectingRandomStatus = "started" | "finished" | "idle";

export default function PeopleBattleOutcome({
  resource,
  handleResetBattle,
}: PeopleBattleOutcome) {
  const { data } = usePeople();
  const [selectingRandom, setSelectingRandom] =
    useState<SelectingRandomStatus>("idle");

  const [winner, setWinner] = useState<Person>();
  const [loser, setLoser] = useState<Person>();

  const selectRandomPeople = (): Person[] => {
    const peopleLenght = data!.allPeople.length;

    let firstIdx = getRandomInt(0, peopleLenght);
    let secondIdx = getRandomInt(0, peopleLenght);

    while (firstIdx === secondIdx) {
      firstIdx = getRandomInt(0, peopleLenght);
      secondIdx = getRandomInt(0, peopleLenght);
    }

    return [data!.allPeople[firstIdx], data!.allPeople[secondIdx]];
  };

  const decideWinner = (fighters: Person[]) => {
    if (fighters[0][resource] > fighters[1][resource]) {
      setWinner(fighters[0]);
      setLoser(fighters[1]);
    } else {
      setWinner(fighters[1]);
      setLoser(fighters[0]);
    }
  };

  useEffect(() => {
    setSelectingRandom("started");

    const randomFighters = selectRandomPeople();

    setSelectingRandom("finished");

    decideWinner(randomFighters);

    setSelectingRandom("idle");
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
          // onClick={() => handleResetBattle()}
        >
          Fight again
        </Button>
      </div>

      <div className="text-2xl mt-10">
        Two random fighters fighting against each others {resource}!
      </div>
      {selectingRandom === "started" && (
        <div className="mt-10 text-2xl font-bold">
          Selecting random fighters...
        </div>
      )}

      {winner && loser && (
        <>
          <div className="grid grid-cols-2 gap-5 mt-15 w-2/3">
            <PersonCard
              person={winner}
              background="#a7f3d0"
              className="justify-self-end lg:w-[420px] md:w-[320px] sm:w-[220px]"
            />
            <PersonCard
              person={loser}
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
