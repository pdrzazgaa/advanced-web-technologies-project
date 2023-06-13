import { Typography, Grid, ListItemButton } from "@mui/material";
import React, { FC } from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { Link } from "react-router-dom";

const BottomBar: FC<{ activeButton: "route" | "timetable" }> = ({ activeButton }) => {
  const bottomBarItems = [
    {
      icon: <ExpandCircleDownIcon sx={{ transform: "rotate(-90deg)", fontSize: 50 }} />,
      label: "Trasa",
      path: "/wroclaw/trasa",
      value: "route",
    },
    {
      icon: <ListAltIcon sx={{ fontSize: 50 }} />,
      label: "Rozkłady",
      path: "/wroclaw/rozklady",
      value: "timetable",
    },
  ];

  return (
    <Grid container gap={4} justifyContent="center" pb={2}>
      {bottomBarItems.map(({ icon, label, path, value }) => (
        <Grid item key={value} sx={{ textAlign: "center" }}>
          <ListItemButton component={Link} to={path} selected={activeButton === value}>
            <Grid container direction="column" alignItems="center">
              <Grid item>{icon}</Grid>
              <Grid item>
                <Typography>{label}</Typography>
              </Grid>
            </Grid>
          </ListItemButton>
        </Grid>
      ))}
    </Grid>
  );
};

export default BottomBar;
