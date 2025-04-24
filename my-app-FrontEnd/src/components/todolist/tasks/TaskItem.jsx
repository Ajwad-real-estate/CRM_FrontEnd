import { useEffect, useMemo, useState } from "react";
//pop Imports
import { styled as sty } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Typography,
  Checkbox,
  Button,
  TextField,
  IconButton,
  Tooltip,
  Slider,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { tokens } from "../../../theme";
import { useTheme } from "@emotion/react";
import EditIcon from "@mui/icons-material/Edit";
import FormRow from "../../../ui/FormRow";
import styled from "styled-components";
import ShowMoreLess from "../utils/ShowMoreLess";
import axios from "axios";
import Cookies from "js-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDeleteTask, useUpdateTask } from "./taskQueries";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.8rem;
  align-items: center;
  justify-content: space-between;
  padding: 40px 70px;
`;

const BootstrapDialog = sty(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ToDoItem = ({ todo }) => {
  const theme = useTheme();
  const colors = useMemo(
    () => tokens(theme.palette.mode),
    [theme.palette.mode]
  );
  const [title, setTitle] = useState(todo.title);
  const [date, setDate] = useState(todo.date);
  const [time, setTime] = useState(todo.time);
  const [status_id, setStatus_id] = useState(todo.status_id);
  const [detail, setDetails] = useState(todo.detail);
  const [priority_id, setPriority_id] = useState(todo.priority_id);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const { data: statuses = [], isLoading } = useQuery({
    queryKey: ["taskStatuses"],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/api/task-statuses`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      return response.data.statuses;
    },
    // refetchInterval: 60000, // Refetch every 60 seconds
  });

  const { deleteTaskById, isDeleting } = useDeleteTask();
  const { updateTaskById, isUpdating } = useUpdateTask();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setTitle(todo.title);
    setTime(todo.time);
    setDate(todo.date);
    setPriority_id(todo.priority_id);
    setStatus_id(todo.status_id);
    setDetails(todo.detail);
    setOpen(false);
  };
  const handleChange = (event, newValue) => {
    setPriority_id(newValue);
  };

  const handleEdit = () => {
    handleClose();
    const taskData = {
      title,
      date,
      time,
      detail,
      status_id,
      priority_id,
      // priority_id: priority,
    };

    updateTaskById({ taskId: todo.id, taskData });
  };

  //
  const handleChangeStatus = (event) => {
    setStatus_id(event.target.value);
  };
  //
  return (
    <Box
      p="10px"
      mb="10px"
      aria-controls="panel1-content"
      id="panel1-header"
      borderRadius="4px"
      sx={{
        display: "flex",
        flexDirection: "column",

        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        backgroundColor: colors.grey[900],
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}>
      <Box
        display="flex"
        alignItems="center"
        marginInline="auto"
        justifyContent="space-between"
        width="100%">
        <Checkbox
          onChange={() => deleteTaskById(todo.id)}
          sx={{
            color: colors.greenAccent[500],
            "&.Mui-checked": {
              color: colors.greenAccent[600],
            },
          }}
        />
        <Typography
          variant="body1"
          width="120px"
          sx={{
            color: colors.grey[100],
            flexGrow: 1,
            marginLeft: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}>
          {todo.title}
        </Typography>

        <Box
          display="flex"
          flex={1}
          alignItems="center"
          justifyContent="space-between"
          padding="auto"
          marginInline="auto"
          borderRadius="4px"
          // width="50%"
        >
          <Typography
            variant="body1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              color: colors.grey[100],
              marginLeft: "0",
              fontSize: "1rem",
            }}>
            End at: {todo.date}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: colors.grey[100],
              flexGrow: 1,
              marginLeft: "6px",
              fontSize: "1rem",
            }}>
            {todo.time}
          </Typography>

          <Box
            sx={{
              cursor: "pointer",
              height: "14px",
              width: "14px",
              borderRadius: "50%",
              marginRight: "60px",
            }}>
            {statuses.find((status) => status.id === todo.status_id)?.name}
          </Box>

          <EditIcon onClick={handleClickOpen} sx={{ cursor: "pointer" }} />

          {/* Separate ---------------------------------------- */}
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={(theme) => ({
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}>
              <CloseIcon />
            </IconButton>
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
              <FormRow label={"Date"}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="date"
                  placeholder={"YYYY-MM-DD"}
                  size={"small"}
                  width={"40%"}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </FormRow>
              <FormRow label={"Time "}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder={"00:00 AM/PM"}
                  size={"small"}
                  width={"40%"}
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

              <FormRow label={"Priority Level"}>
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
                    }}>
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
                      }}></Box>
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
                  sx={{
                    width: "400px",
                  }}
                />
              </FormRow>

              <Button variant="contained" onClick={handleEdit}>
                {isUpdating ? "Updating..." : "update"}
              </Button>
            </Form>
          </BootstrapDialog>
        </Box>
      </Box>
      <Box sx={{ width: "90%" }}>
        <ShowMoreLess text={todo.detail} />
      </Box>
    </Box>
  );
};

export default ToDoItem;
