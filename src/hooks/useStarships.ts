import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import type { Starship } from "types/starships";

const apiUrl = import.meta.env.VITE_API_URL;

export default function useStarships() {
  return useQuery({
    queryKey: ["starships"],
    queryFn: async () =>
      request<{ allStarships: Starship[] }>(
        apiUrl,
        gql`
          {
            allStarships {
              id
              name
              model
              length
              cargoCapacity
              maxSpeed
              hyperdriveRating
              starshipClass
              createdAt
              updatedAt
              crewMembers
            }
          }
        `
      ),
  });
}
