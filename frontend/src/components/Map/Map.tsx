import "./Map.css";
import "leaflet/dist/leaflet.css";
import React, { FC } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map: FC = () => {
  return (
    <MapContainer center={[51.107883, 17.038538]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.107883, 17.038538]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
