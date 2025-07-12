import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import StarshipCard from "components/cards/starship-card";
import type { Starship } from "types/starships";

describe("Starship card", () => {
  it("should render starship card", () => {
    const starship: Starship = {
      id: "test-uuid",
      name: "test-name",
      model: "test-model",
      starshipClass: "FIGHTER",
      length: 420,
      cargoCapacity: 840,
      hyperdriveRating: 1.0,
      maxSpeed: 200,
      crewMembers: 200,
      createdAt: "15-10-2025",
      updatedAt: "15-10-2025",
    };

    render(<StarshipCard starship={starship} />);

    expect(screen.getByTestId("starship-test-uuid")).toBeDefined();

    expect(screen.getByTestId("name")).toHaveTextContent(starship.name);
    expect(screen.getByTestId("model")).toHaveTextContent(starship.model);
    expect(screen.getByTestId("class")).toHaveTextContent(
      starship.starshipClass
    );
    expect(screen.getByTestId("length")).toHaveTextContent(
      `${starship.length}`
    );
    expect(screen.getByTestId("cargo-capacity")).toHaveTextContent(
      `${starship.cargoCapacity}`
    );
    expect(screen.getByTestId("hyperdrive")).toHaveTextContent(
      `${starship.hyperdriveRating}`
    );
    expect(screen.getByTestId("max-speed")).toHaveTextContent(
      `${starship.maxSpeed}`
    );
    expect(screen.getByTestId("crew-members")).toHaveTextContent(
      `${starship.crewMembers}`
    );
  });
});
