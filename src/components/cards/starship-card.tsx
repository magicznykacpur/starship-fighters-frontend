import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { Starship } from "types/starships";

type StarshipCardProps = {
  starship: Starship;
  background?: string;
  className?: string;
};

export default function StarshipCard({
  starship,
  background,
  className,
}: StarshipCardProps) {
  return (
    <Card
      sx={{ maxWidth: 420, minHeight: 320, background: background }}
      className={className}
    >
      <CardContent className="mt-4">
        <div className="flex justify-between w-full py-1">
          <span>Name:</span>
          <span>
            <strong>{starship.name}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Model:</span>
          <span>
            <strong>{starship.model}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Class:</span>
          <span>
            <strong>{starship.starshipClass}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Length:</span>
          <span>
            <strong>{starship.length}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Cargo capacity:</span>
          <span>
            <strong>{starship.cargoCapacity}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Hyperdrive rating:</span>
          <span>
            <strong>{starship.hyperdriveRating}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Max speed:</span>
          <span>
            <strong>{starship.maxSpeed}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Crew members:</span>
          <span>
            <strong>{starship.crewMembers}</strong>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
