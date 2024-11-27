import { useEffect, useState } from "react";
//pop Imports
import { styled as sty } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

import CloseIcon from "@mui/icons-material/Close";

//

import {
  Box,
  Typography,
  Checkbox,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { deleteTask, handleEditTask } from "../../GlobalState/todolistSlice";
import delet from "./delet.mp3";
import FormRow from "../../ui/FormRow";
import { checkTaskDateValidation } from "../../helpers/dates";
import toast from "react-hot-toast";
import styled from "styled-components";
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
  const colors = tokens(theme.palette.mode);
  const [dltSound, setDltSound] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [deadLineDate, setDeadLineDate] = useState(todo.deadLineDate);
  const [deadLineTime, setDeadLineTime] = useState(todo.deadLineTime);
  const [startTime, setStartTime] = useState(todo.startTime);
  const [startDate, setStartDate] = useState(todo.startDate);
  const [taskDetails, setTaskDetails] = useState(todo.taskDetails);
  //Edit Functions Stuff
  const dispatch = useDispatch();
  //Pop up stuff

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //
  const handleEdit = () => {
    dispatch(
      handleEditTask(
        title,
        deadLineDate,
        deadLineTime,
        startDate,
        startTime,
        taskDetails,
        todo.id
      )
    );
    handleClose();
  };

  //

  const handleCheckboxChange = (id) => {
    dispatch(deleteTask(id));
  };
  function onDelete(id) {
    handleCheckboxChange(id);
    setDltSound(true);
  }
  useEffect(
    function () {
      const playSound = function () {
        if (dltSound) {
          const sound = new Audio(delet);
          sound.play();
        }
        setDltSound(false);
      };
      playSound();
    },
    [dltSound, setDltSound]
  );
  return (
    <Box
      display="flex"
      alignItems="center"
      marginInline="auto"
      justifyContent="space-between"
      width="80%"
      p="10px"
      mb="10px"
      borderRadius="4px"
      aria-controls="panel1-content"
      id="panel1-header"
      sx={{
        backgroundColor: colors.grey[900],
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Checkbox
        checked={todo.completed}
        onChange={() => onDelete(todo.id)}
        sx={{
          color: colors.greenAccent[500],
          "&.Mui-checked": {
            color: colors.greenAccent[600],
          },
        }}
      />
      <Typography
        variant="body1"
        width="200px"
        sx={{
          textDecoration: todo.completed ? "line-through" : "none",
          color: colors.grey[100],
          flexGrow: 1,
          marginLeft: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
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
        width="60%"
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
          }}
        >
          {todo.startTime}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: colors.grey[100],
            flexGrow: 1,
            marginLeft: "6px",
            fontSize: "1rem",
          }}
        >
          {todo.startDate}
        </Typography>
      </Box>
      <Box
        display="flex"
        flex={1}
        alignItems="center"
        justifyContent="space-between"
        padding="auto"
        marginInline="auto"
        borderRadius="4px"
        width="60%"
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
          }}
        >
          {todo.deadLineTime}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: colors.grey[100],
            flexGrow: 1,
            marginLeft: "6px",
            fontSize: "1rem",
          }}
        >
          {todo.deadLineDate}
        </Typography>

        <EditIcon onClick={handleClickOpen} sx={{ cursor: "pointer" }} />

        {/* Separate ---------------------------------------- */}
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
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

            <Button variant="contained" onClick={handleEdit}>
              Edit
            </Button>
          </Form>
        </BootstrapDialog>
      </Box>
    </Box>
  );
};

export default ToDoItem;
