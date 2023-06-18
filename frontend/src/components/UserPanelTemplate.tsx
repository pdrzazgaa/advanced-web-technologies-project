import { Paper } from "@mui/material";
import React, { FC } from "react";
import { Outlet } from "react-router-dom";

const UserPanelTemplate: FC = () => {
  return (
    <Paper
      sx={{
        zIndex: 1000,
        height: "90vh",
        width: "30vw",
        minWidth: "450px",
        position: "absolute",
        left: "50px",
        top: "5vh",
        borderRadius: 4,
        backgroundColor: "primary.main",
        overflowY: "hidden",
      }}
    >
      <Outlet />
    </Paper>
  );
};

export default UserPanelTemplate;
