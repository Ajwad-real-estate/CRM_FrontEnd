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
  Tooltip,
  Slider,
} from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { deleteTask, handleEditTask } from "../../GlobalState/todolistSlice";
import delet from "../../assets/delet.mp3";
import FormRow from "../../ui/FormRow";

import styled from "styled-components";
import ShowMoreLess from "./ShowMoreLess";
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
  const [priority, setPriority] = useState(todo.priority);
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
  const handleChange = (event, newValue) => {
    setPriority(newValue);
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
        todo.id,
        priority
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
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        marginInline="auto"
        justifyContent="space-between"
        width="100%"
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
          width="190px"
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
          <Tooltip
            title={`${todo.priority === 1
                ? "Follow Up"
                : priority === 2
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
                  fontSize: "1.1rem", // Make the font larger
                  padding: "5px 10px", // Add padding around the content
                },
              },
            }}
          >
            <Box
              sx={{
                background: `${todo.priority === 1
                    ? "grey"
                    : priority === 2
                      ? "#1976d2"
                      : "red"
                  }`,
                cursor: "pointer",
                height: "14px",
                width: "14px",
                borderRadius: "50%",
                marginRight: "60px",
              }}
            ></Box>
          </Tooltip>

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
                    title={`${priority === 1
                        ? "Follow Up"
                        : priority === 2
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
                    }}
                  >
                    <Box
                      sx={{
                        background: `${priority === 1
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

              <Button variant="contained" onClick={handleEdit}>
                Edit
              </Button>
            </Form>
          </BootstrapDialog>
        </Box>
      </Box>
      <Box sx={{ width: "90%" }}>
        <ShowMoreLess text={todo.taskDetails} />
      </Box>
    </Box>
  );
};

export default ToDoItem;
