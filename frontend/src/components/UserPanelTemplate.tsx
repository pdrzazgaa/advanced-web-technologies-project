import { Outlet } from "react-router-dom";
import { Paper } from "@mui/material";
import React, { FC } from "react";

const UserPanelTemplate: FC = () => {
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
      <Outlet />
    </Paper>
  );
};

export default UserPanelTemplate;
