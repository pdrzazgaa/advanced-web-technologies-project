import { Mode } from "fs";
export interface SearchParams {
  sourceLat: number,
  sourceLong: number,
  destinationLat: number,
  destinationLong: number,
  departureTime: Date | string,
  mode: Mode,
}
