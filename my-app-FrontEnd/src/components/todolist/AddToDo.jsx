import { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTask } from "../../GlobalState/todolistSlice";
import add from "./add.mp3";

const AddToDo = () => {
  const [title, setTitle] = useState("");
  const [deadLineDate, setDeadLineDate] = useState("");
  const [deadLineTime, setDeadLineTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [addsound, setAddSound] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBack = () => {
    navigate(-1);
  };
  const handleAdd = () => {
    if (title.trim()) {
      dispatch(
        addTask(
          title,
          deadLineDate,
          deadLineTime,
          startDate,
          startTime,
          taskDetails
        )
      );
      setAddSound(true);
      setTitle("");
      setDeadLineDate("");
      setDeadLineTime("");
      setStartDate("");
      setStartTime("");
      setTaskDetails("");
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
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter new task"
              variant="outlined"
              size="small"
              sx={{ width: "60%", marginRight: "10px" }}
            />
          </FormRow>
          <FormRow label={"Start Time"}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="date"
              placeholder={"YYYY-MM-DD"}
              size={"small"}
              width={"40%"}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <TextField
              id="outlined-basic"
              variant="outlined"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder={"00:00 AM/PM"}
              size={"small"}
              width={"40%"}
            />
          </FormRow>
          <FormRow label={"Deadline"}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="date"
              placeholder={"YYYY-MM-DD"}
              size={"small"}
              width={"40%"}
              value={deadLineDate}
              onChange={(e) => setDeadLineDate(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="time"
              value={deadLineTime}
              onChange={(e) => setDeadLineTime(e.target.value)}
              placeholder={"00:00 AM/PM"}
              size={"small"}
              width={"40%"}
            />
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
