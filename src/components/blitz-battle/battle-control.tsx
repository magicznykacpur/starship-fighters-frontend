import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import ResourceControl from "components/controls/resource-control";
import { personResources, starshipResources } from "constants/resources";
import type { PersonResources } from "types/person";
import type { StarshipResources } from "types/starships";

type BattleControlProps = {
  battleType: "starships" | "people";
  resource: PersonResources | StarshipResources | "";
  handleBattleTypeChange: (event: SelectChangeEvent) => void;
  handleResourceTypeChange: (event: SelectChangeEvent) => void;
  onStartBattleClick: () => void;
};

export default function BattleControl({
  battleType,
  resource,
  handleBattleTypeChange,
  handleResourceTypeChange,
  onStartBattleClick,
}: BattleControlProps) {
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <FormControl className="w-[200px]">
        <InputLabel>Battle type</InputLabel>
        <Select
          value={battleType}
          onChange={handleBattleTypeChange}
          className="text-black mb-8"
        >
          <MenuItem value="people">People</MenuItem>
          <MenuItem value="starships">Starships</MenuItem>
        </Select>
      </FormControl>

      <ResourceControl
        resource={resource}
        resources={
          battleType === "people" ? personResources : starshipResources
        }
        handleResourceTypeChange={handleResourceTypeChange}
      />

      <Button
        onClick={onStartBattleClick}
        variant="contained"
        color="success"
        size="medium"
        className="w-[200px]"
      >
        Start battle
      </Button>
    </div>
  );
}
