import { type SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import type { PersonResources } from "types/person";
import type { StarshipResources } from "types/starships";
import BattleControl from "./battle-control";
import People from "./people";
import PeopleBattleOutcome from "./people-outcome";
import Starships from "./starships";

type BattleType = "people" | "starships";
type ResourceType = StarshipResources | PersonResources | "";

export default function Battle() {
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
      alert("You must select a resource to fight againts.");
      return;
    }

    setBattleStarted(true);
  };

  const handleResetBattle = () => setBattleStarted(false);

  return (
    <div>
      {!battleStarted && (
        <>
          <BattleControl
            battleType={battleType}
            resource={resource}
            handleBattleTypeChange={handleBattleTypeChange}
            handleResourceTypeChange={handleResourceChange}
            onStartBattleClick={onStarBattleClick}
          />

          <div className="grid grid-cols-2">
            <div>
              <Starships />
            </div>
            <div>
              <People />
            </div>
          </div>
        </>
      )}

      {battleStarted &&
        (battleType === "people" ? (
          <PeopleBattleOutcome
            resource={resource as PersonResources}
            handleResetBattle={handleResetBattle}
          />
        ) : (
          <PeopleBattleOutcome
            resource={resource as PersonResources}
            handleResetBattle={handleResetBattle}
          />
        ))}
    </div>
  );
}
