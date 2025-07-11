import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { Person } from "types/person";

type PersonCardProps = {
  person: Person;
  background?: string,
  className?: string,
};

export default function PersonCard({ person, background, className }: PersonCardProps) {
  return (
    <Card sx={{ maxWidth: 420, minHeight: 320, background: background }} variant="elevation" className={className}>
      <CardContent className="mt-4">
        <div className="flex justify-between w-full py-1">
          <span>Name:</span>
          <span>
            <strong>{person.name}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Height:</span>
          <span>
            <strong>{person.height}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Mass:</span>
          <span>
            <strong>{person.mass}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Hair color:</span>
          <span>
            <strong>{person.hairColor}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Skin color:</span>
          <span>
            <strong>{person.skinColor}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Eye color:</span>
          <span>
            <strong>{person.eyeColor}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Birthyear:</span>
          <span>
            <strong>{person.birthYear}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Homeworld:</span>
          <span>
            <strong>{person.homeworld}</strong>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
