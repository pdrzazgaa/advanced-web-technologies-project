import axios from "axios";
import { SearchParams } from "../types/SearchParams";

const Api = axios.create({
  baseURL: process.env.REACT_APP_,
  timeout: 4800,
});

const URL = `${process.env.REACT_APP_API_URL}/connection`;
export class ConnectionsApi {
  static async getAll(params: SearchParams) {
    const { data: places } = await Api.get(URL, { params: params });
    return places;
  }
}
