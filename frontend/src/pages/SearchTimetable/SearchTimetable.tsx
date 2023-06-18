import BottomBar from "../../components/BottomBar";
import { useLocation } from "../../contexts";
import { Stack } from "@mui/material";
import React, { FC, useEffect } from "react";

const SearchTimetable: FC = () => {
  const { setPage, setPath } = useLocation();

  useEffect(() => {
    setPage("else");
    setPath(null);
  }, []);

  return (
    <Stack>
      <BottomBar activeButton="timetable" />
    </Stack>
  );
};

export default SearchTimetable;
