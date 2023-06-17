import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    green: Palette["primary"];
  }

  interface PaletteOptions {
    green: PaletteOptions["primary"];
  }

  interface Palette {
    blue: Palette["primary"];
  }

  interface PaletteOptions {
    blue: PaletteOptions["primary"];
  }
  interface Palette {
    yellow: Palette["primary"];
  }

  interface PaletteOptions {
    yellow: PaletteOptions["primary"];
  }

  interface Palette {
    red: Palette["primary"];
  }

  interface PaletteOptions {
    red: PaletteOptions["primary"];
  }
}

let theme = createTheme({
  palette: {
    background: {
      default: "#fff",
      paper: "#fff",
    },
    text: {
      primary: "#000",
      secondary: "#fff",
      disabled: "#aaa",
    },
    primary: {
      main: "#172B5F",
    },
    green: {
      main: "#64C05C",
      dark: "#488c42",
    },
    blue: {
      main: "#2A7AB4",
    },
    yellow: {
      main: "#EEC73D",
    },
    red: {
      main: "#870f0b",
    },
  },
});

theme = createTheme(theme, {
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          color: "#aaa", // Default color
          "&.Mui-selected, &:hover,  &:focus,  &:active": {
            color: "white", // Color when active or on hover
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.default,
          borderRadius: 6,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontWeight: "700",
          fontSize: "28px",
        },
        h2: {
          fontWeight: "700",
          fontSize: "25px",
        },
        h3: {
          fontWeight: "700",
          fontSize: "22px",
        },
        h4: {
          fontWeight: "400",
          fontSize: "20px",
        },
        body1: {
          fontWeight: "400",
          fontSize: "18px",
          lineHeight: "28px",
        },
        body2: {
          fontWeight: "400",
          fontSize: "18px",
          color: "#707070",
          lineHeight: "28px",
        },
      },
    },
  },
});

export default theme;
