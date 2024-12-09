import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FollowUpStat from "./FollowUpStat";
import { useState } from "react";
import { tokens } from "../../../../../theme";
import CallGroup from "./CallGroup";

const actionOptions = [
  "Folloe Up",
  "Meeting",
  "Follow Up after Meeting",
  "Cancel",
  "Cencel after Meeting",
];
function ActionBody() {
  //

  //
  const [dateTime, setDateTime] = useState("");

  // Next Action
  const [searchValue, setSearchValue] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSelectAction = (action) => {
    setSelectedAction(action);
    setSearchValue(action);
  };
  //
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleDateChange = (event) => {
    setDateTime(event.target.value);
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        height: "70%",
        gridTemplateAreas: `
          "input options"
          "comment comment"
          "buttons buttons"
          "commentInfo commentInfo"
        `,
        gridTemplateColumns: "1fr 1.15fr",
        gridTemplateRows: "150px 150px 100px 140px",
        gap: "11px",
      }}
    >
      <Box
        sx={{
          gridArea: "input",
          width: "100%",

          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="body1"
            component="label"
            htmlFor="custom-textfield"
          >
            Next Action
          </Typography>
          <TextField
            id="outlined-select-currency-native"
            select
            defaultValue="Follow Up"
            value={searchValue}
            onChange={handleSearchChange}
            slotProps={{
              select: {
                native: true,
              },
            }}
            sx={{ width: "100%" }}
          >
            {actionOptions.map((option, index) => (
              <MenuItem
                key={index}
                value={option}
                onClick={() => handleSelectAction(option)}
                sx={{
                  padding: "10px 20px", // Custom padding
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#e5e5e5a6",
                  },
                }}
              >
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box>
          <Typography
            variant="body1"
            component="label"
            htmlFor="custom-textfield"
          >
            Stage Date
          </Typography>
          <TextField
            type="datetime-local"
            value={dateTime}
            onChange={handleDateChange}
            fullWidth
            InputLabelProps={{
              shrink: true, // Ensures the label shrinks when using datetime-local
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          gridArea: "options",
          display: "flex",
          width: "100%",
          alignItems: "center",
          height: "100%",
          flexDirection: "column",
          paddingTop: "24px",
        }}
      >
        <CallGroup />

        <FollowUpStat />
      </Box>
      <Box
        sx={{
          gridArea: "comment",
          width: "100%",
        }}
      >
        <Typography
          variant="body1"
          component="label"
          htmlFor="custom-textfield"
        >
          Comment
        </Typography>

        <TextField
          id="outlined-multiline-static"
          multiline
          rows={5}
          variant="outlined"
          sx={{
            width: "100%",
            height: "80%",
            bgcolor: colors.grey[600],
            borderRadius: "5px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", // Removes the border
            },
          }}
        />
      </Box>
      <Box
        sx={{
          gridArea: "buttons",

          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "60%",
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: colors.blueAccent[500],
              width: "45%",
              marginInline: "auto",
              "&:hover": {
                bgcolor: colors.blueAccent[600],
              },
            }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: colors.redAccent[400],
              color: colors.redAccent[400],
              fontWeight: "600",
              width: "45%",
              marginInline: "auto",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: colors.redAccent[400],
                borderWidth: "2px",
                borderStyle: "solid",
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
      <Box sx={{ gridArea: "commentInfo", backgroundColor: "orange" }}>opt</Box>
    </Box>
  );
}

export default ActionBody;
