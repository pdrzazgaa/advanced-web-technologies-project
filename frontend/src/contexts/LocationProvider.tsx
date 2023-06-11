/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useState, ReactNode } from "react";
import { LatLngExpression } from "leaflet";

interface LocationProviderProps {
  children: ReactNode;
}

interface LocationContextValue {
  position: LatLngExpression;
  setPosition: React.Dispatch<React.SetStateAction<LatLngExpression>>;
}

export const LocationContext = React.createContext<LocationContextValue | null>(null);

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [position, setPosition] = useState<LatLngExpression>([51.107883, 17.038538]);

  return (
    <LocationContext.Provider value={{ position, setPosition }}>
      {children}
    </LocationContext.Provider>
  );
};

export function useLocation() {
  return useContext(LocationContext) as LocationContextValue;
}
