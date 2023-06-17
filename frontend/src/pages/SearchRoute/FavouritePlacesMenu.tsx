import { FavouritePlacesApi } from "../../api/FavouritePlacesApi";
import { MESSAGE } from "../../constants/messages";
import { URLS } from "../../constants/urls";
import { useUser } from "../../contexts/UserProvider";
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Alert,
  AlertTitle,
  Stack,
  Button,
  Link,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

const FavouritePlacesMenu: FC = () => {
  const { token } = useUser();
  const Api = new FavouritePlacesApi(token);
  const { data: places, isError, isLoading } = useQuery(["favouritePlaces"], () => Api.getAll());

  return (
    <Stack direction="row" px={4} alignItems="center" justifyContent="center">
      {isError ? (
        <Alert icon={<ErrorIcon />} color="error">
          <AlertTitle>{MESSAGE.PLACES_LOAD_ERROR}</AlertTitle>
        </Alert>
      ) : // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      isLoading || true ? (
        <Stack direction="row" gap={2}>
          <CircularProgress size={40} sx={{ color: "grey" }} />
          <CircularProgress size={40} sx={{ color: "text.primary" }} />
        </Stack>
      ) : places && places.length ? (
        places.map((place, idx) => (
          <Button key={idx} sx={{ color: "text.secondary", width: 80, textTransform: "none" }}>
            <Stack direction="column" width="100%">
              <LocationOnIcon sx={{ fontSize: 32, color: "text.secondary", alignSelf: "center" }} />
              <Typography noWrap sx={{ fontSize: "14px" }}>
                {place.name}
              </Typography>
            </Stack>
          </Button>
        ))
      ) : (
        <></>
      )}
      <Link component={RouterLink} to={URLS.FAVOURITE_PLACES} ml="auto" alignSelf="right">
        <Stack direction="column" alignItems="center">
          <EditIcon sx={{ color: "yellow.main", fontSize: 32 }} />
          <Typography sx={{ color: "yellow.main", fontSize: "14px" }}>Moje miejsca</Typography>
        </Stack>
      </Link>
    </Stack>
  );
};

export default FavouritePlacesMenu;
