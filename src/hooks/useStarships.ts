import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import type { Starship } from "types/starships";

const apiUrl = import.meta.env.VITE_API_URL;
const staleTime = 5 * 60 * 1000;
const queryKey = ["starships"];

export default function useStarships() {
  return useQuery({
    queryKey,
    staleTime,
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
