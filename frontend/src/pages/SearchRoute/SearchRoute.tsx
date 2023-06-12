import { Stack, Typography, Box } from "@mui/material";
import React, { FC, useState } from "react";
import BottomBar from "../../components/BottomBar";
import Searchbar from "./Searchbar";
import { SearchParams } from "../../types/SearchParams";
import PersonIcon from "@mui/icons-material/Person";

const SearchRoute: FC = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    source: null,
    destination: null,
    time: new Date(),
    mode: "opt",
  });

  return (
    <Stack spacing={2} py={4} display="flex" flexDirection="column" height="100%">
      <Stack direction="row" alignItems="center" justifyContent="space-between" px={4} mb={2}>
        <Typography variant="h2" align="center" ml="34px" sx={{ flexGrow: 1 }}>
          HowToGetTo
        </Typography>
        <PersonIcon sx={{ fontSize: 46 }} />
      </Stack>
      <Searchbar setSearchParams={setSearchParams} />
      <BottomBar activeButton="route" />
    </Stack>
  );
};

export default SearchRoute;
