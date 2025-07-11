import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import type { PersonResources } from "types/person";
import type { StarshipResources } from "types/starships";

type ResourceControl = {
  resource: PersonResources | StarshipResources | "";
  handleResourceTypeChange: (event: SelectChangeEvent) => void;
  resources: string[];
};

export default function ResourceControl({
  resource,
  handleResourceTypeChange,
  resources,
}: ResourceControl) {
  return (
    <FormControl className="w-[200px]">
      <InputLabel>Fight against</InputLabel>
      <Select
        value={resource}
        onChange={handleResourceTypeChange}
        className="text-black mb-8"
      >
        {resources.map((resource, index) => (
          <MenuItem key={`${resource}-${index}`} value={resource}>
            {resource}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
