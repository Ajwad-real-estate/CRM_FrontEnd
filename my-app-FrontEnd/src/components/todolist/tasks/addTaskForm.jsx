import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Slider,
  MenuItem,
  InputLabel,
  Select,
  Button,
  Tooltip,
} from "@mui/material";
import { useUpdateTask } from "./taskQueries";
import styled from "styled-components";
import FormRow from "../../../ui/FormRow";
// import { useDeleteTask, useTaskStatuses } from "./taskQueries";
import { useTaskStatuses } from "./taskQueries";
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.8rem;
  align-items: center;
  justify-content: space-between;
  padding: 40px 70px;
`;

const AddTaskForm = ({ todo, onClose }) => {
  const { data: statuses = [] } = useTaskStatuses();

  const [title, setTitle] = useState(todo.title);
  const [date, setDate] = useState(todo.date);
  const [time, setTime] = useState(todo.time);
  const [status_id, setStatus_id] = useState(todo.status_id);
  const [detail, setDetails] = useState(todo.detail);
  const [priority_id, setPriority_id] = useState(todo.priority_id);

  const { updateTaskById, isUpdating } = useUpdateTask();

  const handleChange = (event, newValue) => {
    setPriority_id(newValue);
  };

  const handleChangeStatus = (event) => {
    setStatus_id(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      title,
      date,
      time,
      detail,
      status_id,
      priority_id,
    };

    updateTaskById(
      { taskId: todo.id, taskData },
      {
        onSuccess: () => onClose(),
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
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

      <FormRow label="Date">
        <TextField
          variant="outlined"
          type="date"
          size="small"
          width="40%"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </FormRow>

      <FormRow label="Time">
        <TextField
          variant="outlined"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          size="small"
          width="40%"
        />
      </FormRow>

      <InputLabel>Status</InputLabel>
      <Select
        label="Status"
        name="status_id"
        value={status_id}
        onChange={handleChangeStatus}>
        {statuses.map((status) => (
          <MenuItem key={status.id} value={status.id}>
            {status.name}
          </MenuItem>
        ))}
      </Select>

      <FormRow label="Priority Level">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}>
          <Slider
            value={priority_id}
            onChange={handleChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => {
              if (value === 1) return "Follow Up";
              if (value === 2) return "Routine";
              if (value === 3) return "Urgent";
            }}
            step={1}
            marks={[
              { value: 1, label: "Follow Up" },
              { value: 2, label: "Routine" },
              { value: 3, label: "Urgent" },
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
                  priority_id === 1
                    ? "grey"
                    : priority_id === 2
                      ? "#1976d2"
                      : "red",
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#e0e0e0",
              },
              "& .MuiSlider-track": {
                backgroundColor:
                  priority_id === 1
                    ? "grey"
                    : priority_id === 2
                      ? "#1976d2"
                      : "red",
              },
            }}
          />
          <Tooltip
            title={`${
              priority_id === 1
                ? "Follow Up"
                : priority_id === 2
                  ? "Routine"
                  : "Urgent"
            }`}
            arrow
            placement="top">
            <Box
              sx={{
                background: `${
                  priority_id === 1
                    ? "grey"
                    : priority_id === 2
                      ? "#1976d2"
                      : "red"
                }`,
                cursor: "pointer",
                height: "14px",
                width: "14px",
                borderRadius: "50%",
              }}
            />
          </Tooltip>
        </Box>
      </FormRow>

      <FormRow label="Task Details">
        <TextField
          placeholder="Enter Details....."
          multiline
          rows={4}
          value={detail}
          onChange={(e) => setDetails(e.target.value)}
          sx={{ width: "400px" }}
        />
      </FormRow>

      <Button type="submit" variant="contained" disabled={isUpdating}>
        {isUpdating ? "Updating..." : "Update"}
      </Button>
    </Form>
  );
};

export default AddTaskForm;
