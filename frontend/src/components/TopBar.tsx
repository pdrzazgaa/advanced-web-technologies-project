import { URLS } from "../constants/urls";
import GoogleAuthButton from "./GoogleAuthButton";
import UserAvatar from "./UserAvatar";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Stack, Typography, Link, Button } from "@mui/material";
import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

interface TopBarProps {
  showReturnButton?: boolean;
  returnPath?: string;
  onArrowClick?: () => void;
}

const TopBar: FC<TopBarProps> = ({
  showReturnButton = false,
  returnPath = URLS.SEARCH_ROUTE,
  onArrowClick,
}) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" px={4} mb={2}>
      {showReturnButton && (
        <Link
          component={RouterLink}
          to={returnPath}
          alignSelf="left"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          <KeyboardArrowLeftIcon sx={{ fontSize: 50 }} />
        </Link>
      )}
      {onArrowClick && (
        <Button
          onClick={onArrowClick}
          sx={{
            color: "text.secondary",
          }}
        >
          <KeyboardArrowLeftIcon sx={{ fontSize: 50 }} />
        </Button>
      )}
      <Typography variant="h2" sx={{ color: "text.secondary" }}>
        HowToGetTo
      </Typography>
      <Stack direction="row">
        <GoogleAuthButton />
        <UserAvatar />
      </Stack>
    </Stack>
  );
};

export default TopBar;
