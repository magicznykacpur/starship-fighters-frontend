import StarshipCard from "components/cards/starship-card";
import type { Starship } from "types/starships";

type StarshipCardType = { starship: Starship; won?: boolean };
type StarshipCardsProps = {
  starshipCards: StarshipCardType[];
};

export default function StarshipCards({ starshipCards }: StarshipCardsProps) {
  return starshipCards.map((card) => (
    <StarshipCard
      key={card.starship.id}
      starship={card.starship}
      {...(card.won !== undefined && {
        ...{ background: card.won ? "#a7f3d0" : "#fecdd3" },
      })}
    />
  ));
}
