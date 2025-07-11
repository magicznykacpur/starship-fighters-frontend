import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import type { Person } from "types/person";

const apiUrl = import.meta.env.VITE_API_URL;
const staleTime = 5 * 60 * 1000;
const queryKey = ["people"];

export default function usePeople() {
  return useQuery({
    queryKey,
    staleTime,
    queryFn: async () =>
      request<{ allPeople: Person[] }>(
        apiUrl,
        gql`
          {
            allPeople {
              id
              name
              createdAt
              updatedAt
              height
              mass
              hairColor
              skinColor
              eyeColor
              birthYear
              homeworld
            }
          }
        `
      ),
  });
}
