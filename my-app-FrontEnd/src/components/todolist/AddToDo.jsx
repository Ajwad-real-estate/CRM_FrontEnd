import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Slider,
  Tooltip,
  MenuItem,
} from "@mui/material";
import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import add from "./../../assets/add.mp3";
import { useAddTasks } from "./useTasks";
import toast from "react-hot-toast";

function convertDate(dateString) {
  // Parse the date string
  const date = new Date(dateString);

  // Convert to ISO format (UTC)
  return date.toISOString();
}

function convertTime(timeString) {
  // Split the input time string into hours and minutes
  const [hours, minutes] = timeString.split(":").map(Number);

  // Create a new date object for today
  const now = new Date();
  now.setHours(hours, minutes, 0, 0); // Set time with hours and minutes

  // Convert to desired format with seconds and microseconds
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const milliseconds = now.getMilliseconds().toString().padStart(6, "0"); // Pad to 6 digits
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
const AddToDo = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [ErrorField, setErrorField] = useState(false);
  const [taskDetails, setTaskDetails] = useState("");
  const [addsound, setAddSound] = useState(false);
  const [priority, setPriority] = useState(2);
  const options = [{ value: "pending", label: "pending" }];
  const { addTaskTod, isCreating } = useAddTasks();
  const [status, setStatus] = useState("pending");

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setPriority(newValue);
  };
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const handleAdd = () => {
    if (title.trim() && date && time) {
      setErrorField(false);
      console.log("Date: " + date);
      console.log("Time: " + time);
      addTaskTod({
        title,
        detail: taskDetails,
        priority_level: priority,
        status,
        date: convertDate(date),
        time: convertTime(time),
      });
      setAddSound(true);
      setTitle("");

      setTaskDetails("");
      setPriority(2);
    } else {
      setErrorField(true);
      toast.error("Task Cannot be added");
    }
  };

  useEffect(
    function () {
      const playSound = function () {
        if (addsound) {
          const sound = new Audio(add);
          sound.play();
        }
        setAddSound(false);
      };
      playSound();
    },
    [addsound, setAddSound]
  );
  return (
    <Box sx={{}}>
      <Button
        onClick={handleBack}
        sx={{
          position: "relative",
          top: "0px",
          left: "-5px",
          color: "#fff",
          zIndex: "100",
        }}
      >
        <ArrowBackIcon />
      </Button>
      <Box display="flex" alignItems="center" justifyContent="center" mb="20px">
        <Form>
          <FormRow label="Title">
            <TextField
              value={title}
              helperText={ErrorField && !title ? "task title required" : ""}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrorField(false);
              }}
              placeholder="Enter new task"
              variant="outlined"
              size="small"
              sx={{ width: "60%", marginRight: "10px" }}
              error={ErrorField && !title ? true : false}
            />
          </FormRow>
          <FormRow label={"Task Date"}>
            <TextField
              helperText={ErrorField && !date ? "task date required" : ""}
              id="outlined-basic"
              variant="outlined"
              type="date"
              placeholder={"YYYY-MM-DD"}
              sx={{ width: "60%", marginRight: "10px" }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              error={ErrorField && !date ? true : false}
            />
          </FormRow>
          <FormRow label={"TaskTime"}>
            <TextField
              helperText={ErrorField && !time ? "task time required" : ""}
              id="outlined-basic"
              variant="outlined"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder={"00:00 AM/PM"}
              sx={{ width: "60%", marginRight: "10px" }}
              error={ErrorField && !time ? true : false}
            />
          </FormRow>
          <FormRow label={"Status"}>
            <TextField
              select // Indicates this is a dropdown select
              value={status}
              onChange={handleChangeStatus}
              fullWidth
              variant="outlined"
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormRow>
          <FormRow label={"Priority Level"}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Slider
                value={priority}
                onChange={handleChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => {
                  if (value === 1) return "1";
                  if (value === 2) return "2";
                  if (value === 3) return "3";
                }}
                step={1}
                marks={[
                  { value: 1, label: "1" },
                  { value: 2, label: "2" },
                  { value: 3, label: "3" },
                ]}
                min={1}
                max={3}
                sx={{
                  height: 5,
                  width: "60%",
                  "& .MuiSlider-thumb": {
                    width: 15,
                    height: 15,
                    backgroundColor:
                      priority === 1
                        ? "grey"
                        : priority === 2
                          ? "#1976d2"
                          : "red",
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor: "#e0e0e0",
                  },
                  "& .MuiSlider-track": {
                    backgroundColor:
                      priority === 1
                        ? "grey"
                        : priority === 2
                          ? "#1976d2"
                          : "red",
                  },
                }}
              />
              <Tooltip
                title={`${priority === 1 ? "1" : priority === 2 ? "2" : "3"}`}
                arrow
                placement="top"
                PopperProps={{
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, 8],
                      },
                    },
                  ],
                }}
                componentsProps={{
                  tooltip: {
                    sx: {
                      fontSize: "1.2rem", // Make the font larger
                      padding: "8px 16px", // Add padding around the content
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    background: `${
                      priority === 1
                        ? "grey"
                        : priority === 2
                          ? "#1976d2"
                          : "red"
                    }`,
                    cursor: "pointer",
                    height: "14px",
                    width: "14px",
                    borderRadius: "50%",
                  }}
                ></Box>
              </Tooltip>
            </Box>
          </FormRow>
          <FormRow label="Task Details">
            <TextField
              placeholder="Enter Details....."
              multiline
              rows={4}
              value={taskDetails}
              onChange={(e) => setTaskDetails(e.target.value)}
              sx={{
                width: "400px",
              }}
            />
          </FormRow>

          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add
          </Button>
        </Form>
      </Box>
    </Box>
  );
};

export default AddToDo;
