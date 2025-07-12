import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import type { PersonResources } from "types/person";
import type { StarshipResources } from "types/starships";

type ResourceSelectProps = {
  resource: PersonResources | StarshipResources | "";
  handleResourceTypeChange: (event: SelectChangeEvent) => void;
  resources: string[];
};

export default function ResourceSelect({
  resource,
  handleResourceTypeChange,
  resources,
}: ResourceSelectProps) {
  return (
    <FormControl className="w-[200px]">
      <InputLabel>Fight against</InputLabel>
      <Select
        value={resource}
        onChange={handleResourceTypeChange}
        className="text-black mb-8"
        data-testid="resource-select"
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
