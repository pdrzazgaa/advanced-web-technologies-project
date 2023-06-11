import React, { FC, FormEvent } from "react";
import { Typography } from "@mui/material";
import { SearchParams } from "../../types/SearchParams";

interface SearchbarProps {
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
}
const Searchbar: FC<SearchbarProps> = ({ setSearchParams }) => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchParams({
      departure: null,
      arrival: null,
      time: new Date(),
      mode: "opt",
    });
  };
  return <form onSubmit={onSubmit}>
    
  </form>;
};

export default Searchbar;
