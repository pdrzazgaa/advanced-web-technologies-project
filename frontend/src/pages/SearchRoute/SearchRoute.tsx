import { useQuery } from "@tanstack/react-query";
import { ConnectionsApi } from "../../api/ConnectionsApi";
import BottomBar from "../../components/BottomBar";
import TopBar from "../../components/TopBar";
import { useLocation } from "../../contexts";
import { SearchParams } from "../../types/SearchParams";
import Searchbar from "./Searchbar";
import { Stack } from "@mui/material";
import React, { FC, useEffect, useState } from "react";

const SearchRoute: FC = () => {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const { setPage } = useLocation();
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setPage("route");
  }, []);

  const {
    data: places,
    isError,
    isLoading,
  } = useQuery(
    ["get-source-address", searchParams],
    async () => {
      if (searchParams) {
        setShowResults(true);
        const address = await ConnectionsApi.getAll(searchParams);
        return address;
      }
      return null;
    },
    {
      enabled: Boolean(searchParams),
      onSuccess: (data) => console.log(data),
    },
  );

  return (
    <Stack spacing={2} pt={4} display="flex" flexDirection="column" height="100%">
      <TopBar />
      <Searchbar setSearchParams={setSearchParams} />
      <BottomBar activeButton="route" />
    </Stack>
  );
};

export default SearchRoute;
