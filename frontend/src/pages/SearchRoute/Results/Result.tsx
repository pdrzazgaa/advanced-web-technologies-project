import { Connection } from "../../../types/Route";
import { Paper, Typography, Stack } from "@mui/material";
import React, { FC, useState, useEffect } from "react";
import { formatMinutes, getMinutesDifference, formatHour } from "../../../utils/time";
import { getDistinctLines } from "../../../utils/routes";
import TramIcon from "@mui/icons-material/Tram";

interface ResultsProps {
  connection: Connection;
}

const Result: FC<ResultsProps> = ({ connection }) => {
  const departureTime = new Date(connection.departureTime);
  const arrivalTime = new Date(connection.arrivalTime);
  const routeTime = getMinutesDifference(departureTime, arrivalTime);
  const routeTimeFormatted = `${formatMinutes(routeTime)} min`;

  const [leftTime, setLeftTime] = useState(getMinutesDifference(new Date(), departureTime));
  const leftTimeInfo = leftTime ? "Odjazd za:" : "Odjechał";

  useEffect(() => {
    const interval = setInterval(() => {
      const newLeftTime = getMinutesDifference(new Date(), departureTime);
      setLeftTime(newLeftTime);
    }, 60000);

    return () => clearInterval(interval);
  }, [departureTime]);

  const lines = getDistinctLines(connection);
  console.log(lines);
  return (
    <Paper elevation={5} sx={{ px: 2, py: 4 }}>
      <Stack direction="row" gap={1} justifyContent="space-between" alignItems="center">
        <Stack alignItems="center" justifyContent="center" gap={1}>
          <Typography sx={{ fontSize: "14px", color: leftTime ? "text.primary" : "red.main" }}>
            {leftTimeInfo}
          </Typography>
          <Stack direction="row" alignItems="flex-end">
            <Typography sx={{ color: leftTime ? "text.primary" : "red.main", fontSize: 40 }}>
              {formatMinutes(leftTime)}
            </Typography>
            <Typography
              sx={{ fontSize: "12px", ml: "5px", color: leftTime ? "text.primary" : "red.main" }}
            >
              min
            </Typography>
          </Stack>
        </Stack>
        <Stack gap={3}>
          <Stack direction="row" gap={1}>
            {lines.map((line) => (
              <Stack direction="row">
                <TramIcon />
                <Typography
                  variant="body2"
                  sx={{ border: "1px solid grey", borderRadius: 2, px: 1 }}
                >
                  {line}
                </Typography>
              </Stack>
            ))}
          </Stack>
          <Stack direction="row" gap={1}>
            <Typography
              sx={{
                color: "text.secondary",
                backgroundColor: "green.main",
                borderRadius: 2,
                px: 1,
                py: 0.5,
              }}
            >
              {formatHour(departureTime)}
            </Typography>
            <Typography
              sx={{
                py: 0.5,
              }}
            >
              {routeTimeFormatted}
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                backgroundColor: "blue.main",
                borderRadius: 2,
                px: 1,
                py: 0.5,
              }}
            >
              {formatHour(arrivalTime)}
            </Typography>
          </Stack>
        </Stack>
        <Stack>
          <Typography variant="body2">{routeTimeFormatted}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Result;
