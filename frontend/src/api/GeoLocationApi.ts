import axios from "axios";
import { LatLngExpression } from "leaflet";

// const apiKey = process.env.REACT_APP_GEO_API_KEY;
// const apiURL = process.env.REACT_APP_GEO_API_URL as string;
const apiKey = "2a49c3c4d96341288e07a17c23549f76";
const apiURL = "https://api.geoapify.com/v1/geocode";
const SEARCH_SPECIFIER = "Wrocław, Poland";
const Api = axios.create({
  baseURL: apiURL,
  timeout: 4800,
});

export class GeoLocationApi {
  static async getCoordinates(address: string) {
    let text = address;
    if (!text.endsWith(SEARCH_SPECIFIER)) {
      text += `, ${SEARCH_SPECIFIER}`;
    }
    const { data } = await Api.get("/search", {
      params: { text, apiKey },
    });
    const [lon, lat] = data.features[0].geometry.coordinates;
    console.log([lat, lon]);
    return [lat, lon] as LatLngExpression;
  }

  static async getAddress(coordinates: LatLngExpression) {
    const [lat, lon] = coordinates as Array<number>; // 51 17 lat lon
    const { data } = await Api.get("/reverse", {
      params: { lat, lon, apiKey },
    });
    const address = data.features[0].properties.formatted;
    console.log(address);
    return address;
  }

  // static async searchAutocompleteAddress(address: string) {}
}
