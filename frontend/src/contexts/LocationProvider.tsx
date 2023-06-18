/* eslint-disable react-refresh/only-export-components */
import { Page } from "../types/Page";
import { PathElem } from "../types/Route";
import { LatLngExpression } from "leaflet";
import React, { useContext, useState, ReactNode } from "react";

interface LocationProviderProps {
  children: ReactNode;
}

interface LocationContextValue {
  position: LatLngExpression | null;
  setPosition: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
  sourcePosition: LatLngExpression | null;
  setSourcePosition: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
  destPosition: LatLngExpression | null;
  setDestPosition: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
  page: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
  favPlacePosition: LatLngExpression | null;
  setFavPlacePosition: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
  path: PathElem[] | null;
  setPath: React.Dispatch<React.SetStateAction<PathElem[] | null>>;
}

export const LocationContext = React.createContext<LocationContextValue | null>(null);

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const [sourcePosition, setSourcePosition] = useState<LatLngExpression | null>(null);
  const [destPosition, setDestPosition] = useState<LatLngExpression | null>(null);
  const [favPlacePosition, setFavPlacePosition] = useState<LatLngExpression | null>(null);
  const [page, setPage] = useState<Page>("route");
  const [path, setPath] = useState<PathElem[] | null>(null);

  return (
    <LocationContext.Provider
      value={{
        position,
        setPosition,
        sourcePosition,
        setSourcePosition,
        destPosition,
        setDestPosition,
        page,
        setPage,
        favPlacePosition,
        setFavPlacePosition,
        path,
        setPath,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export function useLocation() {
  return useContext(LocationContext) as LocationContextValue;
}
