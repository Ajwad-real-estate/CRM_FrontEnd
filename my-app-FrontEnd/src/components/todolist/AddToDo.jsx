import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";
import { Input } from "../../ui/Input";
import { useListInfo } from "./Contexts/TempContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const AddToDo = () => {
  const [title, setTitle] = useState("");
  const { onAdd } = useListInfo();
  const [deadLineDate, setDeadLineDate] = useState("");
  const [deadLineTime, setDeadLineTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const handleAdd = () => {
    if (title.trim()) {
      onAdd(
        title,
        deadLineDate,
        deadLineTime,
        startDate,
        startTime,
        taskDetails
      );
      setTitle("");
      setDeadLineDate("");
      setDeadLineTime("");
      setStartDate("");
      setStartTime("");
      setTaskDetails("");
    }
  };
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
            <Input
              type="date"
              value={startDate}
              onChange={setStartDate}
              placeholder={"YYYY-MM-DD"}
              size={"small"}
              width={"30%"}
            />
            <Input
              type="time"
              value={startTime}
              onChange={setStartTime}
              placeholder={"00:00 AM/PM"}
              size={"small"}
              width={"40%"}
            />
          </FormRow>
          <FormRow label={"Deadline"}>
            <Input
              type="date"
              value={deadLineDate}
              onChange={setDeadLineDate}
              placeholder={"YYYY-MM-DD"}
              size={"small"}
              width={"40%"}
            />
            <Input
              type="time"
              value={deadLineTime}
              onChange={setDeadLineTime}
              placeholder={"00:00 AM/PM"}
              size={"small"}
              width={"30%"}
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
