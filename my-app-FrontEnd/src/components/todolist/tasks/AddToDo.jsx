// import { useEffect, useState } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Slider,
//   Tooltip,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// // import FormRow from "../../ui/FormRow";
// import Form from "../../../ui/Form";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate } from "react-router-dom";
// import add from "./../../../assets/add.mp3";
// // import { useAddTasks } from "./useTasks";
// import toast from "react-hot-toast";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useAddTasks } from "./taskQueries";
// import FormRow from "../../../ui/FormRow";

// function convertDate(dateString) {
//   // Parse the date string
//   const date = new Date(dateString);

//   // Convert to ISO format (UTC)
//   return date.toISOString();
// }

// function convertTime(timeString) {
//   // Split the input time string into hours and minutes
//   const [hours, minutes] = timeString.split(":").map(Number);

//   // Create a new date object for today
//   const now = new Date();
//   now.setHours(hours, minutes, 0, 0); // Set time with hours and minutes

//   // Convert to desired format with seconds and microseconds
//   const seconds = now.getSeconds().toString().padStart(2, "0");
//   const milliseconds = now.getMilliseconds().toString().padStart(6, "0"); // Pad to 6 digits
//   return `${hours}:${minutes}:${seconds}.${milliseconds}`;
// }
// const AddToDo = () => {
//   const [title, setTitle] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [ErrorField, setErrorField] = useState(false);
//   const [taskDetails, setTaskDetails] = useState("");
//   const [addsound, setAddSound] = useState(false);
//   const [priority, setPriority] = useState(2);
//   // const options = [{ value: "pending", label: "pending" }];
//   const { addTaskTod, isCreating } = useAddTasks();
//   // const [status_id, setStatus_id] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);
//   const [statuses, setStatuses] = useState([]);
//   const [error, setError] = useState("");
//   const status_id = 1;
//   const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [statusesResponse] = await Promise.all([
//           axios.get(`${apiUrl}/api/task-statuses`, {
//             headers: {
//               Authorization: `Bearer ${Cookies.get("accessToken")}`,
//             },
//           }),
//         ]);

//         // setFormData({
//         //   name: agentResponse.data.name || "",
//         //   street: agentResponse.data.street || "",
//         //   status_id: agentResponse.data.status_id || "",
//         //   target: agentResponse.data.target || "",
//         //   role_id: agentResponse.data.role_id || "",
//         // });

//         setStatuses(2);
//         setIsLoading(false);
//       } catch (err) {
//         setError("Failed to fetch data. Please try again.");
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [apiUrl]);

//   const handleChangeStatus = (event) => {
//     setStatuses(event.target.value);
//   };

//   const handleChange = (event, newValue) => {
//     setPriority(newValue);
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };
//   const handleAdd = () => {
//     if (title.trim() && date && time) {
//       setErrorField(false);
//       console.log("Date: " + date);
//       console.log("Time: " + time);
//       addTaskTod({
//         title,
//         detail: taskDetails,
//         priority_id: priority,
//         status_id: 1,
//         date: convertDate(date),
//         time: convertTime(time),
//       });
//       setAddSound(true);
//       setTitle("");

//       setTaskDetails("");
//       setPriority(2);
//       //   useEffect(() => {
//       const currentPath = window.location.pathname;
//       if (currentPath.endsWith("/addtask")) {
//         const newPath = currentPath.replace("/addtask", "");
//         navigate(newPath);
//         // window.location.reload(); // Refresh the page after navigating to the new URL
//       }
//       //   }, [navigate]);
//     } else {
//       setErrorField(true);
//       toast.error("Task Cannot be added");
//     }
//   };

