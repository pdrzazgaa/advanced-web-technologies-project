import { Mode } from "fs";
import { LatLngExpression } from "leaflet";

export interface SearchParams {
  departure: LatLngExpression | null;
  arrival: LatLngExpression | null;
  mode: Mode;
  time: Date;
}
