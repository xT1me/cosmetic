import React from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(249, 168, 37)",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f7f7f7",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#555555",
    },
    icon: {
      light: "#fff",
    },
    success: {
      main: "#4caf50",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
  },
  typography: {
    fontFamily: "GucciSans, Helvetica, Arial, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
    },
  },
});

const ThemeProvider = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
