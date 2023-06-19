/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { LatLng, LatLngExpression } from "leaflet";

const apiURL = "https://api.geoapify.com/v1/geocode" as string;
const apiKey = "2a49c3c4d96341288e07a17c23549f76" as string;

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
    let lat, lng;

    if (typeof coordinates === "object" && "lat" in coordinates && "lng" in coordinates) {
      const { lat: latitude, lng: longitude } = coordinates as LatLng;
      lat = latitude;
      lng = longitude;
    } else {
      [lat, lng] = coordinates as [number, number];
    }
    const { data } = await Api.get("/reverse", {
      params: { lat, lon: lng, apiKey },
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
