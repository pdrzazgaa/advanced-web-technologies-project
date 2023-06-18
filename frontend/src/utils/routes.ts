import { Connection, PathElem } from "../types/Route";
import { LatLngExpression } from "leaflet";

export const getDistinctLines = (connection: Connection) => {
  const lineSet = new Set<string>();

  connection.path.forEach((pathElem) => {
    lineSet.add(pathElem.line);
  });

  return Array.from(lineSet);
};

export const getRouteStops = (path: PathElem[]) =>
  path.map((pathElem: PathElem) => {
    const { departureStop, arrivalStop, line } = pathElem;
    const departureLatLng: LatLngExpression = [departureStop.latitude, departureStop.longitude];
    const arrivalLatLng: LatLngExpression = [arrivalStop.latitude, arrivalStop.longitude];

    return {
      stopNames: [departureStop.name, arrivalStop.name],
      pathCoords: [departureLatLng, arrivalLatLng],
      line: line,
    };
  });

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
