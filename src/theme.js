import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#1e1e1e",
            paper: "#2b2b2b",
        },
        primary: {
            main: "#90caf9",
        },
        secondary: {
            main: "#f48fb1",
        },
    },
});

export default theme;