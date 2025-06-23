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
import { tokens } from "../../../helpers/redux/theme";
import { useTheme } from "@emotion/react";
import EditIcon from "@mui/icons-material/Edit";
import FormRow from "../../../helpers/ui/FormRow";
import styled from "styled-components";
import ShowMoreLess from "../utils/ShowMoreLess";
import axios from "axios";
import Cookies from "js-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDeleteTask, useUpdateTask } from "./taskQueries";
import AddTaskForm from "./addTaskForm";

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

const ToDoItem = ({ todo, onDelete }) => {
  const theme = useTheme();
  const colors = useMemo(
    () => tokens(theme.palette.mode),
    [theme.palette.mode]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      const response = await axios.get(`${apiUrl}/api/things/task-statuses`, {
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
  const handleCheckboxDelete = () => {
    // Optimistically remove the task from the UI
    onDelete(todo.id); // This will trigger parent component to remove it
    // Then send the delete request
    deleteTaskById(todo.id);
  };
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
        width: "98%",
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
          // onChange={() => deleteTaskById(todo.id)}
          onChange={handleCheckboxDelete}
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
          gap="20px"
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
              display: { xs: "none", sm: "none", md: "none", lg: "flex" },
            }}>
            {todo.date}, {todo.time.slice(0, 5)}
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" }, // Hide on mobile and tablet
              cursor: "pointer",
              width: "20px",
            }}>
            {statuses.find((status) => status.id === todo.status_id)?.name}
          </Box>

          <EditIcon onClick={handleClickOpen} sx={{ cursor: "pointer" }} />

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
            <AddTaskForm todo={todo} onClose={handleClose} />
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
