import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import type { ScoreType } from "components/battle/game-mode";
import StarshipsBattleOutcome from "components/battle/starships-battle-outcome";
import type { Starship } from "types/starships";

const starships: Starship[] = [
  {
    id: "test-uuid",
    name: "test-name",
    model: "test-model",
    length: 1000,
    cargoCapacity: 1000,
    maxSpeed: 1000,
    hyperdriveRating: 1.0,
    starshipClass: "FIGHTER",
    crewMembers: 100,
    createdAt: "15-10-2025",
    updatedAt: "15-10-2025",
  },
  {
    id: "test-uuid-2",
    name: "test-name-2",
    model: "test-model-2",
    length: 2000,
    cargoCapacity: 2000,
    maxSpeed: 2000,
    hyperdriveRating: 2.0,
    starshipClass: "FIGHTER",
    crewMembers: 200,
    createdAt: "15-10-2025",
    updatedAt: "15-10-2025",
  },
];

const score = { playerOne: 0, playerTwo: 0, roundFinished: false };

const battleOutcomeComponent = (
  <StarshipsBattleOutcome
    starships={starships}
    score={score}
    setScore={(_: ScoreType) => undefined}
  />
);

const pickCards = async (user: UserEvent) => {
  const controls = screen.getByTestId("starships-controls");
  const randomStarshipButton =
    within(controls).getByText(/Pick random starship/i);

  await user.click(randomStarshipButton);
  await user.click(randomStarshipButton);
};

describe("Starship battle outcome", () => {
  it("should render battle outcome without cards", () => {
    render(battleOutcomeComponent);

    const battleOutcome = screen.getByTestId("starships-battle-outcome");
    const controls = screen.getByTestId("starships-controls");
    const randomStarship = within(controls).getByText(/Pick random starship/i);
    const resetCards = within(controls).getByText(/Reset cards/i);

    expect(battleOutcome).toBeDefined();
    expect(controls).toBeDefined();
    expect(randomStarship).toBeDefined();
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

  it("should disable select random starship button when 2 cards picked", async () => {
    const user = userEvent.setup();

    render(battleOutcomeComponent);

    await pickCards(user);

    const controls = screen.getByTestId("starships-controls");
    const randomStarshipButton =
      within(controls).getByText(/Pick random starship/i);

    expect(randomStarshipButton).toBeDisabled();
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

    const option = within(screen.getByRole("listbox")).getByText(/maxSpeed/i);

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