//   useEffect(
//     function () {
//       const playSound = function () {
//         if (addsound) {
//           const sound = new Audio(add);
//           sound.play();
//         }
//         setAddSound(false);
//       };
//       playSound();
//     },
//     [addsound, setAddSound]
//   );
//   return (
//     <Box sx={{}}>
//       <Button
//         onClick={handleBack}
//         sx={{
//           position: "relative",
//           top: "0px",
//           left: "-5px",
//           color: "#fff",
//           zIndex: "100",
//         }}>
//         <ArrowBackIcon />
//       </Button>
//       <Box display="flex" alignItems="center" justifyContent="center" mb="20px">
//         <Form>
//           <FormRow label="Title">
//             <TextField
//               value={title}
//               helperText={ErrorField && !title ? "task title required" : ""}
//               onChange={(e) => {
//                 setTitle(e.target.value);
//                 setErrorField(false);
//               }}
//               placeholder="Enter new task"
//               variant="outlined"
//               size="small"
//               sx={{ width: "60%", marginRight: "10px" }}
//               error={ErrorField && !title ? true : false}
//             />
//           </FormRow>
//           <FormRow label={"Task Date"}>
//             <TextField
//               helperText={ErrorField && !date ? "task date required" : ""}
//               id="outlined-basic"
//               variant="outlined"
//               type="date"
//               placeholder={"YYYY-MM-DD"}
//               sx={{ width: "60%", marginRight: "10px" }}
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               error={ErrorField && !date ? true : false}
//             />
//           </FormRow>
//           <FormRow label={"TaskTime"}>
//             <TextField
//               helperText={ErrorField && !time ? "task time required" : ""}
//               id="outlined-basic"
//               variant="outlined"
//               type="time"
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               placeholder={"00:00 AM/PM"}
//               sx={{ width: "60%", marginRight: "10px" }}
//               error={ErrorField && !time ? true : false}
//             />
//           </FormRow>
//           {/* <FormRow label={"Status"}>
//             <TextField
//               TextField // Indicates this is a dropdown select
//               value={status_id}
//               onChange={handleChangeStatus}
//               fullWidth
//               variant="outlined"
//             >
//               {options.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </FormRow> */}
//           {/* <FormControl fullWidth margin="normal">
//             <InputLabel>Status</InputLabel>
//             <Select
//               label="Status"
//               name="status_id"
//               value={status_id}
//               onChange={handleChangeStatus}
//             >
//               {statuses.map((status) => (
//                 <MenuItem key={status.id} value={status.id}>
//                   {status.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl> */}
//           <FormRow label={"Priority Level"}>
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-around",
//               }}>
//               <Slider
//                 value={priority}
//                 onChange={handleChange}
//                 valueLabelDisplay="auto"
//                 valueLabelFormat={(value) => {
//                   if (value === 1) return "1";
//                   if (value === 2) return "2";
//                   if (value === 3) return "3";
//                 }}
//                 step={1}
//                 marks={[
//                   { value: 1, label: "1" },
//                   { value: 2, label: "2" },
//                   { value: 3, label: "3" },
//                 ]}
//                 min={1}
//                 max={3}
//                 sx={{
//                   height: 5,
//                   width: "60%",
//                   "& .MuiSlider-thumb": {
//                     width: 15,
//                     height: 15,
//                     backgroundColor:
//                       priority === 1
//                         ? "grey"
//                         : priority === 2
//                           ? "#1976d2"
//                           : "red",
//                   },
//                   "& .MuiSlider-rail": {
//                     backgroundColor: "#e0e0e0",
//                   },
//                   "& .MuiSlider-track": {
//                     backgroundColor:
//                       priority === 1
//                         ? "grey"
//                         : priority === 2
//                           ? "#1976d2"
//                           : "red",
//                   },
//                 }}
//               />
//               <Tooltip
//                 title={`${priority === 1 ? "1" : priority === 2 ? "2" : "3"}`}
//                 arrow
//                 placement="top"
//                 PopperProps={{
//                   modifiers: [
//                     {
//                       name: "offset",
//                       options: {
//                         offset: [0, 8],
//                       },
//                     },
//                   ],
//                 }}
//                 componentsProps={{
//                   tooltip: {
//                     sx: {
//                       fontSize: "1.2rem", // Make the font larger
//                       padding: "8px 16px", // Add padding around the content
//                     },
//                   },
//                 }}>
//                 <Box
//                   sx={{
//                     background: `${
//                       priority === 1
//                         ? "grey"
//                         : priority === 2
//                           ? "#1976d2"
//                           : "red"
//                     }`,
//                     cursor: "pointer",
//                     height: "14px",
//                     width: "14px",
//                     borderRadius: "50%",
//                   }}></Box>
//               </Tooltip>
//             </Box>
//           </FormRow>
//           <FormRow label="Task Details">
//             <TextField
//               placeholder="Enter Details....."
//               multiline
//               rows={4}
//               value={taskDetails}
//               onChange={(e) => setTaskDetails(e.target.value)}
//               sx={{
//                 width: "400px",
//               }}
//             />
//           </FormRow>

