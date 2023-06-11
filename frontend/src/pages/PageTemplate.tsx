import Map from "../components/Map";
import UserPanelTemplate from "../components/UserPanelTemplate";
import { Stack } from "@mui/material";
import React from "react";

export default function PageTemplate() {
  return (
    <Stack width="100%" height="100%">
      <Map />
      <UserPanelTemplate />
    </Stack>
  );
}
