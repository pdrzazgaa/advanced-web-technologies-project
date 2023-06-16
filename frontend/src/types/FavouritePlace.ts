export interface FavouritePlaceParams {
  name: string;
  latitude: number;
  longitude: number;
  address: string;
}

export interface FavouritePlace extends FavouritePlaceParams {
  id: number;
}

//   name: "moje ulubione miejsce na ziemi",
//   latitude: 51.2232,
//   longitude: 17.234,
//   address: "dzungla",
