import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Autocomplete, IconButton, Stack, TextField } from "@mui/material";
import TopBar from "../../components/TopBar";
import { URLS } from "../../constants/urls";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FavouritePlacesApi } from "../../api/FavouritePlacesApi";
import { useUser } from "../../contexts/UserProvider";
import { Clear } from "@mui/icons-material";
import { Address } from "../../types/Address";

const NewFavouritePlace: FC = () => {
  const navigate = useNavigate();
  const { user, token } = useUser();
  const queryClient = useQueryClient();
  const Api = new FavouritePlacesApi(token);
  const [name, setName] = useState("");
  const [address, setAddress] = useState<Address | null>(null);
  const [addressInput, setAddressInput] = useState("");
  const [addressOptions, setAddressOptions] = useState<Address[]>(sources);

  useEffect(() => {
    if (user.name == null) {
      navigate(URLS.SEARCH_ROUTE);
    }
  }, [user.name, navigate]);

  const searchAddresses = () => {
    console.log("searching");
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
            <form>
              <TextField
                label="nazwa"
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
              <Autocomplete
                getOptionLabel={(option: Address) => option.name}
                options={addressOptions}
                autoComplete={false}
                value={address}
                noOptionsText="Nie znaleziono takiego miejsca"
                onChange={(_e, address: Address | null) => {
                  setAddress(address);
                  searchAddresses();
                }}
                onInputChange={(_e, addressInput) => {
                  setAddressInput(addressInput);
                }}
                renderInput={(params) => <TextField {...params} label="Adres" fullWidth />}
              />
            </form>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default NewFavouritePlace;

const sources = [
  { name: "Wrocław, 2", lat: 51.13, lon: 17.01 },
  { name: "Wrocław, 3", lat: 51.14, lon: 17.01 },
  { name: "Wrocław, 4", lat: 51.15, lon: 17.01 },
  { name: "Wrocław, 5", lat: 51.16, lon: 17.01 },
  { name: "Wrocław, 6", lat: 51.17, lon: 17.01 },
];
