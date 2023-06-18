import { useLocation } from "../../contexts";
import DestinationLocationMarker from "./DestinationLocationMarker";
import LocationMarker from "./LocationMarker";
import SourceLocationMarker from "./SourceLocationMarker";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import React, { FC } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import LocationButton from "./LocationButton";
import { LatLngExpression } from "leaflet";
import { CircularProgress } from "@mui/material";

const DEFAULT_POSITION = [51.107883, 17.038538] as LatLngExpression;

const Map: FC = () => {
  const { position } = useLocation();
  const URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <>
      <MapContainer
        center={position || DEFAULT_POSITION}
        zoom={15}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer attribution={attribution} url={URL} />
        <ZoomControl position="topright" />
        <LocationButton />
        <LocationMarker />
        <SourceLocationMarker />
        <DestinationLocationMarker />
      </MapContainer>
      {!position && (
        <CircularProgress
          size={100}
          sx={{
            zIndex: 9999,
            position: "absolute",
            top: "calc(50vh - 50px)",
            left: "calc(50vw - 50px)",
          }}
        />
      )}
    </>
  );
};

export default Map;
