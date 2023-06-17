import { Address } from "./Address";

export interface FavouritePlaceParams extends Address {
  address: string;
}

export interface FavouritePlace extends FavouritePlaceParams {
  id: number;
}
