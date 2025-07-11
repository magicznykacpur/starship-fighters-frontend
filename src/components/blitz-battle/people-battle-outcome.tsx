import Button from "@mui/material/Button";
import PersonCard from "components/cards/person-card";
import GameMode, {
  type GameModeType,
  type ScoreType,
} from "components/classic-battle/game-mode";
import usePeople from "hooks/usePeople";
import { useEffect, useState } from "react";
import {
  type Person,
  type PersonCardType,
  type PersonResources,
} from "types/person";
import { getRandomInt } from "utils/random-numbers";

type PeopleBattleOutcome = {
  resource: PersonResources;
  handleResetBattle: () => void;
};

export default function PeopleBattleOutcome({
  resource,
  handleResetBattle,
}: PeopleBattleOutcome) {
  const { data } = usePeople();

  const [personCards, setPersonCards] = useState<PersonCardType[]>([]);
  const [winner, setWinner] = useState<Person>();
  const [gameMode, setGameMode] = useState<GameModeType>("single-player");
  const [score, setScore] = useState<ScoreType>({
    playerOne: 0,
    playerTwo: 0,
    roundFinished: false,
  });

  const pickFighters = () => {
    const peopleLenght = data!.allPeople.length;

    let firstIdx = getRandomInt(0, peopleLenght);
    let secondIdx = getRandomInt(0, peopleLenght, firstIdx);

    return [data!.allPeople[firstIdx], data!.allPeople[secondIdx]];
  };

  const decideWinner = (fighters: Person[]) => {
    console.log(score.roundFinished)

    if (fighters[0][resource] > fighters[1][resource]) {
      !score.roundFinished &&
        setScore({
          ...score,
          playerOne: score.playerOne + 1,
          roundFinished: true,
        });

      setPersonCards([
        { person: fighters[0], won: true },
        { person: fighters[1], won: false },
      ]);

      setWinner(fighters[0]);
    } else {
      !score.roundFinished &&
        setScore({
          ...score,
          playerTwo: score.playerTwo + 1,
          roundFinished: true,
        });

      setPersonCards([
        { person: fighters[0], won: false },
        { person: fighters[1], won: true },
      ]);

      setWinner(fighters[1]);
    }
    console.log(score.roundFinished)

  };

  const playoutFight = () => {
    setScore({ ...score, roundFinished: false });
    const fighters = pickFighters();
    decideWinner(fighters);
  };

  useEffect(() => {
    data?.allPeople && playoutFight();
  }, []);

  return (
    <div className="flex flex-col w-full items-center justify-center my-10">
      <GameMode gameMode={gameMode} score={score} setGameMode={setGameMode} />

      <div className="grid grid-cols-2 gap-10 w-2/3 mt-10">
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
        Two random people fighting against each others {resource}!
      </div>

      <div className="flex justify-around w-[80%] mt-10">
        {personCards.map((card) => (
          <PersonCard
            key={card.person.id}
            person={card.person}
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
