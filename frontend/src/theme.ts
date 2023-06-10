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
}

let theme = createTheme({
  palette: {
    background: {
      default: "#ecf0f1",
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
    },
    blue: {
      main: "#2A7AB4",
    },
    yellow: {
      main: "#EEC73D",
    },
    action: {
      hover: "rgb(0, 0, 0 , 0.06)",
      focus: "rgb(0, 0, 0, 0.06)",
      selectedOpacity: 0.12,
    },
  },
});

theme = createTheme(theme, {
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.paper,
          borderRadius: 4,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontWeight: "700",
          fontSize: "64px",
        },
        h2: {
          fontWeight: "700",
          fontSize: "36px",
        },
        h3: {
          fontWeight: "700",
          fontSize: "24px",
        },
        h4: {
          fontWeight: "400",
          fontSize: "18px",
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
