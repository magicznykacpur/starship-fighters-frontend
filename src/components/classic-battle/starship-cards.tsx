import StarshipCard from "components/cards/starship-card";
import type { Starship } from "types/starships";

type StarshipCardType = { starship: Starship; won?: boolean };
type StarshipCardsProps = {
  starshipCards: StarshipCardType[];
};

export default function StarshipCards({
  starshipCards,
}: StarshipCardsProps) {
  return (
    <div className="grid grid-cols-2 w-2/3 mt-10">
      {starshipCards.map((card) => (
        <StarshipCard
          starship={card.starship}
          {...(card.won !== undefined && {
            ...{ background: card.won ? "#a7f3d0" : "#fecdd3" },
          })}
        />
      ))}
    </div>
  );
}
