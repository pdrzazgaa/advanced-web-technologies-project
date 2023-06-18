import { FavouritePlacesApi } from "../../api/FavouritePlacesApi";
import { MESSAGE } from "../../constants/messages";
import { URLS } from "../../constants/urls";
import { useLocation } from "../../contexts";
import { useUser } from "../../contexts/UserProvider";
import { FavouritePlace } from "../../types/FavouritePlace";
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import {
  Alert,
  AlertTitle,
  Stack,
  Button,
  Link,
  Typography,
  CircularProgress,
  Popover,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { FC, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const FavouritePlacesMenu: FC = () => {
  const { token } = useUser();
  const Api = new FavouritePlacesApi(token);
  const { data: places, isError, isLoading } = useQuery(["favouritePlaces"], () => Api.getAll());
  const { setSourcePosition, setDestPosition } = useLocation();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<FavouritePlace | null>(null);

  return (
    <Stack direction="row" px={4} alignItems="center" justifyContent="center">
      {isError ? (
        <Alert icon={<ErrorIcon />} color="error">
          <AlertTitle>{MESSAGE.PLACES_LOAD_ERROR}</AlertTitle>
        </Alert>
      ) : isLoading ? (
        <CircularProgress size={40} sx={{ color: "text.secondary" }} />
      ) : places.length ? (
        places.map((place, idx) => (
          <React.Fragment key={idx}>
            <Button
              sx={{ color: "text.secondary", width: 80, textTransform: "none" }}
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
                setSelectedPlace(place);
              }}
            >
              <Stack direction="column" width="100%">
                <LocationOnIcon
                  sx={{ fontSize: 32, color: "text.secondary", alignSelf: "center" }}
                />
                <Typography noWrap sx={{ fontSize: "14px" }}>
                  {place.name}
                </Typography>
              </Stack>
            </Button>
            <Popover
              open={selectedPlace === place}
              anchorEl={anchorEl}
              onClose={() => setSelectedPlace(null)}
            >
              <Stack direction="column" gap={1}>
                <Button
                  sx={{ textTransform: "none", py: 0, height: "40px" }}
                  onClick={() => {
                    setSourcePosition([place.latitude, place.longitude]);
                    setSelectedPlace(null);
                  }}
                >
                  <TripOriginIcon sx={{ color: "green.main", mr: 1 }} />
                  <Typography>Ustaw tu punkt startowy</Typography>
                </Button>
                <Button
                  sx={{ textTransform: "none", py: 0, height: "40px" }}
                  onClick={() => {
                    setDestPosition([place.latitude, place.longitude]);
                    setSelectedPlace(null);
                  }}
                >
                  <TripOriginIcon sx={{ color: "blue.main", mr: 1 }} />
                  <Typography>Ustaw tu punkt końcowy</Typography>
                </Button>
              </Stack>
            </Popover>
          </React.Fragment>
        ))
      ) : null}
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
