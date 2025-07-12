import type { SelectChangeEvent } from "@mui/material";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CardSelect from "components/battle/card-select";

type CardType = "person" | "starship";

describe("Card select", () => {
  it("should render card select", async () => {
    render(
      <CardSelect
        cardType="person"
        setCardType={(_: SelectChangeEvent) => undefined}
      />
    );

    const cardSelect = screen.getByTestId("card-select")
    
    expect(cardSelect).toBeDefined();
  });

  it("should change to starship card", async () => {
    const user = userEvent.setup();

    let cardType: CardType = "person";
    const setCardType = (event: SelectChangeEvent) => {
      cardType = event.target.value as CardType;
    };

    render(<CardSelect cardType={cardType} setCardType={setCardType} />);

    const selectTrigger = within(screen.getByTestId("card-select")).getByRole(
      "combobox"
    );

    await user.click(selectTrigger);
    
    const option = within(screen.getByRole("listbox")).getByText(/Starship/i);

    await user.click(option);

    expect(cardType).toBe("starship");
  });

  it("should change to person card", async () => {
    const user = userEvent.setup();

    let cardType: CardType = "starship";
    const setCardType = (event: SelectChangeEvent) => {
      cardType = event.target.value as CardType;
    };

    render(<CardSelect cardType={cardType} setCardType={setCardType} />);

    const selectTrigger = within(screen.getByTestId("card-select")).getByRole(
      "combobox"
    );

    await user.click(selectTrigger);

    const option = within(screen.getByRole("listbox")).getByText(/Person/i);

    await user.click(option);

    expect(cardType).toBe("person");
  });
});
