import "leaflet/dist/leaflet.css";
import "./Map.css";
import React, { FC } from "react";
import { MapContainer, TileLayer, Popup } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import { useLocation } from "../../contexts";

const Map: FC = () => {
  const { position } = useLocation();

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </LocationMarker>
    </MapContainer>
  );
};

export default Map;
