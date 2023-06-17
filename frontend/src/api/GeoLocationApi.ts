/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { LatLngExpression } from "leaflet";

// const SEARCH_SPECIFIER = "Wrocław, Poland";
// if (!text.endsWith(SEARCH_SPECIFIER)) {
//   text += `, ${SEARCH_SPECIFIER}`;
// }

const apiKey = process.env.REACT_APP_GEO_API_KEY as string;
const apiURL = process.env.REACT_APP_GEO_API_URL as string;
const Api = axios.create({
  baseURL: apiURL,
  timeout: 4800,
});

const formatAddress = (address: any) => {
  const [longitude, latitude] = address.geometry.coordinates;
  const name = address.properties.formatted;
  return {
    name,
    latitude,
    longitude,
  };
};
export class GeoLocationApi {
  static async getCoordinates(text: string) {
    const { data } = await Api.get("/search", {
      params: { text, apiKey },
    });
    const { latitude, longitude } = formatAddress(data.features[0]);
    return [latitude, longitude] as LatLngExpression;
  }

  static async getAddress(coordinates: LatLngExpression) {
    const [lat, lon] = coordinates as Array<number>; // 51 17 lat lon
    const { data } = await Api.get("/reverse", {
      params: { lat, lon, apiKey },
    });
    const name = formatAddress(data.features[0]);
    return name;
  }

  static async searchAddress(text: string) {
    const { data } = await Api.get("/autocomplete", {
      params: { text, apiKey },
    });
    const addressess = data.features.map((feature: any) => formatAddress(feature));
    return addressess;
  }
}
