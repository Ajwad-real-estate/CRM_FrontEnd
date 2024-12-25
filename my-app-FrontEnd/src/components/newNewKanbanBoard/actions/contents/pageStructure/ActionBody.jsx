//  },
//  body: JSON.stringify({
//   agent_id: actionData.agentId,
//   client_id: actionData.clientId,
//   unit_id: actionData.unitId,
//   project_id: actionData.projectId,
//   completed: false,
//   answered: false,
//   date: actionData.date,
//   time: new Date().toLocaleTimeString(),
//   location: actionData.location,
//   comment: actionData.comment,
//   type_id: getTypeId(actionData.selectedValue),
//   status_id: actionData.statusId
//  })
// });
//  const handleSave = async () => {
//   try {
//    const actionData = {
//     agentId,
//     clientId,
//     unitId,
//     projectId,
//     selectedValue,
//     date: dateTime,
//     comment,
//     answered,
//     statusId,
//     location: selectedValue === 'Meeting' ? 'Meeting Location' : null
//    };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const result = await AddAction({
//       completed: checked,
//       answered: false,
//       date: processDate(dateTime).date,
//       time: processDate(dateTime).time,
//       comment: commentField,
//       type_id: selectedValue,
//       status_id: activeTab,
//     });
//   } catch (err) {
//     console.error("Error adding action:", err);
//   }
// };
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Popper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FollowUpStat from "./FollowUpStat";
import { useEffect, useState } from "react";
import { tokens } from "../../../../../theme";
import CallGroup from "./CallGroup";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VerifiedIcon from "@mui/icons-material/Verified";
import Dialogue from "./Dialogue";
import Reservation from "./Reservation";
import Classification from "../NextModal";
import { useAddActions } from "../../useAddAction";
import { processDate } from "./dateHELPER";
const actionOptions = ["Follow Up", "Meeting", "Follow Up after Meeting"];
const cancelOptions = [
  "Location",
  "Budget",
  "Life Drops",
  "Not a deal",
  "another Area",
  "Other Reason",
  "المدام قالت لأ",
];
function ActionBody({ lead, data }) {
  //

  //
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const [dateTime, setDateTime] = useState("");
  const [callCase, setCall] = useState(true);

  // Next Action
  // const [searchValue, setSearchValue] = useState("");
  //const [selectedAction, setSelectedAction] = useState("");
  const [selectedValue, setSelectedValue] = useState(1);
  const [commentField, setComment] = useState("");
  const [selectedCancel, setSelectedCancel] = useState("");
  const [checked, setChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [pendingCheck, setPendingCheck] = useState(false);
  //Modal Options
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCheckboxChange = (event) => {
    // Prevent immediate change and open the modal
    setPendingCheck(event.target.checked);
    setOpenModal(true);
  };

  const handleModalResponse = (accept) => {
    setChecked(accept); // Update checkbox state based on modal response
    setOpenModal(false); // Close the modal
  };
  //

  const handleSelectAction = (option) => {
    setSelectedValue(option);
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const result = await AddAction({
  //       completed: checked,
  //       answered: false,
  //       date: processDate(dateTime).date,
  //       time: processDate(dateTime).time,
  //       comment: commentField,
  //       type_id: selectedValue,
  //       status_id: activeTab,
  //     });
  //   } catch (err) {
  //     console.error("Error adding action:", err);
  //   }
  // };
  const { isAdding, addActionContent } = useAddActions();
  function handleSubmit() {
    console.log(data);
    const addedActionObj = {
      client_id: lead.id,
      unit_id: null,
      agent_id: data.agent_id,
      project_id: null,
      completed: checked,
      answered: callCase,
      date: processDate(dateTime).date,
      time: processDate(dateTime).time,
      location: null,
      comment: commentField,
      type_id: selectedValue,
      status_id: activeTab + 1,
    };
    console.log(addedActionObj);
    console.log(activeTab);
    addActionContent(addedActionObj);
  }
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        height: "100%",
        gridTemplateAreas: `
          "input options"
          "clas clas"
          "comment comment"
          "buttons buttons" 
          
        `,
        gridTemplateColumns: "1fr 1.15fr",
        gridTemplateRows: "150px auto auto auto",
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
                  value={index + 1}
                  onClick={() => handleSelectAction(index + 1)}
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
        <CallGroup callCase={callCase} setCall={setCall} />
        {selectedValue !== "Cancel" &&
          selectedValue !== "Cancel after Meeting" && <FollowUpStat />}
      </Box>
      <Classification
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleTabChange={handleTabChange}
      />
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
              value={commentField}
              onChange={(e) => setComment(e.target.value)}
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
              fontSize: "1.1rem",
            }}
            disabled={isAdding}
            onClick={handleSubmit}
          >
            {isAdding ? (
              <>
                Adding
                <CircularProgress
                  size={20}
                  sx={{ color: "white", marginRight: "8px" }}
                />
              </>
            ) : (
              "Save"
            )}
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
              fontSize: "1.1rem",
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
      <Dialogue
        open={openModal}
        onClose={handleCloseModal}
        setAcceptance={handleModalResponse}
      />
    </Box>
  );
}

export default ActionBody;
