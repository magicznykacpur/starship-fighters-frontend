import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import type { ScoreType } from "components/battle/game-mode";
import PeopleBattleOutcome from "components/battle/people-battle-outcome";
import type { Person } from "types/person";

const people: Person[] = [
  {
    id: "test-uuid",
    name: "test-name",
    height: 186,
    mass: 90,
    hairColor: "brown",
    skinColor: "white",
    eyeColor: "brown",
    birthYear: 1993,
    homeworld: "earth",
    createdAt: "15-10-2025",
    updatedAt: "15-10-2025",
  },
  {
    id: "test-uuid-2",
    name: "test-name-2",
    height: 195,
    mass: 93,
    hairColor: "brown",
    skinColor: "white",
    eyeColor: "brown",
    birthYear: 1995,
    homeworld: "earth",
    createdAt: "15-10-2025",
    updatedAt: "15-10-2025",
  },
];

const score = { playerOne: 0, playerTwo: 0, roundFinished: false };

const battleOutcomeComponent = (
  <PeopleBattleOutcome
    people={people}
    score={score}
    setScore={(_: ScoreType) => undefined}
  />
);

const pickCards = async (user: UserEvent) => {
  const controls = screen.getByTestId("people-controls");
  const randomPersonButton = within(controls).getByText(/Pick random person/i);

  await user.click(randomPersonButton);
  await user.click(randomPersonButton);
};

describe("People battle outcome", () => {
  it("should render battle outcome without cards", () => {
    render(battleOutcomeComponent);

    const battleOutcome = screen.getByTestId("people-battle-outcome");
    const controls = screen.getByTestId("people-controls");
    const randomPersonButton =
      within(controls).getByText(/Pick random person/i);
    const resetCards = within(controls).getByText(/Reset cards/i);

    expect(battleOutcome).toBeDefined();
    expect(controls).toBeDefined();
    expect(randomPersonButton).toBeDefined();
    expect(resetCards).toBeDefined();
  });

  it("should pick 2 random cards", async () => {
    const user = userEvent.setup();

    render(battleOutcomeComponent);

    await pickCards(user);

    const cards = screen.getByTestId("cards");

    expect(cards).toBeDefined();
    expect(cards.children.length).toBe(2);
    expect(cards.children[0]).not.toStrictEqual(cards.children[1]);
  });

  it("should disable select random person button when 2 cards picked", async () => {
    const user = userEvent.setup();

    render(battleOutcomeComponent);

    await pickCards(user);

    const controls = screen.getByTestId("people-controls");
    const randomPersonButton =
      within(controls).getByText(/Pick random person/i);

    expect(randomPersonButton).toBeDisabled();
  });

  it("should render resource control and fight button when game ready", async () => {
    const user = userEvent.setup();

    render(battleOutcomeComponent);

    await pickCards(user);

    const resourceControl = screen.getByTestId("resource-control");
    const fightButton = within(resourceControl).getByTestId("start-fight");

    expect(resourceControl).toBeDefined();
    expect(fightButton).toBeDefined();
  });

  it("should pick a winner card", async () => {
    const user = userEvent.setup();

    render(battleOutcomeComponent);

    await pickCards(user);

    const resourceTrigger = within(
      screen.getByTestId("resource-select")
    ).getByRole("combobox");

    await user.click(resourceTrigger);

    const option = within(screen.getByRole("listbox")).getByText(/height/i);

    await user.click(option);

    const fightButton = screen.getByTestId("start-fight");

    await user.click(fightButton);

    const cards = screen.getByTestId("cards");

    const computedBackgrounds = [
      window.getComputedStyle(cards.children[0]).background,
      window.getComputedStyle(cards.children[1]).background,
    ];

    expect(computedBackgrounds).toContain("rgb(167, 243, 208)");
    expect(computedBackgrounds).toContain("rgb(254, 205, 211)");
  });
});
