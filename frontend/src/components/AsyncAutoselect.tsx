/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useMemo, useState } from "react";
import { Address } from "../types/Address";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { GeoLocationApi } from "../api/GeoLocationApi";

interface AsyncAutoselectProps {
  onAddressSearch: (address: Address | null) => void;
  queryKey: string;
  label: string;
}

const AsyncAutoselect: FC<AsyncAutoselectProps> = ({ onAddressSearch, queryKey, label }) => {
  const [address, setAddress] = useState<Address | null>(null);
  const [addressInput, setAddressInput] = useState("");
  const [addressOptions, setAddressOptions] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);

  const query = useQuery(
    [queryKey, { addressInput }],
    () => GeoLocationApi.searchAddress(addressInput),
    {
      enabled: false,
      onSuccess: (data) => {
        setLoading(false);
        console.log(data);
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
      noOptionsText="Nie znaleziono takiego miejsca"
      onChange={(_e, address: Address | null) => {
        setAddress(address);
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
