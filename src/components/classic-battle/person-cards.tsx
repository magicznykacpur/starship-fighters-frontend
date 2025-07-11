import PersonCard from "components/cards/person-card";
import type { Person } from "types/person";

type PersonCardType = { person: Person; won?: boolean };

type PersonCardsProps = {
  personCards: PersonCardType[];
};

export default function PersonCards({ personCards }: PersonCardsProps) {
  return (
    <div className="grid grid-cols-2 w-2/3 mt-10">
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
  );
}
