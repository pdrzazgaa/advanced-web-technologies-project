import { FavouritePlace, FavouritePlaceParams } from "../types/FavouritePlace";
import axios, { AxiosInstance } from "axios";

const URL = `${process.env.REACT_APP_API_URL}/favourite-places`;
export class FavouritePlacesApi {
  api: AxiosInstance;

  constructor(token: string) {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_,
      timeout: 4800,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getAll() {
    const { data: places } = await this.api.get<FavouritePlace[]>(URL);
    console.log("getting");
    return places;
  }

  async addNewPlace(place: FavouritePlaceParams) {
    const { data } = await this.api.post(URL, place);
    return data;
  }

  async deletePlace(id: number) {
    const { data } = await this.api.delete(`${URL}/${id}`);
    return data;
  }
}
