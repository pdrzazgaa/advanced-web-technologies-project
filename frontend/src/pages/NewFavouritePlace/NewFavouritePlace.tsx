import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { IconButton, Stack, TextField, Button, Typography } from "@mui/material";
import TopBar from "../../components/TopBar";
import { URLS } from "../../constants/urls";
import { useUser } from "../../contexts/UserProvider";
import { Clear } from "@mui/icons-material";
import AsyncAutoselect from "../../components/AsyncAutoselect";
import { Address } from "../../types/Address";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { MESSAGE } from "../../constants/messages";
import { FavouritePlacesApi } from "../../api/FavouritePlacesApi";
import { useNavigate } from "react-router-dom";

const NewFavouritePlace: FC = () => {
  const { user, token } = useUser();
  const [name, setName] = useState("");
  const [address, setAddress] = useState<Address | null>(null);
  const Api = new FavouritePlacesApi(token);
  const navigate = useNavigate();
   const queryClient = useQueryClient();
  useEffect(() => {
    if (user.name == null) {
      navigate(URLS.FAVOURITE_PLACES);
    }
  }, [user.name, navigate]);

  const addMutation = useMutation(
    (address: Address) =>
      Api.addNewPlace({
        latitude: address.latitude,
        longitude: address.longitude,
        address: address.name,
        name: name,
      }),
    {
      onSuccess: async () => {
        void queryClient.invalidateQueries(["favouritePlaces"]);
        enqueueSnackbar(MESSAGE.ADD_PLACE_SUCCESS, { variant: "success" });
        navigate(URLS.FAVOURITE_PLACES);
      },
      onError: () => enqueueSnackbar(MESSAGE.ADD_PLACE_ERROR, { variant: "error" }),
    },
  );

  const onSubmit = (e: FormEvent) => {
    if (address) {
      e.preventDefault();
      addMutation.mutate(address);
    }
  };

  return (
    <Stack
      sx={{
        height: "100%",
        borderRadius: 4,
        py: 4,
        gap: 2,
      }}
    >
      {user.name && (
        <>
          <TopBar showReturnButton={true} returnPath={URLS.FAVOURITE_PLACES} />
          <Stack
            sx={{
              backgroundColor: "background.default",
              height: "100%",
              p: 4,
              gap: 2,
            }}
          >
            <form onSubmit={onSubmit}>
              <Stack gap={2}>
                <TextField
                  label="Nazwa"
                  fullWidth
                  variant="outlined"
                  value={name}
                  autoComplete="off"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        data-test="clear-button"
                        sx={{
                          visibility: name ? "visible" : "hidden",
                          border: "1px solid #ccc",
                        }}
                        onClick={() => setName("")}
                      >
                        <Clear sx={{ fontSize: "20px", color: "black" }} />
                      </IconButton>
                    ),
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "text.primary",
                    },
                  }}
                />
                <AsyncAutoselect onAddressSearch={setAddress} queryKey="favourite-address" />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "100%",
                    height: "56px",
                    textTransform: "none",
                  }}
                  disabled={!address || !name}
                >
                  <Typography>Zapisz</Typography>
                </Button>
              </Stack>
            </form>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default NewFavouritePlace;
