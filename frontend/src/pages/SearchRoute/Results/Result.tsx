import React, { FC } from "react";
import { Connection } from "../../../types/Route";
import { Paper, Typography } from "@mui/material";

interface ResultsProps {
  connection: Connection;
}

const Result: FC<ResultsProps> = ({ connection }) => {
    return <Paper>
        <Typography>{connection.path[0].departureStop.name}</Typography>
        <Typography>{connection.path[0].arrivalStop.name}</Typography>
  </Paper>;
};

export default Result;
