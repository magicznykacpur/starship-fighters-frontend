import type { SelectChangeEvent } from "@mui/material";
import {
  render,
  screen,
  within,
  act,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CardPicker from "components/battle/card-picker";

type CardType = "person" | "starship";

describe("Card picker", () => {
  it("should render card picker", () => {
    const mockedSetCardType = (_: SelectChangeEvent) => undefined;

    render(<CardPicker cardType="person" setCardType={mockedSetCardType} />);

    expect(screen.findByTestId("card-picker")).toBeDefined();
  });

  it("should change to starship card", async () => {
    const user = userEvent.setup();

    let cardType: CardType = "person";
    const setCardType = (event: SelectChangeEvent) => {
      cardType = event.target.value as CardType;
    };

    render(<CardPicker cardType={cardType} setCardType={setCardType} />);

    const selectTrigger = within(screen.getByTestId("card-picker")).getByRole(
      "combobox"
    );

    await act(() => user.click(selectTrigger));

    const option = await screen.findByRole("option", { name: /Starship/i });

    await user.click(option);

    expect(cardType).toBe("starship");
  });

  it("should change to person card", async () => {
    const user = userEvent.setup();

    let cardType: CardType = "starship";
    const setCardType = (event: SelectChangeEvent) => {
      cardType = event.target.value as CardType;
    };

    render(<CardPicker cardType={cardType} setCardType={setCardType} />);

    const selectTrigger = within(screen.getByTestId("card-picker")).getByRole(
      "combobox"
    );

    await user.click(selectTrigger);

    const option = within(screen.getByRole("listbox")).getByText(/Person/);

    await user.click(option);

    expect(cardType).toBe("person");
  });
});
