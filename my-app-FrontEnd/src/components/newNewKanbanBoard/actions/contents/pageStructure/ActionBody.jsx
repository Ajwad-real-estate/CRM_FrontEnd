import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Collapse,
  IconButton,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FollowUpStat from "./FollowUpStat";
import { useEffect, useState } from "react";
import { tokens } from "../../../../../helpers/redux/theme";
import CallGroup from "./CallGroup";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VerifiedIcon from "@mui/icons-material/Verified";
import Dialogue from "./Dialogue";
import Reservation from "./Reservation";
import Classification from "../NextModal";
import { useAddActions } from "../../useAddAction";
import { convertToDateTimeLocalFormat, processDate } from "./dateHELPER";
import toast from "react-hot-toast";
import { useCheckAction } from "../../useActionCheckCompleted";
import { useUpdateActions } from "../../useUpdateActionClient";
import { useQueryClient } from "@tanstack/react-query";
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
function ActionBody({ lead }) {
  //queryClient
  const [activeTab, setActiveTab] = useState(lead.statusID - 1);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const [dateTime, setDateTime] = useState("");
  const [callCase, setCall] = useState(true);
  const [isMoreDetails, setIsMoreDetails] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);
  const [commentField, setComment] = useState("");
  const [selectedCancel, setSelectedCancel] = useState("");
  const [checked, setChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [pendingCheck, setPendingCheck] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [Location, setLocation] = useState("");
  const [unitID, setUnitID] = useState("");
  const [projectID, setProjectID] = useState("");
  const [commentError, setCommentError] = useState(false);
  const queryClient = useQueryClient();

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleToggleExpand = () => {
    setIsMoreDetails(!isMoreDetails);
  };
  const handleCheckboxChange = (event) => {
    if (commentField) {
      setCommentError(false);
      setPendingCheck(event.target.checked);
      setOpenModal(true);
    } else {
      setCommentError(true);
      toast.error("Action Comment Field Required");
    }
  };

  const handleSelectAction = (option) => {
    setSelectedValue(option);
  };

  const handleSelectCancel = (option) => {
    setSelectedCancel(option);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDateChange = (event) => {
    setDateTime(event.target.value);
    setErrorDisplay(false);
  };

  // Fetch data for adding and checking actions
  const { isAdding, addActionContent } = useAddActions(lead.id);
  const { nonCompletedActions, isPending } = useCheckAction(lead.id);

  // UseEffect to populate the form from nonCompletedActions
  useEffect(() => {
    if (nonCompletedActions && nonCompletedActions.length > 0) {
      setDateTime(
        convertToDateTimeLocalFormat(
          nonCompletedActions[0].date,
          nonCompletedActions[0].time
        ) || ""
      );
      setSelectedValue(nonCompletedActions[0].type_id - 1 || 0);
    } else {
      // Reset states if no nonCompletedActions exist
      setDateTime("");
      setSelectedValue(0);
      setChecked(false);
      setComment("");
    }
  }, [nonCompletedActions]);
  //Stage
  const { updateActionContent, isUpdating } = useUpdateActions(lead.id);
  const handleModalResponse = (accept) => {
    const addedActionObj = {
      client_id: lead.id,
      completed: true,
      answered: callCase,
      date: processDate(dateTime).date,
      time: processDate(dateTime).time,
      comment: commentField || "N/A",
      type_id: selectedValue + 1,
      status_id: activeTab + 1,
      location: Location,
      project_id: projectID,
      unit_id: unitID,
    };
    setChecked(accept);
    setOpenModal(false);
    if (accept) {
      updateActionContent({
        actionData: addedActionObj,
        actionId: nonCompletedActions[0].id,
      });

      //error
      setComment("");
      setDateTime("");
      setSelectedValue(0);
      queryClient.setQueryData(["checked", lead.id], null);
      queryClient.invalidateQueries({ queryKey: ["clientsList"] });
    }
  };

  function handleSubmit() {
    if (dateTime) {
      const notCompletedAction = {
        client_id: lead.id,
        completed: checked,
        date: processDate(dateTime).date,
        time: processDate(dateTime).time,
        type_id: selectedValue + 1,
      };

      setErrorDisplay(false);
      if (
        Array.isArray(nonCompletedActions) &&
        nonCompletedActions.length > 0
      ) {
        const actionToUpdate = notCompletedAction;

        // Update action
        console.log(actionToUpdate);
        updateActionContent({
          actionData: actionToUpdate,
          actionId: nonCompletedActions[0].id,
        });
        if (checked) {
          console.log(nonCompletedActions);
          setComment("");
          setDateTime("");
          setSelectedValue(0);
          queryClient.setQueryData(["checked", lead.id], null);
        }

        // Invalidate queries for refetching
        queryClient.invalidateQueries(["checked", lead.id]);
        queryClient.invalidateQueries(["clientActions", lead.id]);
      } else if (!checked) {
        // Add action if no existing nonCompletedActions
        addActionContent(notCompletedAction);
        queryClient.invalidateQueries(["checked", lead.id]);
        queryClient.invalidateQueries(["clientActions", lead.id]);
      }
    } else {
      setErrorDisplay(true);
      toast.error("Date Field is Required");
    }
  }

  function HandleCancel() {}
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
      }}>
      <Box
        sx={{
          gridArea: "input",
          width: "100%",

          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
        <Box>
          <Typography
            variant="body1"
            component="label"
            htmlFor="custom-textfield">
            Next Action
          </Typography>

          <Box sx={{ width: "100%", display: "flex" }}>
            <TextField
              id="outlined-select-currency-native"
              select
              value={selectedValue}
              defaultValue="Follow Up"
              slotProps={{
                select: {
                  native: true,
                },
              }}
              sx={{ flex: 1 }}>
              {actionOptions.map((option, index) => (
                <MenuItem
                  key={index}
                  value={index}
                  onClick={() => handleSelectAction(index)}
                  sx={{
                    padding: "10px 20px", // Custom padding
                    transition: "all 0.3s ease",
                    background: colors.primary[800],

                    "&:hover": {
                      backgroundColor: colors.primary[700],
                    },
                  }}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            {nonCompletedActions && (
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
                htmlFor="custom-textfield">
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
                sx={{ width: "100%" }}>
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
                    }}>
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
                htmlFor="custom-textfield">
                Stage Date
              </Typography>
              <TextField
                type="datetime-local"
                value={dateTime}
                onChange={handleDateChange}
                required
                error={errorDisplay && !dateTime ? true : false}
                helperText={
                  errorDisplay && !dateTime ? "Action Date is Required" : ""
                }
                slotProps={{
                  select: {
                    native: true,
                  },
                }}
                fullWidth
                InputLabelProps={{
                  shrink: true,
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
        }}>
        <CallGroup callCase={callCase} setCall={setCall} />
        {selectedValue !== "Cancel" &&
          selectedValue !== "Cancel after Meeting" && (
            <FollowUpStat
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
          )}
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
            }}>
            <Box
              sx={{
                width: "100%",
              }}>
              <Typography
                variant="body1"
                component="label"
                htmlFor="custom-textfield">
                Comment
              </Typography>

              <TextField
                id="outlined-multiline-static"
                multiline
                rows={5}
                variant="outlined"
                value={commentField}
                helperText={
                  commentError && !commentField
                    ? "Action Comment is Required"
                    : ""
                }
                error={commentError && !commentField ? true : false}
                onChange={(e) => {
                  setComment(e.target.value);
                  setCommentError(false);
                }}
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
            <Box>
              <Box display="flex" alignItems="center" mt={2}>
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                  {isMoreDetails ? "Show Less" : "More Field Details"}
                </Typography>
                <IconButton onClick={handleToggleExpand}>
                  {isMoreDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
              <Collapse in={isMoreDetails}>
                <Box mt={2}>
                  <TextField
                    label="Location"
                    value={Location}
                    onChange={(e) => setLocation(e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Project ID"
                    value={projectID}
                    onChange={(e) => setProjectID(e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Unit ID"
                    value={unitID}
                    onChange={(e) => setUnitID(e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth
                    margin="normal"
                  />
                </Box>
              </Collapse>
            </Box>
          </Box>
        </>
      )}
      <Box
        sx={{
          gridArea: "buttons",

          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "60%",
          }}>
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
            onClick={handleSubmit}>
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
            onClick={HandleCancel}>
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
