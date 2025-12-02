import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";

export default function SlideAlert({ open, onClose, message, type = "success", alertId }) {
  return (
    <Snackbar
      key={alertId}
      open={open}
      autoHideDuration={2500}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={(props) => <Slide {...props} direction="down" />}
    >
      <Alert onClose={onClose} severity={type} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}
