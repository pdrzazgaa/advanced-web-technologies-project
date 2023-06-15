// import axios from "axios";

// const apiURL = "";
// const token = ""
// export class GeoLocationApi {
//     const Api = axios.create({
//   baseURL: apiURL,
//     timeout: 4800,
//     headers: {
//       'Authorization': `Bearer ${token}`
//   }
//     });
    
//   static async getCoordinates(address: string) {
//     let text = address;
//     if (!text.endsWith(SEARCH_SPECIFIER)) {
//       text += `, ${SEARCH_SPECIFIER}`;
//     }
//     const { data } = await Api.get("/search", {
//       params: { text, apiKey },
//     });
//     const [lon, lat] = data.features[0].geometry.coordinates;
//     console.log([lat, lon]);
//     return [lat, lon] as LatLngExpression;
//   }

//   static async getAddress(coordinates: LatLngExpression) {
//     const [lat, lon] = coordinates as Array<number>; // 51 17 lat lon
//     const { data } = await Api.get("/reverse", {
//       params: { lat, lon, apiKey },
//     });
//     const address = data.features[0].properties.formatted;
//     console.log(address);
//     return address;
//   }

//   // static async searchAutocompleteAddress(address: string) {}
// }
