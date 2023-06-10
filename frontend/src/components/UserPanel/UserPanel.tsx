import { Stack } from "@mui/material";
import React from "react";

export default function UserPanel() {
  return (
    <Stack
      sx={{
        zIndex: 9999,
        height: "200px",
        width: "150px",
        backgroundColor: "grey",
        position: "absolute",
        left: "500px",
        top: "500px",
      }}
    >
      UserPanel
    </Stack>
  );
}
