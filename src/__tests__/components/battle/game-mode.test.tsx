import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameMode, { type ScoreType } from "components/battle/game-mode";

describe("Game mode", () => {
  it("should render in single player mode", () => {
    const score: ScoreType = {
      playerOne: 0,
      playerTwo: 0,
      roundFinished: false,
    };

    render(
      <GameMode
        gameMode="single-player"
        score={score}
        setGameMode={() => undefined}
        setScore={(_: ScoreType) => undefined}
      />
    );

    const modeControls = screen.getByTestId("game-mode-controls");

    expect(modeControls).toBeDefined();
    expect(within(modeControls).getByText(/Single player/i)).toBeDefined();
    expect(within(modeControls).getByText(/Two players/i)).toBeDefined();
  });

  it("should render in two player mode", () => {
    const score: ScoreType = {
      playerOne: 0,
      playerTwo: 0,
      roundFinished: false,
    };

    render(
      <GameMode
        gameMode="two-players"
        score={score}
        setGameMode={() => undefined}
        setScore={(_: ScoreType) => undefined}
      />
    );

    const modeControls = screen.getByTestId("game-mode-controls");

    expect(modeControls).toBeDefined();
    expect(within(modeControls).getByText(/Single player/i)).toBeDefined();
    expect(within(modeControls).getByText(/Two players/i)).toBeDefined();

    const scoreDisplay = screen.getByTestId("score-display");

    expect(scoreDisplay).toBeDefined();
    expect(within(scoreDisplay).getByText(/Player 1:/i)).toBeDefined();
    expect(within(scoreDisplay).getByText(/Player 2:/i)).toBeDefined();
  });

  it("should switch between game modes", async () => {
    const user = userEvent.setup();

    const initialScore: ScoreType = {
      playerOne: 2,
      playerTwo: 2,
      roundFinished: true,
    };

    const expectedScore: ScoreType = {
      playerOne: 0,
      playerTwo: 0,
      roundFinished: false,
    };

    let score: ScoreType | undefined = undefined;

    const setScore = (_: ScoreType) => {
      score = { playerOne: 0, playerTwo: 0, roundFinished: false };
    };

    render(
      <GameMode
        gameMode="two-players"
        score={initialScore}
        setGameMode={() => undefined}
        setScore={setScore}
      />
    );

    const modeControls = screen.getByTestId("game-mode-controls");
    const singlePlayerButton = within(modeControls).getByText(/Single player/i);

    await user.click(singlePlayerButton);

    expect(score).toStrictEqual(expectedScore);
  });

  it("should pick appropriate colors when same score", async () => {
    const score: ScoreType = {
      playerOne: 2,
      playerTwo: 2,
      roundFinished: true,
    };

    render(
      <GameMode
        gameMode="two-players"
        score={score}
        setGameMode={() => undefined}
        setScore={(_: ScoreType) => undefined}
      />
    );

    const playerOneScore = screen.getByTestId(/player-one-score/i);
    const playerTwoScore = screen.getByTestId(/player-two-score/i);

    expect(playerOneScore).toHaveClass("text-blue-500");
    expect(playerTwoScore).toHaveClass("text-blue-500");
  });

  it("should pick appropriate colors when different scores", async () => {
    const score: ScoreType = {
      playerOne: 1,
      playerTwo: 2,
      roundFinished: true,
    };

    render(
      <GameMode
        gameMode="two-players"
        score={score}
        setGameMode={() => undefined}
        setScore={(_: ScoreType) => undefined}
      />
    );

    const playerOneScore = screen.getByTestId(/player-one-score/i);
    const playerTwoScore = screen.getByTestId(/player-two-score/i);

    expect(playerOneScore).toHaveClass("text-rose-700");
    expect(playerTwoScore).toHaveClass("text-emerald-700");
  });
});
