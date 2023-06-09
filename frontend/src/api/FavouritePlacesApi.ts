import { FavouritePlace, FavouritePlaceParams } from "../types/FavouritePlace";
import axios, { AxiosInstance } from "axios";

const URL = "/favourite-places";
export class FavouritePlacesApi {
  api: AxiosInstance;

  constructor(token: string) {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL as string,
      timeout: 4800,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getAll() {
    const { data: places } = await this.api.get<FavouritePlace[]>(URL);
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
