import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PersonCard from "components/cards/person-card";
import type { Person } from "types/person";

describe("Person card", () => {
  it("should render person card", () => {
    const person: Person = {
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
    };

    render(<PersonCard person={person} />);

    expect(screen.getByTestId("person-test-uuid")).toBeDefined();
    expect(screen.getByTestId("name")).toHaveTextContent(person.name);
    expect(screen.getByTestId("height")).toHaveTextContent(`${person.height}`);
    expect(screen.getByTestId("mass")).toHaveTextContent(`${person.mass}`);
    expect(screen.getByTestId("hair-color")).toHaveTextContent(
      person.hairColor
    );
    expect(screen.getByTestId("skin-color")).toHaveTextContent(
      person.skinColor
    );
    expect(screen.getByTestId("eye-color")).toHaveTextContent(person.eyeColor);
    expect(screen.getByTestId("birth-year")).toHaveTextContent(
      `${person.birthYear}`
    );
    expect(screen.getByTestId("homeworld")).toHaveTextContent(person.homeworld);
  });
});
