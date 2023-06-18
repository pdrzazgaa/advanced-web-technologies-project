import { useLocation } from "../../contexts";
import "./Map.css";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { LocationEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { FC } from "react";
import { useMapEvents } from "react-leaflet";

const LocationButton: FC = () => {
  const { setPosition } = useLocation();

  const map = useMapEvents({
    locationfound(e: LocationEvent) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        map.locate();
      }}
      style={{
        zIndex: 9999,
        position: "absolute",
        top: "90px",
        right: "11px",
        backgroundColor: "white",
        color: "black",
        height: "30px",
        maxWidth: "30px",
        border: "none",
        outline: "2px solid rgba(0,0,0, 0.2)",
        borderRadius: "2px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <MyLocationIcon sx={{ fontSize: 20 }} />
    </button>
  );
};

export default LocationButton;
