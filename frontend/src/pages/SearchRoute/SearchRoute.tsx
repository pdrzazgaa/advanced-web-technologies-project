import BottomBar from "../../components/BottomBar";
import TopBar from "../../components/TopBar";
import { useLocation } from "../../contexts";
import { Search } from "../../types/SearchParams";
import Results from "./Results";
import Searchbar from "./SearchResults";
import { Stack } from "@mui/material";
import { LatLngExpression } from "leaflet";
import React, { FC, useEffect, useState } from "react";

const DEFAULT_POSITION = [51.107883, 17.038538] as LatLngExpression;
const MAX_LOCATING_TIME = 6000;

const SearchRoute: FC = () => {
  const [searchParams, setSearchParams] = useState<Search | null>(null);
  const { setPage, position, setPosition, setPath } = useLocation();
  const [showResults, setShowResults] = useState(true);

  useEffect(() => {
    setPage("route");
    setPath(null);
    if (!position) {
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
  }, []);

  return (
    <Stack spacing={2} pt={4} display="flex" flexDirection="column" height="100%">
      {showResults && searchParams ? (
        <Results
          returnToSearch={() => {
            setShowResults(false);
            setPath(null);
          }}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
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
