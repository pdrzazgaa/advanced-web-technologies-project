import { GeoLocationApi } from "../../api/GeoLocationApi";
import { useLocation } from "../../contexts";
import { useUser } from "../../contexts/UserProvider";
import { Address } from "../../types/Address";
import { Mode } from "../../types/Mode";
import { SearchParams } from "../../types/SearchParams";
import FavouritePlacesMenu from "./FavouritePlacesMenu";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Grid,
  TextField,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Typography,
  Autocomplete,
} from "@mui/material";
import { debounce } from "@mui/material/utils";
import { LocalizationProvider, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { ChangeEvent, FC, FormEvent, useState } from "react";

const sources = [
  { name: "Wrocław, 2", lat: 51.13, lon: 17.01 },
  { name: "Wrocław, 3", lat: 51.14, lon: 17.01 },
  { name: "Wrocław, 4", lat: 51.15, lon: 17.01 },
  { name: "Wrocław, 5", lat: 51.16, lon: 17.01 },
  { name: "Wrocław, 6", lat: 51.17, lon: 17.01 },
];

interface SearchbarProps {
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
}
const Searchbar: FC<SearchbarProps> = ({ setSearchParams }) => {
  const [source, setSource] = useState<Address | null>(sources[1]);
  const [sourceInput, setSourceInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  const [destination, setDestination] = useState<Address | null>(null);
  const [time, setTime] = useState<Date | null>(new Date());
  const [mode, setMode] = useState<Mode>("fast");
  const [options, setOption] = useState<Address[]>(sources);
  const { user } = useUser();
  const adapter = new AdapterDayjs();

  const { position } = useLocation();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchParams({
      source: null,
      destination: null,
      time: new Date(),
      mode: "opt",
    });

    GeoLocationApi.getCoordinates("Traugutta 132, Wrocław, Poland");
    GeoLocationApi.getAddress([51.098094, 17.056168]);
  };
  const searchAdressess = (address: string) => {
    setSourceInput(address);
  };

  const isValidForm = () => source && destination && time && time.toString() !== "Invalid Date";

  const sourcesNames = () => sources.map((source) => source.name);

  return (
    <Grid container sx={{ flexGrow: 1, height: "100%" }}>
      <form onSubmit={onSubmit}>
        <Grid container height="100%" flexDirection="column" gap={2}>
          <Grid container spacing={2} px={4}>
            <Grid item xs={12}>
              <Autocomplete
                value={source}
                onChange={(_e, _address) => setSource(sources[0])}
                onInputChange={(_e, address: string) => searchAdressess(address)}
                inputValue={sourceInput}
                noOptionsText="No locations"
                options={options}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Skąd jedziemy"
                    fullWidth
                    variant="outlined"
                    autoComplete="off"
                    InputProps={{
                      style: { color: "text.secondary" },
                      // endAdornment: (
                      //   <IconButton onClick={() => setSource(sources[0])}>
                      //     <LocationOnIcon sx={{ fontSize: "30px", color: "green.main" }} />
                      //   </IconButton>
                      // ),
                    }}
                    InputLabelProps={{
                      sx: {
                        backgroundColor: "background.default",
                        padding: "1px 5px",
                        borderRadius: 1,
                        color: "text.primary",
                      },
                    }}
                  />
                )}
              />
              {/* 
              <TextField
                label="Skąd jedziemy"
                fullWidth
                variant="outlined"
                value={source}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSource(e.target.value)}
                autoComplete="off"
                InputProps={{
                  sx: { color: "text.secondary" },
                  endAdornment: (
                    <IconButton onClick={() => setSource("")}>
                      <LocationOnIcon sx={{ fontSize: "30px", color: "green.main" }} />
                    </IconButton>
                  ),
                }}
                InputLabelProps={{
                  sx: {
                    backgroundColor: "background.default",
                    padding: "1px 5px",
                    borderRadius: 1,
                  },
                }}
              /> */}
            </Grid>
            <Grid item xs={12}>
              {/* <TextField
                label="Dokąd jedziemy"
                fullWidth
                variant="outlined"
                value={destination}
                // onChange={(e: ChangeEvent<HTMLInputElement>) => setDestination(e.target.value)}
                autoComplete="off"
                InputProps={{
                  sx: { color: "text.secondary" },
                }}
                InputLabelProps={{
                  sx: {
                    backgroundColor: "background.default",
                    padding: "1px 5px",
                    borderRadius: 1,
                  },
                }}
              /> */}
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
                      backgroundColor: "background.paper",
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
            <Typography>.</Typography>
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
