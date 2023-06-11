import { Mode } from "../../types/Mode";
import { SearchParams } from "../../types/SearchParams";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Grid, TextField, IconButton, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { LocalizationProvider, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { ChangeEvent, FC, FormEvent, useState } from "react";

interface SearchbarProps {
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
}
const Searchbar: FC<SearchbarProps> = ({ setSearchParams }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [time, setTime] = useState(null);
  const [mode, setMode] = useState<Mode>("fast");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchParams({
      source: null,
      destination: null,
      time: new Date(),
      mode: "opt",
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2} px={4}>
        <Grid item xs={12}>
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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Dokąd jedziemy"
            fullWidth
            variant="outlined"
            value={destination}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDestination(e.target.value)}
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
          />
        </Grid>
        <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeField
              value={time}
              onChange={setTime}
              format="HH:mm"
              InputProps={{
                sx: {
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
                color: "text.primary",
                textTransform: "none",
                padding: "0 20px",
                border: "1px solid white",
                "&.Mui-selected, &.Mui-selected:hover": {
                  color: "text.secondary",
                  backgroundColor: "background.default",
                },
              }}
            >
              optymalnie
            </ToggleButton>
            <ToggleButton
              value="fast"
              sx={{
                color: "text.primary",
                border: "1px solid white",
                textTransform: "none",
                padding: "0 20px",
                "&.Mui-selected, &.Mui-selected:hover": {
                  color: "text.secondary",
                  backgroundColor: "background.default",
                },
              }}
            >
              szybko
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </form>
  );
};

export default Searchbar;
