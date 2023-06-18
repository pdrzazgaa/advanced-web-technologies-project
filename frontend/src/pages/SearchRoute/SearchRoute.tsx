import BottomBar from "../../components/BottomBar";
import TopBar from "../../components/TopBar";
import { useLocation } from "../../contexts";
import { SearchParams } from "../../types/SearchParams";
import Searchbar from "./Searchbar";
import { Stack } from "@mui/material";
import React, { FC, useEffect, useState } from "react";

const SearchRoute: FC = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    source: null,
    destination: null,
    time: new Date(),
    mode: "opt",
  });
  const { setPage } = useLocation();

  useEffect(() => {
    setPage("route");
  }, []);

  return (
    <Stack spacing={2} pt={4} display="flex" flexDirection="column" height="100%">
      <TopBar />
      <Searchbar setSearchParams={setSearchParams} />
      <BottomBar activeButton="route" />
    </Stack>
  );
};

export default SearchRoute;
