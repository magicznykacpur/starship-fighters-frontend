import type { SelectChangeEvent } from "@mui/material";
import Button from "@mui/material/Button";
import ResourceControl from "components/controls/resource-control";
import { personResources, starshipResources } from "constants/resources";
import usePeople from "hooks/usePeople";
import useStarships from "hooks/useStarships";
import { useState } from "react";
import type { PersonCard, PersonResources } from "types/person";
import type { StarshipCard, StarshipResources } from "types/starships";
import { getRandomInt } from "utils/random-numbers";
import CardPicker from "./card-picker";
import PersonCards from "./person-cards";
import StarshipCards from "./starship-cards";

type CardType = "person" | "starship";
type ResourceType = StarshipResources | PersonResources | "";

export default function ClassicBattle() {
  const { data: starshipsData } = useStarships();
  const { data: peopleData } = usePeople();

  const [cardType, setCardType] = useState<CardType>("person");
  const [resource, setResource] = useState<ResourceType>("");

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
  };

  const [personCards, setPersonCards] = useState<PersonCard[]>([]);
  const [starshipCards, setStarshipCards] = useState<StarshipCard[]>([]);

  const selectRandomFighter = () => {
    const maxRange =
      cardType === "person"
        ? peopleData!.allPeople.length
        : starshipsData!.allStarships.length;

    const randomIndex = getRandomInt(0, maxRange);

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

  const decideWinner = () => {
    if (cardType === "person") {
      if (
        personCards[0].person[resource as PersonResources] >
        personCards[1].person[resource as PersonResources]
      ) {
        setPersonCards([
          { ...personCards[0], won: true },
          { ...personCards[1], won: false },
        ]);
      } else {
        setPersonCards([
          { ...personCards[1], won: true },
          { ...personCards[0], won: false },
        ]);
      }
    } else {
      if (
        starshipCards[0].starship[resource as StarshipResources] >
        starshipCards[1].starship[resource as StarshipResources]
      ) {
        setStarshipCards([
          { ...starshipCards[0], won: true },
          { ...starshipCards[1], won: false },
        ]);
      } else {
        setStarshipCards([
          { ...starshipCards[1], won: true },
          { ...starshipCards[0], won: false },
        ]);
      }
    }
  };

  const isGameReady = personCards.length === 2 || starshipCards.length === 2;

  return (
    <div>
      <CardPicker
        cardType={cardType}
        setCardType={handleCardTypeChange}
        handleResetCards={resetCards}
        selectRandomFighter={selectRandomFighter}
        isGameReady={isGameReady}
      />

      <div className="flex w-full justify-center pl-6">
        {cardType === "starship" && (
          <StarshipCards starshipCards={starshipCards} />
        )}
        {cardType === "person" && <PersonCards personCards={personCards} />}
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
