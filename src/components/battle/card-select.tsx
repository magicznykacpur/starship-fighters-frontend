import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";

type CardType = "person" | "starship";

type CardSelectProps = {
  cardType: CardType;
  setCardType: (event: SelectChangeEvent) => void;
};

export default function CardSelect({ cardType, setCardType }: CardSelectProps) {
  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <FormControl className="w-[200px]">
        <InputLabel>Card type</InputLabel>
        <Select
          value={cardType}
          onChange={setCardType}
          className="text-black mb-8"
          data-testid="card-select"
        >
          <MenuItem value="person">Person</MenuItem>
          <MenuItem value="starship">Starship</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
