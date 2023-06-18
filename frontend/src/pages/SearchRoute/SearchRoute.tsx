import BottomBar from "../../components/BottomBar";
import TopBar from "../../components/TopBar";
import { useLocation } from "../../contexts";
import { Search } from "../../types/SearchParams";
import Searchbar from "./SearchResults";
import { Stack } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import Results from "./Results";

const DEFAULT_POSITION = [51.107883, 17.038538] as LatLngExpression;
const MAX_LOCATING_TIME = 6000;

const SearchRoute: FC = () => {
  const [searchParams, setSearchParams] = useState<Search | null>(null);
  const { setPage, position, setPosition } = useLocation();
  const [showResults, setShowResults] = useState(true);

  useEffect(() => {
    setPage("route");
    if (!position) {
      console.log("posiition undefined");
      navigator.permissions
        .query({ name: "geolocation" })
        .then((status) => {
          if (status.state === "granted") {
            navigator.geolocation.getCurrentPosition(
              ({ coords: { latitude, longitude } }) => {
                setPosition([latitude, longitude]);
              },
              () => {
                setPosition(DEFAULT_POSITION);
              },
              { timeout: MAX_LOCATING_TIME },
            );
          } else {
            setPosition(DEFAULT_POSITION);
          }
        })
        .catch(() => setPosition(DEFAULT_POSITION));
    }
  }, [setPage, position, setPosition]);

  return (
    <Stack spacing={2} pt={4} display="flex" flexDirection="column" height="100%">
      {showResults && searchParams ? (
        <Results returnToSearch={() => setShowResults(false)} searchParams={searchParams} />
      ) : (
        <>
          <TopBar />
          <Searchbar setSearchParams={setSearchParams} setShowResults={setShowResults} />
          <BottomBar activeButton="route" />
        </>
      )}
    </Stack>
  );
};

export default SearchRoute;
