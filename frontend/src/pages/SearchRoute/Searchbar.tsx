import { useLocation } from "../../contexts";
import { useUser } from "../../contexts/UserProvider";
import { Address } from "../../types/Address";
import { Mode } from "../../types/Mode";
import { SearchParams } from "../../types/SearchParams";
import FavouritePlacesMenu from "./FavouritePlacesMenu";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { Grid, ToggleButton, ToggleButtonGroup, Button, InputAdornment } from "@mui/material";
import { LocalizationProvider, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { FC, FormEvent, useState } from "react";
import AsyncAutoselect from "../../components/AsyncAutoselect";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import { useQuery } from "@tanstack/react-query";
import { GeoLocationApi } from "../../api/GeoLocationApi";
interface SearchbarProps {
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
}
const Searchbar: FC<SearchbarProps> = ({ setSearchParams }) => {
  const [source, setSource] = useState<Address | null>(null);
  const [destination, setDestination] = useState<Address | null>(null);
  const [time, setTime] = useState<Date | null>(new Date());
  const [mode, setMode] = useState<Mode>("fast");
  const { user } = useUser();
  const adapter = new AdapterDayjs();
  const { sourcePosition, destPosition } = useLocation();
  const { setSourcePosition, setDestPosition } = useLocation();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isValidForm()) {
      setSearchParams({
        source: null,
        destination: null,
        time: new Date(),
        mode: "opt",
      });
    }
  };

  useQuery(
    ["get-source-address", sourcePosition],
    async () => {
      if (sourcePosition) {
        const address = await GeoLocationApi.getAddress(sourcePosition);
        return address;
      }
      return null;
    },
    {
      enabled: Boolean(sourcePosition),
      onSuccess: (data: Address) => setSource(data),
    },
  );

  useQuery(
    ["get-destination-address", destPosition],
    async () => {
      if (destPosition) {
        const address = await GeoLocationApi.getAddress(destPosition);
        return address;
      }
      return null;
    },
    {
      enabled: Boolean(destPosition),
      onSuccess: (data: Address) => setDestination(data),
    },
  );

  const isValidForm = () => source && destination && time && time.toString() !== "Invalid Date";

  return (
    <Grid container sx={{ flexGrow: 1, height: "100%" }}>
      <form onSubmit={onSubmit}>
        <Grid container height="100%" flexDirection="column" gap={2}>
          <Grid container spacing={2} px={4}>
            <Grid item xs={12}>
              <AsyncAutoselect
                address={source}
                queryKey="source-address"
                onAddressSearch={(address: Address | null) => {
                  setSource(address);
                  setSourcePosition(address ? [address.latitude, address.longitude] : null);
                }}
                label="Skąd jedziemy"
                startAdornment={
                  <InputAdornment position="start">
                    <TripOriginIcon sx={{ color: "green.main" }} />
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <AsyncAutoselect
                queryKey="destination-address"
                address={destination}
                onAddressSearch={(address: Address | null) => {
                  setDestination(address);
                  setDestPosition(address ? [address.latitude, address.longitude] : null);
                }}
                label="Dokąd jedziemy"
                startAdornment={
                  <InputAdornment position="start">
                    <TripOriginIcon sx={{ color: "blue.main" }} />
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimeField
                  value={adapter.date(time)}
                  onChange={(date) => setTime(date ? new Date(date.toString()) : null)}
                  format="HH:mm"
                  InputProps={{
                    sx: {
                      color: "text.secondary",
                      backgroundColor: "primary.main",
                      border: "1px solid white",
                    },
                  }}
                  inputProps={{
                    style: { textAlign: "center" },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid
              item
              xs={8}
              sx={{
                textAlign: "right",
              }}
            >
              <ToggleButtonGroup
                sx={{ height: "56px", ml: "auto" }}
                value={mode}
                exclusive
                onChange={(_e, mode) => setMode(mode)}
              >
                <ToggleButton
                  value="opt"
                  sx={{
                    color: "text.secondary",
                    textTransform: "none",
                    padding: "0 20px",
                    border: "1px solid white",
                    "&.Mui-selected, &.Mui-selected:hover": {
                      color: "text.primary",
                      backgroundColor: "background.default",
                    },
                  }}
                >
                  optymalnie
                </ToggleButton>
                <ToggleButton
                  value="fast"
                  sx={{
                    color: "text.secondary",
                    border: "1px solid white",
                    textTransform: "none",
                    padding: "0 20px",
                    "&.Mui-selected, &.Mui-selected:hover": {
                      color: "text.primary",
                      backgroundColor: "background.default",
                    },
                  }}
                >
                  szybko
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
          {user.name && <FavouritePlacesMenu />}
          <Grid
            container
            sx={{
              backgroundColor: "background.default",
              flexGrow: 1,
            }}
            justifyContent="center"
            alignItems="center"
          >
            {isValidForm() && (
              <Button
                type="submit"
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <ExpandCircleDownIcon
                  sx={{
                    transform: "rotate(-90deg)",
                    fontSize: 100,
                    color: "green.main",
                    "&:hover": {
                      color: "green.dark",
                    },
                  }}
                />
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default Searchbar;
