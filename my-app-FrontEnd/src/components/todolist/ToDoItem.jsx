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

  //Edit Functions Stuff
  //Pop up stuff

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //

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
            color: colors.grey[100],
            flexGrow: 1,
            marginLeft: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          {todo.comment}
        </Typography>
        <Box
          display="flex"
          flex={1}
          alignItems="center"
          justifyContent="center"
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
            {todo.created_at}
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
            {todo.time}
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
            {todo.date}
          </Typography>

          <Box
            sx={{
              cursor: "pointer",
              height: "14px",
              width: "14px",
              borderRadius: "50%",
              marginRight: "60px",
            }}
          >
            {todo.status}
          </Box>

          <EditIcon sx={{ cursor: "pointer" }} />

          {/* Separate ---------------------------------------- */}
        </Box>
      </Box>
      <Box sx={{ width: "90%" }}>
        <ShowMoreLess text={todo.location} />
      </Box>
    </Box>
  );
};

export default ToDoItem;
