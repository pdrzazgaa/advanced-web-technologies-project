import { Connection } from "../types/Route";

export const getDistinctLines = (connection: Connection) => {
  const lineSet = new Set<string>();

  connection.path.forEach((pathElem) => {
    lineSet.add(pathElem.line);
  });

  return Array.from(lineSet);
}