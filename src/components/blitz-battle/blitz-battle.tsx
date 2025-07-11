import { type SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import type { PersonResources } from "types/person";
import type { StarshipResources } from "types/starships";
import BattleControl from "./battle-control";
import PeopleBattleOutcome from "./people-battle-outcome";
import StarshipsBattleOutcome from "./starships-battle-outcome";
import { toast } from "react-toastify";

type BattleType = "people" | "starships";
type ResourceType = StarshipResources | PersonResources | "";

export default function BlitzBattle() {
  const [battleStarted, setBattleStarted] = useState(false);
  const [battleType, setBattleType] = useState<BattleType>("starships");
  const [resource, setResource] = useState<ResourceType>("");

  const handleBattleTypeChange = (event: SelectChangeEvent) => {
    setResource("");
    setBattleType(event.target.value as BattleType);
  };

  const handleResourceChange = (event: SelectChangeEvent) =>
    setResource(event.target.value as ResourceType);

  const onStarBattleClick = () => {
    if (resource === "") {
      toast.error("You must select a resource to fight againts.");
      return;
    }

    setBattleStarted(true);
  };

  const handleResetBattle = () => setBattleStarted(false);

  return (
    <div>
      {!battleStarted && (
        <BattleControl
          battleType={battleType}
          resource={resource}
          handleBattleTypeChange={handleBattleTypeChange}
          handleResourceTypeChange={handleResourceChange}
          onStartBattleClick={onStarBattleClick}
        />
      )}

      {battleStarted &&
        (battleType === "people" ? (
          <PeopleBattleOutcome
            resource={resource as PersonResources}
            handleResetBattle={handleResetBattle}
          />
        ) : (
          <StarshipsBattleOutcome
            resource={resource as StarshipResources}
            handleResetBattle={handleResetBattle}
          />
        ))}
    </div>
  );
}
