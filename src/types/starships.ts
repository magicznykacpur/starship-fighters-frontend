export type StarshipClass = "FIGHTER" | "TRANSPORTER" | "SPEEDER";

export type Starship = {
  id: string;
  name: string;
  model: string;
  length: number;
  cargoCapacity: number;
  maxSpeed: number;
  hyperdriveRating: number;
  starshipClass: StarshipClass;
  createdAt: string;
  updatedAt: string;
  crewMembers: number;
};
