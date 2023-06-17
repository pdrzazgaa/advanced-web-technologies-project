import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { IconButton, Stack, TextField } from "@mui/material";
import TopBar from "../../components/TopBar";
import { URLS } from "../../constants/urls";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FavouritePlacesApi } from "../../api/FavouritePlacesApi";
import { useUser } from "../../contexts/UserProvider";
import { Clear } from "@mui/icons-material";

const NewFavouritePlace: FC = () => {
  const navigate = useNavigate();
  const { user, token } = useUser();
  const queryClient = useQueryClient();
  const Api = new FavouritePlacesApi(token);
  const [name, setName] = useState("");

  useEffect(() => {
    if (user.name == null) {
      navigate(URLS.SEARCH_ROUTE);
    }
  }, [user.name, navigate]);

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
            </form>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default NewFavouritePlace;
