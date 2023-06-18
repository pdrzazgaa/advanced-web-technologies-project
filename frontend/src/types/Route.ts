import { Address } from "./Address";

export interface PathElem {
  arrivalStop: Address;
  arrivalTime: string;
  departureStop: Address;
  departureTime: string;
  line: string;
}

export interface Connection {
  arrivalTime: string;
  departureTime: string;
  path: PathElem[];
}
