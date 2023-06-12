import React, { FC } from "react";
import BottomBar from "../../components/BottomBar";
import { Stack } from "@mui/material";

const SearchTimetable: FC = () => {
  return (
    <Stack>
      <BottomBar activeButton="timetable" />
    </Stack>
  );
};

export default SearchTimetable;
