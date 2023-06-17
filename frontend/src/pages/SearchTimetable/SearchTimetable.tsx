import BottomBar from "../../components/BottomBar";
import { Stack } from "@mui/material";
import React, { FC } from "react";

const SearchTimetable: FC = () => {
  return (
    <Stack>
      <BottomBar activeButton="timetable" />
    </Stack>
  );
};

export default SearchTimetable;
