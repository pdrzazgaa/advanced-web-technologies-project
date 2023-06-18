import { useLocation } from "../../contexts";
import DestinationLocationMarker from "./DestinationLocationMarker";
import LocationButton from "./LocationButton";
import LocationMarker from "./LocationMarker";
import "./Map.css";
import SourceLocationMarker from "./SourceLocationMarker";
import { CircularProgress } from "@mui/material";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { FC } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

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
