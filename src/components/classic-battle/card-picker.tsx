import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";

type CardType = "person" | "starship";

type CardPickerProps = {
  cardType: CardType;
  setCardType: (even: SelectChangeEvent) => void;
  selectRandomFighter: () => void;
  handleResetCards: () => void;
  isGameReady: boolean;
};

export default function CardPicker({
  cardType,
  setCardType,
  selectRandomFighter,
  handleResetCards,
  isGameReady,
}: CardPickerProps) {
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <FormControl className="w-[200px]">
        <InputLabel>Card type</InputLabel>
        <Select
          value={cardType}
          onChange={setCardType}
          className="text-black mb-8"
        >
          <MenuItem value="person">Person</MenuItem>
          <MenuItem value="starship">Starship</MenuItem>
        </Select>
      </FormControl>

      <div className="grid grid-cols-2 gap-5 w-1/2">
        <Button
          variant="contained"
          color="success"
          onClick={selectRandomFighter}
          disabled={isGameReady}
        >
          Pick random {cardType}
        </Button>
        <Button variant="contained" color="success" onClick={handleResetCards}>
          Reset cards
        </Button>
      </div>
    </div>
  );
}
