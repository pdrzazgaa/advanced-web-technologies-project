import { Address } from "./Address";
import { Mode } from "fs";

export interface SearchParams {
  sourceLat: number;
  sourceLong: number;
  destinationLat: number;
  destinationLong: number;
  departureTime: string;
  mode: Mode;
}

export interface Search {
  source: Address;
  destination: Address;
  time: Date;
  mode: Mode;
}
