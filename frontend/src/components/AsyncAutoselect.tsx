/* eslint-disable @typescript-eslint/no-explicit-any */
import { GeoLocationApi } from "../api/GeoLocationApi";
import { Address } from "../types/Address";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";

interface AsyncAutoselectProps {
  address: Address | null;
  onAddressSearch: (address: Address | null) => void;
  queryKey: string;
  label: string;
  startAdornment?: ReactNode;
}

const AsyncAutoselect: FC<AsyncAutoselectProps> = ({
  address,
  onAddressSearch,
  queryKey,
  label,
  startAdornment,
}) => {
  const [addressInput, setAddressInput] = useState("");
  const [addressOptions, setAddressOptions] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);

  const query = useQuery(
    [queryKey, { addressInput }],
    () => GeoLocationApi.searchAddress(`wrocław, ${addressInput}`),
    {
      enabled: false,
      onSuccess: (data) => {
        setLoading(false);
        setAddressOptions(data);
      },
    },
  );

  const searchAddresses = useMemo(
    () =>
      debounce(() => {
        setLoading(true);
        query.refetch();
      }, 500),
    [query],
  );

  useEffect(() => {
    return () => {
      searchAddresses.cancel();
    };
  }, []);

  return (
    <Autocomplete
      filterOptions={(x) => x}
      filterSelectedOptions
      options={addressOptions}
      autoComplete={false}
      value={address}
      loading={loading}
      isOptionEqualToValue={() => true}
      noOptionsText={addressInput ? "Nie znaleziono takiego miejsca" : ""}
      onChange={(_e, address: Address | null) => {
        onAddressSearch(address);
      }}
      onInputChange={(_e, addressInput) => {
        const address = addressInput.trim();
        setAddressInput(address);
        if (address.length >= 5) {
          searchAddresses();
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: startAdornment ? startAdornment : <></>,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          InputLabelProps={{
            sx: {
              backgroundColor: "background.paper",
              px: 1,
              color: "text.primary",
              borderRadius: 2,
            },
          }}
        />
      )}
      getOptionLabel={(option) => option.name}
    />
  );
};

export default AsyncAutoselect;
