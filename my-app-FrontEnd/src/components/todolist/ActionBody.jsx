import {
  Box,
  Button,
  Checkbox,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VerifiedIcon from "@mui/icons-material/Verified";
import { tokens } from "../../theme";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const createAction = async (actionData) => {
  try {
    const response = await fetch(`${apiUrl}/api/actions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent_id: actionData.agentId,
        client_id: actionData.clientId,
        unit_id: actionData.unitId,
        project_id: actionData.projectId,
        completed: false,
        answered: false,
        date: actionData.date,
        time: new Date().toLocaleTimeString(),
        location: actionData.location,
        comment: actionData.comment,
        type_id: getTypeId(actionData.selectedValue),
        status_id: actionData.statusId,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating action:", error);
    throw error;
  }
};
export const updateAction = async (id, actionData) => {
  try {
    const response = await fetch(`${API_URL}/actions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...actionData,
        completed: true,
        answered: actionData.answered,
        updated_at: new Date().toISOString(),
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating action:", error);
    throw error;
  }
};

// Helper function to convert action type to type_id
const getTypeId = (actionType) => {
  const typeMap = {
    "Follow Up": 1,
    Meeting: 2,
    "Follow Up after Meeting": 3,
    Cancel: 4,
    "Cancel after Meeting": 5,
    "Done Deal": 6,
    Archieve: 7,
    Reservation: 8,
  };
  return typeMap[actionType] || 1;
};

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
function ActionBody({ agentId, clientId, unitId, projectId }) {
  //

  //
  const [dateTime, setDateTime] = useState("");

  // Next Action
  // const [searchValue, setSearchValue] = useState("");
  //const [selectedAction, setSelectedAction] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("Follow Up");
  const [selectedCancel, setSelectedCancel] = useState("");
  const [checked, setChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [pendingCheck, setPendingCheck] = useState(false);
  const [clientResponse, setClientResponse] = useState(false);
  const [clientStatus, setClientStatus] = useState("");
  const [comment, setComment] = useState("");
  const [answered, setAnswered] = useState(false);
  const [statusId, setStatusId] = useState(1);
  //Modal Options

  const handleSave = async () => {
    try {
      const actionData = {
        agentId,
        clientId,
        unitId,
        projectId,
        selectedValue,
        date: dateTime,
        comment,
        answered,
        statusId,
        location: selectedValue === "Meeting" ? "Meeting Location" : null,
      };

      await createAction(actionData);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  const handleComplete = async (id) => {
    try {
      // const actionData = {
      //   selectedValue,
      //   selectedCancel,
      //   dateTime,
      //   comment,
      //   clientResponse,
      //   clientStatus,

      // };
      await updateAction(id, {
        answered,
        comment,
        statusId,
      });
      // await updateAction(id, actionData);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  //

  const handleCheckboxChange = (event) => {
    // Prevent immediate change and open the modal
    setPendingCheck(event.target.checked);
    setOpenModal(true);
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
                checked={checked} // Bind checkbox state
                onChange={handleCheckboxChange}
                sx={{
                  color: colors.greenAccent[700],
                  "&.Mui-checked": {
                    color: colors.greenAccent[600],
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
        {/* <CallGroup /> */}
        {selectedValue !== "Cancel" &&
          selectedValue !== "Cancel after Meeting" && (
            // <FollowUpStat />
            <div></div>
          )}
      </Box>
      {selectedValue === "Reservation" ? (
        // <Reservation />
        <div></div>
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
            onClick={handleSave}
          >
            Save
          </Button>
          <Button onClick={() => handleComplete(actionId)}>Complete</Button>

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
      {/* <Dialogue
    open={openModal}
    onClose={handleCloseModal}
    setAcceptance={handleModalResponse}
   /> */}
    </Box>
  );
}

export default ActionBody;
