export type Person = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  height: number;
  mass: number;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: number;
  homeworld: string;
};

export type PersonResources = "height" | "mass" | "birthYear";

export type PersonCard = { person: Person; won?: boolean };
