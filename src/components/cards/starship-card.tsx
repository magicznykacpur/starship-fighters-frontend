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
      sx={{
        // minWidth: 380,
        maxWidth: 420,
        minHeight: 320,
        background: background,
      }}
      className={className}
      data-testid={`starship-${starship.id}`}
    >
      <CardContent className="mt-4">
        <div className="flex justify-between w-full py-1">
          <span>Name:</span>
          <span>
            <strong data-testid="name">{starship.name}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Model:</span>
          <span>
            <strong data-testid="model">{starship.model}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Class:</span>
          <span>
            <strong data-testid="class">{starship.starshipClass}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Length:</span>
          <span>
            <strong data-testid="length">{starship.length}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Cargo capacity:</span>
          <span>
            <strong data-testid="cargo-capacity">{starship.cargoCapacity}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Hyperdrive rating:</span>
          <span>
            <strong data-testid="hyperdrive">{starship.hyperdriveRating}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Max speed:</span>
          <span>
            <strong data-testid="max-speed">{starship.maxSpeed}</strong>
          </span>
        </div>
        <div className="flex justify-between w-full py-1">
          <span>Crew members:</span>
          <span>
            <strong data-testid="crew-members">{starship.crewMembers}</strong>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
