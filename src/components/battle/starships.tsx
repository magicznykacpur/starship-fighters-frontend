import StarshipCard from "components/cards/starship-card";
import useStarships from "hooks/useStarships";
import { Loader2 } from "lucide-react";
import type { Starship } from "types/starships";

export default function Starships() {
  const { data, isFetching } = useStarships();

  return (
    <>
      {isFetching && <Loader2 size={36} />}

      {data && (
        <>
          <div className="flex text-3xl justify-center w-full">
            <span>Starships</span>
          </div>
          <div className="grid grid-cols-2 gap-6 p-4">
            {data?.allStarships &&
              data.allStarships.map((starship: Starship) => (
                <StarshipCard key={starship.id} starship={starship} />
              ))}
          </div>
        </>
      )}
    </>
  );
}
