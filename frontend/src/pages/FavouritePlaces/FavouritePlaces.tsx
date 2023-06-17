import React, { FC, useEffect } from "react";
import { useUser } from "../../contexts/UserProvider";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../constants/urls";
import { Button, Stack, Typography, Divider, Box, Alert, AlertTitle } from "@mui/material";
import { User } from "../../types/User";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { FavouritePlacesApi } from "../../api/FavouritePlacesApi";
import { MESSAGE } from "../../constants/messages";
import ErrorIcon from "@mui/icons-material/Error";
import { enqueueSnackbar } from "notistack";
import TopBar from "../../components/TopBar";

const FavouritePlaces: FC = () => {
  const navigate = useNavigate();
  const { user, token } = useUser();
  const queryClient = useQueryClient();
  const Api = new FavouritePlacesApi(token);

  useEffect(() => {
    if (user.name == null) {
      navigate(URLS.SEARCH_ROUTE);
    }
  }, [user.name, navigate]);

  const { data: places, isError } = useQuery(["favouritePlaces"], () => Api.getAll());

  const deleteMutation = useMutation((variables: { id: number }) => Api.deletePlace(variables.id), {
    onSuccess: async () => {
      void queryClient.invalidateQueries(["favouritePlaces"]);
      enqueueSnackbar(MESSAGE.DELETE_PLACE_SUCCESS, { variant: "success" });
    },
    onError: () => enqueueSnackbar(MESSAGE.DELETE_PLACE_ERROR, { variant: "error" }),
  });

  const onDeleteClick = (id: number) => {
    deleteMutation.mutate({ id });
  };

  return user.name ? (
    <Stack
      sx={{
        height: "100%",
        borderRadius: 4,
        py: 4,
        gap: 2,
      }}
    >
      <TopBar showReturnButton={true} />
      <Stack
        sx={{
          backgroundColor: "background.default",
          height: "100%",
          color: "text.secondary",
          p: 4,
          gap: 2,
        }}
      >
        {isError ? (
          <Alert icon={<ErrorIcon />} color="error" sx={{ px: 4 }}>
            <AlertTitle>{MESSAGE.PLACES_LOAD_ERROR}</AlertTitle>
          </Alert>
        ) : places ? (
          <>
            {places.length < 4 && (
              <Button
                sx={{
                  color: "text.secondary",
                  textTransform: "none",
                  py: 1,
                  boxShadow: "10px 10px 30px #ccc",
                  "&:hover": {
                    backgroundColor: "yellow.main",
                  },
                  mb: 4,
                }}
              >
                <Typography variant="body2">Dodaj nowe miejsce</Typography>{" "}
                <AddIcon sx={{ ml: "auto" }} />
              </Button>
            )}
            <Divider />
            {places.map((place) => (
              <Box key={place.id}>
                <Stack direction="row">
                  <Typography>{place.name}</Typography>
                  <Button sx={{ ml: "auto", mb: 1 }} onClick={() => onDeleteClick(place.id)}>
                    <DeleteIcon sx={{ color: "vbackground.paper" }} />
                  </Button>
                </Stack>
                <Divider />
              </Box>
            ))}
            {places.length == 0 ? (
              <Typography variant="body2">Nie masz jeszcze żadnych miejsc</Typography>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </Stack>
    </Stack>
  ) : (
    <></>
  );
};

export default FavouritePlaces;
