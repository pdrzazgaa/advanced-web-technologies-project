import { useLocation } from "../../contexts";
import LocationMarker from "./LocationMarker";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import React, { FC } from "react";
import { MapContainer, TileLayer, Popup } from "react-leaflet";

const Map: FC = () => {
  const { position } = useLocation();
  const URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
      <TileLayer attribution={attribution} url={URL} />
      <LocationMarker>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </LocationMarker>
    </MapContainer>
  );
};

export default Map;
