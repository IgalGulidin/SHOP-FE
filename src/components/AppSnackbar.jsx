import { Alert, Snackbar } from "@mui/material";

export default function AppSnackbar({
  open,
  message,
  severity = "info",
  onClose,
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
