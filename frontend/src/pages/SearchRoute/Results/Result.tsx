import { Connection } from "../../../types/Route";
import { getDistinctLines } from "../../../utils/routes";
import { formatMinutes, getMinutesDifference, formatHour } from "../../../utils/time";
import TramIcon from "@mui/icons-material/Tram";
import { Paper, Typography, Stack } from "@mui/material";
import React, { FC, useState, useEffect } from "react";

interface ResultsProps {
  connection: Connection;
  onClick: () => void;
}

const Result: FC<ResultsProps> = ({ connection, onClick }) => {
  const departureTime = new Date(connection.departureTime);
  const arrivalTime = new Date(connection.arrivalTime);
  const routeTime = getMinutesDifference(departureTime, arrivalTime);
  const routeTimeFormatted = `${formatMinutes(routeTime)} min`;

  const [leftTime, setLeftTime] = useState(getMinutesDifference(new Date(), departureTime));
  const leftTimeInfo = leftTime > 0 ? "Odjazd za:" : "Odjechał";

  useEffect(() => {
    const interval = setInterval(() => {
      const newLeftTime = getMinutesDifference(new Date(), departureTime);
      setLeftTime(newLeftTime);
    }, 60000);

    return () => clearInterval(interval);
  }, [departureTime]);

  const lines = getDistinctLines(connection);

  return (
    <Paper elevation={5} sx={{ px: 2, py: 4 }} onClick={onClick}>
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
        <Stack gap={1} sx={{ textAlign: "center" }}>
          <Stack direction="row" gap={1}>
            {lines.map((line, idx) =>
              idx < 3 ? (
                <Stack direction="row" key={line}>
                  <TramIcon />
                  <Typography
                    variant="body2"
                    sx={{ border: "1px solid grey", borderRadius: 2, px: 1 }}
                  >
                    {line}
                  </Typography>
                </Stack>
              ) : (
                <></>
              ),
            )}
          </Stack>
          {lines.length > 3 ? <Typography>...</Typography> : <></>}
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
