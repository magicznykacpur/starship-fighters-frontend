import type { SelectChangeEvent } from "@mui/material";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResourceSelect from "components/battle/resource-select";
import { personResources, starshipResources } from "constants/resources";
import type { PersonResources } from "types/person";
import type { StarshipResources } from "types/starships";

describe("Resource select", () => {
  it("should render resource select", () => {
    render(
      <ResourceSelect
        resource="mass"
        handleResourceTypeChange={(_: SelectChangeEvent) => undefined}
        resources={starshipResources}
      />
    );

    const resourceSelect = screen.getByTestId("resource-select");

    expect(resourceSelect).toBeDefined();
  });

  it("should to different starship resource", async () => {
    const user = userEvent.setup();

    let resource: StarshipResources = "maxSpeed";
    const setResource = (event: SelectChangeEvent) => {
      resource = event.target.value as StarshipResources;
    };

    render(
      <ResourceSelect
        resource={resource}
        handleResourceTypeChange={setResource}
        resources={starshipResources}
      />
    );

    const selectTrigger = within(
      screen.getByTestId("resource-select")
    ).getByRole("combobox");

    await user.click(selectTrigger);

    const option = within(screen.getByRole("listbox")).getByText(
      /crewMembers/i
    );

    await user.click(option);

    expect(resource).toBe("crewMembers");
  });

  it("should to different person resource", async () => {
    const user = userEvent.setup();

    let resource: PersonResources = "mass";
    const setResource = (event: SelectChangeEvent) => {
      resource = event.target.value as PersonResources;
    };

    render(
      <ResourceSelect
        resource={resource}
        handleResourceTypeChange={setResource}
        resources={personResources}
      />
    );

    const selectTrigger = within(
      screen.getByTestId("resource-select")
    ).getByRole("combobox");

    await user.click(selectTrigger);

    const option = within(screen.getByRole("listbox")).getByText(/height/i);

    await user.click(option);

    expect(resource).toBe("height");
  });
});
