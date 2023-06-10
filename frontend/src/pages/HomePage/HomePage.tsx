import Map from "../../components/Map";
import UserPanel from "../../components/UserPanel/UserPanel";
import { Stack } from "@mui/material";
import React from "react";

export default function HomePage() {
  return (
    <Stack width="100%" height="100%">
      <Map />
      <UserPanel />
    </Stack>
  );
}
