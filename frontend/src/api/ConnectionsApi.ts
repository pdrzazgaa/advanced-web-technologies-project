import { Connection } from "../types/Route";
import { SearchParams } from "../types/SearchParams";
import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});

const URL = "connection";
export class ConnectionsApi {
  static async getAll(params: SearchParams) {
    const { data: places } = await Api.get<Connection[]>(URL, { params: params });
    return places;
  }
}
