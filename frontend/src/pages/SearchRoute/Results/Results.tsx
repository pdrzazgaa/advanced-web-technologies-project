import React, { FC } from "react";
import TopBar from "../../../components/TopBar";
import { SearchParams, Search } from "../../../types/SearchParams";
import { useQuery } from "@tanstack/react-query";
import { ConnectionsApi } from "../../../api/ConnectionsApi";
import RouteHeader from "./RouteHeader";
import { Alert, AlertTitle, Skeleton, Stack, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { MESSAGE } from "../../../constants/messages";
import Result from "./Result";
interface ResultsProps {
  returnToSearch: () => void;
  searchParams: Search;
}

const Results: FC<ResultsProps> = ({ returnToSearch, searchParams }) => {
  const getSearchParams = ({ source, destination, time, mode }: Search) => {
    return {
      sourceLat: source.latitude,
      sourceLong: source.longitude,
      destinationLat: destination.latitude,
      destinationLong: destination.longitude,
      departureTime: time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      mode,
    };
  };

  const {
    data: connections,
    isError,
    isLoading,
  } = useQuery(
    ["get-source-address", searchParams],
    () => ConnectionsApi.getAll(getSearchParams(searchParams)),
    {
      enabled: Boolean(searchParams),
      onSuccess: (data) => console.log(data),
    },
  );

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
        ) : isLoading ? (
          <Stack
            sx={{
              gap: 2,
            }}
          >
            <Skeleton variant="rounded" height={160} />
            <Skeleton variant="rounded" height={160} />
            <Skeleton variant="rounded" height={160} />
          </Stack>
        ) : connections.length ? (
          connections.map((connection, idx) => <Result connection={connection} key={idx} />)
        ) : (
          <Typography>{"Przejdź się spacerkiem :)"}</Typography>
        )}
      </Stack>
    </>
  );
};
export default Results;
