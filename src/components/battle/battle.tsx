import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import People from "./people";
import Starships from "./starships";

type BattleType = "people" | "starships";

export default function Battle() {
  const [battleStarted, setBattleStarted] = useState(false);
  const [battleType, setBattleType] = useState<BattleType>("starships");

  const handleSelectChange = (event: SelectChangeEvent) =>
    setBattleType(event.target.value as BattleType);

  const onStarBattleClick = () => setBattleStarted(true);

  return (
    <div>
      {!battleStarted && (
        <div className="flex flex-col justify-center items-center mt-10">
          <Select
            value={battleType}
            label="Age"
            onChange={handleSelectChange}
            className="text-black mb-8"
          >
            <MenuItem value="people">People</MenuItem>
            <MenuItem value="starships">Starships</MenuItem>
          </Select>

          <Button
            onClick={onStarBattleClick}
            variant="outlined"
            color="success"
            size="medium"
          >
            Start battle
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2">
        <div>
          <Starships />
        </div>
        <div>
          <People />
        </div>
      </div>
    </div>
  );
}
