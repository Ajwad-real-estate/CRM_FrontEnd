import {
  Box,
  Button,
  Checkbox,
  InputAdornment,
  MenuItem,
  Popper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FollowUpStat from "./FollowUpStat";
import { useState } from "react";
import { tokens } from "../../../../../theme";
import CallGroup from "./CallGroup";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VerifiedIcon from "@mui/icons-material/Verified";
import Dialogue from "./Dialogue";
import Reservation from "./Reservation";
const actionOptions = [
  "Follow Up",
  "Meeting",
  "Follow Up after Meeting",
  "Cancel",
  "Cancel after Meeting",
  "Done Deal",
  "Archieve",
  "Reservation",
];
const cancelOptions = [
  "Location",
  "Budget",
  "Life Drops",
  "Not a deal",
  "another Area",
  "Other Reason",
  "المدام قالت لأ",
];
function ActionBody() {
  //

  //
  const [dateTime, setDateTime] = useState("");

  // Next Action
  // const [searchValue, setSearchValue] = useState("");
  //const [selectedAction, setSelectedAction] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("Follow Up");
  const [selectedCancel, setSelectedCancel] = useState("");
  const [openModal, setOpenModal] = useState(false);
  //Modal Options

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCheckboxChange = (event) => {
    setOpenModal(event.target.checked);
  };
  //
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSelectAction = (option) => {
    setSelectedValue(option);
    setSearchValue(option); // Optionally update search value to selected value
  };
  const handleSelectCancel = (option) => {
    setSelectedCancel(option);
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
        height: "100%",
        gridTemplateAreas: `
          "input options"
          "comment comment"
          "buttons buttons" 
          
        `,
        gridTemplateColumns: "1fr 1.15fr",
        gridTemplateRows: "150px auto auto ",
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

          <Box sx={{ width: "100%", display: "flex" }}>
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
              sx={{ flex: 1 }}
            >
              {actionOptions.map((option, index) => (
                <MenuItem
                  key={index}
                  value={option}
                  onClick={() => handleSelectAction(option)}
                  sx={{
                    padding: "10px 20px", // Custom padding
                    transition: "all 0.3s ease",
                    background: colors.primary[800],

                    "&:hover": {
                      backgroundColor: colors.primary[700],
                    },
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </TextField>
            {selectedValue === "Meeting" && (
              <Checkbox
                icon={<CheckCircleOutlineIcon />}
                checkedIcon={<VerifiedIcon />}
                checked={openModal} // Bind checkbox state
                onChange={handleCheckboxChange}
                sx={{
                  color: colors.greenAccent[700], // Unchecked state color
                  "&.Mui-checked": {
                    color: colors.greenAccent[600], // Checked state color
                  },
                }}
              />
            )}
          </Box>
        </Box>
        <Box>
          {selectedValue === "Cancel after Meeting" ||
          selectedValue === "Cancel" ? (
            <>
              <Typography
                variant="body1"
                component="label"
                htmlFor="custom-textfield"
              >
                Cancel Reason
              </Typography>
              <TextField
                id="outlined-select-currency-native"
                select
                slotProps={{
                  select: {
                    native: true,
                  },
                }}
                sx={{ width: "100%" }}
              >
                {cancelOptions.map((option, index) => (
                  <MenuItem
                    key={index}
                    value={option}
                    onClick={() => handleSelectCancel(option)}
                    sx={{
                      padding: "10px 20px", // Custom padding
                      transition: "all 0.3s ease",
                      background: colors.primary[800],
                      "&:hover": {
                        backgroundColor: "#e5e5e5a6",
                      },
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </>
          ) : (
            <>
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
                slotProps={{
                  select: {
                    native: true,
                  },
                }}
                fullWidth
                InputLabelProps={{
                  shrink: true, // Ensures the label shrinks when using datetime-local
                }}
              />
            </>
          )}
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
        {selectedValue !== "Cancel" &&
          selectedValue !== "Cancel after Meeting" && <FollowUpStat />}
      </Box>
      {selectedValue === "Reservation" ? (
        <Reservation />
      ) : (
        <>
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
                bgcolor: colors.primary[800],
                borderRadius: "5px",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none", // Removes the border
                },
              }}
            />
          </Box>
        </>
      )}
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
      </Box>{" "}
      {/* <Box sx={{ gridArea: "commentInfo", backgroundColor: "orange" }}>opt</Box> */}
      <Dialogue open={openModal} onClose={handleCloseModal} />
    </Box>
  );
}

export default ActionBody;