//           <Button variant="contained" color="primary" onClick={handleAdd}>
//             Add
//           </Button>
//         </Form>
//       </Box>
//     </Box>
//   );
// };

// export default AddToDo;
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Slider,
  Tooltip,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAddTasks, useTaskStatuses } from "./taskQueries";
import styled from "styled-components";
import FormRow from "../../../ui/FormRow";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.8rem;
`;

const AddToDo = ({ open, onClose }) => {
  const { data: statuses = [] } = useTaskStatuses();
  const { addTaskTod, isCreating } = useAddTasks();

  const [formState, setFormState] = useState({
    title: "",
    date: "",
    time: "",
    taskDetails: "",
    priority: 2,
    status_id: 1,
    errorField: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
      errorField: false,
    }));
  };

  const handlePriorityChange = (event, newValue) => {
    setFormState((prev) => ({ ...prev, priority: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formState.title || !formState.date || !formState.time) {
      setFormState((prev) => ({ ...prev, errorField: true }));
      return;
    }

    addTaskTod(
      {
        title: formState.title,
        detail: formState.taskDetails,
        priority_id: formState.priority,
        status_id: formState.status_id,
        date: convertDate(formState.date),
        time: convertTime(formState.time),
      },
      {
        onSuccess: () => {
          onClose();
          setFormState({
            title: "",
            date: "",
            time: "",
            taskDetails: "",
            priority: 2,
            status_id: 1,
            errorField: false,
          });
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Add New Task
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Form onSubmit={handleSubmit}>
          <FormRow label="Title">
            <TextField
              name="title"
              value={formState.title}
              error={formState.errorField && !formState.title}
              helperText={
                formState.errorField && !formState.title && "Title is required"
              }
              onChange={handleChange}
              fullWidth
            />
          </FormRow>

          <FormRow label="Date">
            <TextField
              name="date"
              type="date"
              value={formState.date}
              error={formState.errorField && !formState.date}
              helperText={
                formState.errorField && !formState.date && "Date is required"
              }
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </FormRow>

          <FormRow label="Time">
            <TextField
              name="time"
              type="time"
              value={formState.time}
              error={formState.errorField && !formState.time}
              helperText={
                formState.errorField && !formState.time && "Time is required"
              }
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </FormRow>

          <FormRow label="Status">
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status_id"
                value={formState.status_id}
                onChange={handleChange}
                label="Status">
                {statuses.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormRow>

          <FormRow label="Priority Level">
            <Box display="flex" alignItems="center" gap={2}>
              <Slider
                value={formState.priority}
                onChange={handlePriorityChange}
                min={1}
                max={3}
                step={1}
                marks={[
                  { value: 1, label: "Low" },
                  { value: 2, label: "Medium" },
                  { value: 3, label: "High" },
                ]}
                sx={{
                  width: "80%",
                  color:
                    formState.priority === 3
                      ? "error.main"
                      : formState.priority === 2
                        ? "primary.main"
                        : "grey.500",
                }}
              />
              <Tooltip
                title={
                  formState.priority === 3
                    ? "High Priority"
                    : formState.priority === 2
                      ? "Medium Priority"
                      : "Low Priority"
                }>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    bgcolor:
                      formState.priority === 3
                        ? "error.main"
                        : formState.priority === 2
                          ? "primary.main"
                          : "grey.500",
                  }}
                />
              </Tooltip>
            </Box>
          </FormRow>

          <FormRow label="Task Details">
            <TextField
              name="taskDetails"
              value={formState.taskDetails}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />
          </FormRow>
        </Form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isCreating}>
          {isCreating ? "Creating..." : "Create Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Helper functions
const convertDate = (dateString) => new Date(dateString).toISOString();
const convertTime = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  return date.toISOString().split("T")[1].slice(0, 8);
};

export default AddToDo;
