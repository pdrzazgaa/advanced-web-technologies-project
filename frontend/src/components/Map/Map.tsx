import { useLocation } from "../../contexts";
import { PathElem } from "../../types/Route";
import { getRouteStops, stringToColor } from "../../utils/routes";
import DestinationLocationMarker from "./DestinationLocationMarker";
import LocationButton from "./LocationButton";
import LocationMarker from "./LocationMarker";
import "./Map.css";
import SourceLocationMarker from "./SourceLocationMarker";
import { CircularProgress, Typography } from "@mui/material";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { FC, useEffect, useState } from "react";
import { MapContainer, TileLayer, ZoomControl, Polyline, CircleMarker, Popup } from "react-leaflet";

const DEFAULT_POSITION = [51.107883, 17.038538] as LatLngExpression;

const Map: FC = () => {
  const { position, path } = useLocation();
  const URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const [linePath, setLinePath] = useState<PathElem[] | null>(null);

  useEffect(() => {
    setLinePath(path);
  }, [path]);

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
        {linePath &&
          getRouteStops(linePath).map(
            (
              {
                stopNames,
                pathCoords,
                line,
              }: { stopNames: string[]; pathCoords: LatLngExpression[]; line: string },
              idx,
            ) => (
              <React.Fragment key={idx}>
                <Polyline
                  positions={pathCoords}
                  color={stringToColor(`${line + line}B`)}
                  weight={5}
                />
                <CircleMarker
                  center={pathCoords[0]}
                  radius={7}
                  fill={true}
                  fillColor="blue"
                  color={stringToColor(`${line + line}B`)}
                >
                  <Popup>
                    <Typography>{stopNames[0]}</Typography>
                  </Popup>
                </CircleMarker>
                {idx === linePath.length - 1 && (
                  <CircleMarker
                    center={pathCoords[1]}
                    radius={7}
                    fill={true}
                    fillColor={stringToColor(`${line + line}B`)}
                    color={stringToColor(`${line + line}B`)}
                  >
                    <Popup>
                      <Typography>{stopNames[1]}</Typography>
                    </Popup>
                  </CircleMarker>
                )}
              </React.Fragment>
            ),
          )}
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
