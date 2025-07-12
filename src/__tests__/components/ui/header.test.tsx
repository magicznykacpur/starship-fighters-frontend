import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "components/ui/header";

describe("Header", () => {
  it("should render header", () => {
    render(<Header />);

    expect(screen.getByTestId("header")).toHaveTextContent("Starship Fighters");
  });
});
