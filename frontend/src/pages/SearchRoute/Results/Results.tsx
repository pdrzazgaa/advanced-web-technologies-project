import { ConnectionsApi } from "../../../api/ConnectionsApi";
import TopBar from "../../../components/TopBar";
import { MESSAGE } from "../../../constants/messages";
import { Connection } from "../../../types/Route";
import { Search } from "../../../types/SearchParams";
import { formatLocalTime } from "../../../utils/time";
import Result from "./Result";
import RouteHeader from "./RouteHeader";
import ErrorIcon from "@mui/icons-material/Error";
import { Alert, AlertTitle, Button, Skeleton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { FC, useState } from "react";

interface ResultsProps {
  returnToSearch: () => void;
  searchParams: Search;
  setSearchParams: React.Dispatch<React.SetStateAction<Search | null>>;
}

const Results: FC<ResultsProps> = ({ returnToSearch, searchParams, setSearchParams }) => {
  const getSearchParams = ({ source, destination, time, mode }: Search) => {
    return {
      sourceLat: source.latitude,
      sourceLong: source.longitude,
      destinationLat: destination.latitude,
      destinationLong: destination.longitude,
      departureTime: formatLocalTime(time),
      mode,
    };
  };
  const [connections, setConnections] = useState<Connection[] | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  const {
    data: foundConnections,
    isError,
    isLoading,
  } = useQuery(
    ["get-source-address", searchParams],
    () => ConnectionsApi.getAll(getSearchParams(searchParams)),
    {
      enabled: Boolean(searchParams),
      onSuccess: (data) => {
        setShowLoading(false);
        connections ? setConnections([...connections, ...data]) : setConnections(data);
      },
    },
  );

  const searchLaterConnections = () => {
    setShowLoading(true);
    if (foundConnections) {
      const newTime = new Date(foundConnections[foundConnections.length - 1].departureTime);

      setSearchParams({
        source: searchParams.source,
        destination: searchParams.destination,
        time: newTime,
        mode: searchParams.mode,
      });
    }
  };

  return (
    <>
      <TopBar onArrowClick={returnToSearch} />
      <RouteHeader source={searchParams.source.name} destination={searchParams.destination.name} />
      <Stack
        sx={{
          backgroundColor: "background.default",
          height: "100vh",
          p: 4,
          gap: 2,
          overflowY: "scroll",
          scrollbarWidth: "none",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {isError ? (
          <Alert icon={<ErrorIcon />} color="error">
            <AlertTitle>{MESSAGE.SEARCH_ROUTES_ERROR}</AlertTitle>
          </Alert>
        ) : isLoading && !connections ? (
          <Stack
            sx={{
              gap: 2,
            }}
          >
            <Skeleton variant="rounded" height={160} />
            <Skeleton variant="rounded" height={160} />
            <Skeleton variant="rounded" height={160} />
          </Stack>
        ) : connections && connections.length ? (
          <>
            {connections.map((connection, idx) => (
              <Result connection={connection} key={idx} />
            ))}
            {showLoading ? (
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            ) : (
              <Button onClick={searchLaterConnections}>Późniejsze połączenia</Button>
            )}
          </>
        ) : (
          <Typography>{"Przejdź się spacerkiem :)"}</Typography>
        )}
      </Stack>
    </>
  );
};
export default Results;
