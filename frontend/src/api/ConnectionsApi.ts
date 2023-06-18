import axios from "axios";
import { SearchParams } from "../types/SearchParams";
import { Connection } from "../types/Route";

const Api = axios.create({
  baseURL: process.env.REACT_APP_,
  timeout: 10000,
});

const URL = `${process.env.REACT_APP_API_URL}/connection`;
export class ConnectionsApi {
  static async getAll(params: SearchParams) {
    const { data: places } = await Api.get<Connection[]>(URL, { params: params });
    return places;
  }
}
