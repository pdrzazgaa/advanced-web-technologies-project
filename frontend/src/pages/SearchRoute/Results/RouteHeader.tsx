import TripOriginIcon from "@mui/icons-material/TripOrigin";
import { Stack, Typography } from "@mui/material";
import React, { FC } from "react";

interface RouterHeaderProps {
  source: string;
  destination: string;
}
const RouteHeader: FC<RouterHeaderProps> = ({ source, destination }) => {
  const locations = [
    { iconColor: "green.main", text: source },
    { iconColor: "blue.main", text: destination },
  ];

  return (
    <Stack gap={2} px={4}>
      {locations.map((location, index) => (
        <Stack key={index} gap={2} direction="row">
          <TripOriginIcon sx={{ color: location.iconColor }} />
          <Typography sx={{ color: "text.secondary" }} noWrap>
            {location.text}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default RouteHeader;
