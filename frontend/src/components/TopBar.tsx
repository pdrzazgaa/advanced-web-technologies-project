import { Stack, Typography, Link } from "@mui/material";
import React, { FC } from "react";
import GoogleAuthButton from "./GoogleAuthButton";
import UserAvatar from "./UserAvatar";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Link as RouterLink } from "react-router-dom";
import { URLS } from "../constants/urls";

interface TopBarProps {
  showReturnButton?: boolean;
}

const TopBar: FC<TopBarProps> = ({ showReturnButton = false }) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" px={4} mb={2}>
      {showReturnButton ? (
        <Link
          component={RouterLink}
          to={URLS.SEARCH_ROUTE}
          alignSelf="left"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "white",
          }}
        >
          <KeyboardArrowLeftIcon sx={{ fontSize: 50 }} />
        </Link>
      ) : (
        <></>
      )}
      <Typography variant="h2">HowToGetTo</Typography>
      <Stack direction="row">
        <GoogleAuthButton />
        <UserAvatar />
      </Stack>
    </Stack>
  );
};

export default TopBar;
