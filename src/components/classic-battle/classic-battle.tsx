import type { SelectChangeEvent } from "@mui/material";
import Button from "@mui/material/Button";
import PersonCard from "components/cards/person-card";
import StarshipCard from "components/cards/starship-card";
import GameMode, {
  type GameModeType,
  type ScoreType,
} from "components/classic-battle/game-mode";
import ResourceControl from "components/controls/resource-control";
import { personResources, starshipResources } from "constants/resources";
import usePeople from "hooks/usePeople";
import useStarships from "hooks/useStarships";
import { useState } from "react";
import type { PersonCardType, PersonResources } from "types/person";
import type { StarshipCardType, StarshipResources } from "types/starships";
import { getRandomInt } from "utils/random-numbers";
import CardPicker from "./card-picker";

type CardType = "person" | "starship";
type ResourceType = StarshipResources | PersonResources | "";

export default function ClassicBattle() {
  const { data: starshipsData } = useStarships();
  const { data: peopleData } = usePeople();

  const [gameMode, setGameMode] = useState<GameModeType>("single-player");
  const [score, setScore] = useState<ScoreType>({
    playerOne: 0,
    playerTwo: 0,
    roundFinished: false,
  });
  const [cardType, setCardType] = useState<CardType>("person");
  const [resource, setResource] = useState<ResourceType>("");
  const [personCards, setPersonCards] = useState<PersonCardType[]>([]);
  const [starshipCards, setStarshipCards] = useState<StarshipCardType[]>([]);
  const [prevIndex, setPrevIndex] = useState<number | undefined>();

  const handleCardTypeChange = (event: SelectChangeEvent) => {
    resetCards();
    setCardType(event.target.value as CardType);
  };
  const handleResourceTypeChange = (event: SelectChangeEvent) => {
    setResource(event.target.value as ResourceType);
  };

  const resetCards = () => {
    setPersonCards([]);
    setStarshipCards([]);
    setScore({ ...score, roundFinished: false });
  };

  const selectRandomFighter = () => {
    const maxRange =
      cardType === "person"
        ? peopleData!.allPeople.length
        : starshipsData!.allStarships.length;

    const randomIndex = getRandomInt(0, maxRange, prevIndex);
    setPrevIndex(randomIndex);

    if (cardType === "person") {
      setPersonCards([
        ...personCards,
        { person: peopleData!.allPeople[randomIndex] },
      ]);
    } else {
      setStarshipCards([
        ...starshipCards,
        { starship: starshipsData!.allStarships[randomIndex] },
      ]);
    }
  };

  const getPersonCardResource = (index: number) =>
    personCards[index].person[resource as PersonResources];

  const decideWinnerPersonCard = () => {
    if (getPersonCardResource(0) > getPersonCardResource(1)) {
      !score.roundFinished &&
        setScore({
          ...score,
          playerOne: score.playerOne + 1,
          roundFinished: true,
        });

      setPersonCards([
        { ...personCards[0], won: true },
        { ...personCards[1], won: false },
      ]);
    } else {
      !score.roundFinished &&
        setScore({
          ...score,
          playerTwo: score.playerTwo + 1,
          roundFinished: true,
        });

      setPersonCards([
        { ...personCards[0], won: false },
        { ...personCards[1], won: true },
      ]);
    }
  };

  const getStarshipCardResource = (index: number) =>
    starshipCards[index].starship[resource as StarshipResources];

  const decideWinnerStarshipCard = () => {
    if (getStarshipCardResource(0) > getStarshipCardResource(1)) {
      !score.roundFinished &&
        setScore({
          ...score,
          playerOne: score.playerOne + 1,
          roundFinished: true,
        });

      setStarshipCards([
        { ...starshipCards[0], won: true },
        { ...starshipCards[1], won: false },
      ]);
    } else {
      !score.roundFinished &&
        setScore({
          ...score,
          playerTwo: score.playerTwo + 1,
          roundFinished: true,
        });

      setStarshipCards([
        { ...starshipCards[0], won: false },
        { ...starshipCards[1], won: true },
      ]);
    }
  };

  const decideWinner = () => {
    if (cardType === "person") {
      decideWinnerPersonCard();
    } else {
      decideWinnerStarshipCard();
    }
  };

  const isGameReady = personCards.length === 2 || starshipCards.length === 2;

  return (
    <div className="flex flex-col items-center">
      <GameMode gameMode={gameMode} score={score} setGameMode={setGameMode} />

      <CardPicker
        cardType={cardType}
        setCardType={handleCardTypeChange}
        handleResetCards={resetCards}
        selectRandomFighter={selectRandomFighter}
        isGameReady={isGameReady}
      />

      <div className="flex justify-around w-[80%] mt-10">
        {cardType === "starship" &&
          starshipCards.map((card) => (
            <StarshipCard
              key={card.starship.id}
              starship={card.starship}
              {...(card.won !== undefined && {
                ...{ background: card.won ? "#a7f3d0" : "#fecdd3" },
              })}
            />
          ))}
        {cardType === "person" &&
          personCards.map((card) => (
            <PersonCard
              key={card.person.id}
              person={card.person}
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
            resources={
              cardType === "person" ? personResources : starshipResources
            }
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
