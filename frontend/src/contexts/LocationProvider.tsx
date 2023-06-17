/* eslint-disable react-refresh/only-export-components */
import { LatLngExpression } from "leaflet";
import React, { useContext, useState, ReactNode } from "react";

interface LocationProviderProps {
  children: ReactNode;
}

interface LocationContextValue {
  position: LatLngExpression;
  setPosition: React.Dispatch<React.SetStateAction<LatLngExpression>>;
  sourcePosition: LatLngExpression | null;
  setSourcePosition: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
  destPosition: LatLngExpression | null;
  setDestPosition: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
}

export const LocationContext = React.createContext<LocationContextValue | null>(null);

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [position, setPosition] = useState<LatLngExpression>([51.107883, 17.038538]);
  const [sourcePosition, setSourcePosition] = useState<LatLngExpression | null>(null);
  const [destPosition, setDestPosition] = useState<LatLngExpression | null>(null);

  return (
    <LocationContext.Provider
      value={{
        position,
        setPosition,
        sourcePosition,
        setSourcePosition,
        destPosition,
        setDestPosition,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export function useLocation() {
  return useContext(LocationContext) as LocationContextValue;
}
