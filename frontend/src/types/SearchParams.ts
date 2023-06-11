import { Mode } from "fs";
import { LatLngExpression } from "leaflet";

export interface SearchParams {
  source: LatLngExpression | null;
  destination: LatLngExpression | null;
  mode: Mode;
  time: Date;
}
