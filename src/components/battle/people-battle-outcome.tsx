import { Button, type SelectChangeEvent } from "@mui/material";
import ResourceSelect from "components/battle/resource-select";
import PersonCard from "components/cards/person-card";
import { personResources } from "constants/resources";
import { useState } from "react";
import type { Person, PersonCardType, PersonResources } from "types/person";
import { getRandomInt } from "utils/random-numbers";
import type { ScoreType } from "./game-mode";

type PeopleBattleOutcomeProps = {
  people: Person[];
  score: ScoreType;
  setScore: (score: ScoreType) => void;
};

export default function PeopleBattleOutcome({
  people,
  score,
  setScore,
}: PeopleBattleOutcomeProps) {
  const [prevIndex, setPrevIndex] = useState<number | undefined>();
  const [cards, setCards] = useState<PersonCardType[]>([]);
  const [resource, setResource] = useState<PersonResources | "">("");

  const handleResourceTypeChange = (event: SelectChangeEvent) => {
    setResource(event.target.value as PersonResources);
  };

  const handleResetCards = () => {
    setCards([]);
    setScore({ ...score, roundFinished: false });
  };

  const selectRandomPerson = () => {
    const maxRange = people.length;

    const randomIndex = getRandomInt(0, maxRange, prevIndex);
    setPrevIndex(randomIndex);

    setCards([...cards, { person: people[randomIndex] }]);
  };

  const decideWinner = () => {
    if (
      cards[0].person[resource as PersonResources] >
      cards[1].person[resource as PersonResources]
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
    <div
      className="flex flex-col justify-center items-center w-2/3"
      data-testid="people-battle-outcome"
    >
      <div className="grid grid-cols-2 gap-5" data-testid="people-controls">
        <Button
          variant="contained"
          color="success"
          onClick={selectRandomPerson}
          disabled={isGameReady}
        >
          Pick random person
        </Button>
        <Button variant="contained" color="success" onClick={handleResetCards}>
          Reset cards
        </Button>
      </div>

      <div
        className="flex justify-between mt-10 w-full xl:px-30 xl:justify-around"
        data-testid="cards"
      >
        {cards.map((card) => (
          <PersonCard
            key={card.person.id}
            person={card.person}
            className="sm:min-w-[180px] md:min-w-[260px] lg:min-w-[350px] xl:min-w-[380px]"
            {...(card.won !== undefined && {
              ...{ background: card.won ? "#a7f3d0" : "#fecdd3" },
            })}
          />
        ))}
      </div>

      {isGameReady && (
        <div
          className="flex flex-col justify-self-center mt-10"
          data-testid="resource-control"
        >
          <ResourceSelect
            resource={resource}
            resources={personResources}
            handleResourceTypeChange={handleResourceTypeChange}
          />

          <Button
            variant="contained"
            color="warning"
            className="w-[200px]"
            onClick={decideWinner}
            disabled={resource === ""}
            data-testid="start-fight"
          >
            FIGHT
          </Button>
        </div>
      )}
    </div>
  );
}
