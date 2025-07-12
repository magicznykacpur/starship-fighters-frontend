import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { Person } from "types/person";

type PersonCardProps = {
  person: Person;
  background?: string;
  className?: string;
};

export default function PersonCard({
  person,
  background,
  className,
}: PersonCardProps) {
  return (
    <Card
      sx={{
        maxWidth: 420,
        minHeight: 320,
        background: background,
      }}
      variant="elevation"
      className={className}
      data-testid={`person-${person.id}`}
    >
      <CardContent className="mt-4">
        <div className="flex justify-between w-full py-1">
          <span>Name:</span>
          <span>
            <strong data-testid="name">{person.name}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Height:</span>
          <span>
            <strong data-testid="height">{person.height}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Mass:</span>
          <span>
            <strong data-testid="mass">{person.mass}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Hair color:</span>
          <span>
            <strong data-testid="hair-color">{person.hairColor}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Skin color:</span>
          <span>
            <strong data-testid="skin-color">{person.skinColor}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Eye color:</span>
          <span>
            <strong data-testid="eye-color">{person.eyeColor}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Birth year:</span>
          <span>
            <strong data-testid="birth-year">{person.birthYear}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Homeworld:</span>
          <span>
            <strong data-testid="homeworld">{person.homeworld}</strong>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
