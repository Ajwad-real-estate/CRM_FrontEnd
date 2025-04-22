import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../../../../theme";

export default function DoneModal({ open, onClose }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          width: "300px",
          position: "absolute",
          top: "30px", // 30px from the top
          left: "50%",
          transform: "translateX(-50%)", // Center horizontally
          margin: 0,
          boxShadow: "3px 5px 11px #36363668",
          background: colors.primary[400],
        },
      }}
    >
      <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
        <HelpOutlineIcon sx={{ fontSize: "5rem" }} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontWeight: "500",
              fontSize: "1.15rem",
              marginBottom: "15px",
            }}
          >
            Done Meeting
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            Are you sure you want to confirm that the meeting is done?
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Button
          variant="Contained"
          sx={{
            fontSize: "1rem",
            fontWeight: "600",
            background: "#1aff00",
            textTransform: "none", // Remove capitalization
            boxShadow: "2px 5px 9px #00450251",

            "&:hover": {
              background: "#1aff00", // Keep hover background consistent
            },
            "&:active": {
              transform: "scale(0.94)", // Apply scale on active
            },
          }}
          onClick={onClose}
        >
          Yes
        </Button>
        <Button
          variant="Contained"
          sx={{
            fontSize: "1rem",
            fontWeight: "600",
            boxShadow: "2px 5px 9px #43000051",
            background: "#ff0000",
            textTransform: "none", // Remove capitalization
            "&:hover": {
              background: "#ff0000", // Keep hover background consistent
            },
            "&:active": {
              transform: "scale(0.94)", // Apply scale on active
            },
          }}
          onClick={onClose}
          autoFocus
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
