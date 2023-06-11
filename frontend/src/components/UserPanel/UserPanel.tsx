import { SearchParams } from "../../types/SearchParams";
import BottomBar from "./BottomBar";
import SearchResults from "./SearchResults";
import Searchbar from "./Searchbar";
import PersonIcon from "@mui/icons-material/Person";
import { Stack, Paper, Typography } from "@mui/material";
import React, { FC, useState } from "react";

const UserPanel: FC = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    source: null,
    destination: null,
    time: new Date(),
    mode: "opt",
  });

  return (
    <Paper
      sx={{
        zIndex: 9999,
        height: "90vh",
        width: "30vw",
        minWidth: "400px",
        position: "absolute",
        left: "50px",
        top: "5vh",
        borderRadius: 4,
      }}
    >
      <Stack spacing={4} py={4}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" px={4}>
          <Typography variant="h2" align="center" ml="34px" sx={{ flexGrow: 1 }}>
            HowToGetTo
          </Typography>
          <PersonIcon sx={{ fontSize: 46 }} />
        </Stack>
        <Searchbar setSearchParams={setSearchParams} />
        <SearchResults />
        <BottomBar />
      </Stack>
    </Paper>
  );
};

export default UserPanel;
