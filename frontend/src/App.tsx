import { LocationProvider } from "./contexts";
import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { UserProvider } from "./contexts/UserProvider";

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <LocationProvider>
            <CssBaseline />
            <Box sx={{ height: "100vh", width: "100vw" }}>
              <Outlet />
            </Box>
          </LocationProvider>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
