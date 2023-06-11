import React, { FC } from "react";
import { Stack, Paper, Typography } from "@mui/material";
import Searchbar from "./Searchbar";
import BottomBar from "./BottomBar";
import PersonIcon from "@mui/icons-material/Person";

const UserPanel: FC = () => {
  return (
    <Paper
      sx={{
        zIndex: 9999,
        height: "90vh",
        width: "30vw",
        position: "absolute",
        left: "50px",
        top: "5vh",
        borderRadius: "20px",
      }}
    >
      <Stack spacing={4} p={4}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h2" align="center" ml="34px" sx={{ flexGrow: 1 }}>
            HowToGetTo
          </Typography>
          <PersonIcon sx={{ fontSize: 34 }} />
        </Stack>
        <Searchbar />
        <BottomBar />
      </Stack>
    </Paper>
  );
};

export default UserPanel;
