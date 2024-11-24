import React, { useState } from "react";
//pop Imports
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { blueGrey } from "@mui/material/colors";

//

import { Box, Typography, Checkbox } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import DescriptionIcon from "@mui/icons-material/Description";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ToDoItem = ({ todo, onComplete, handleStopPropagation }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Pop up stuff

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //

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
        onChange={() => onComplete(todo.id)}
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

        <DescriptionIcon onClick={handleClickOpen} sx={{ cursor: "pointer" }} />

        {/* Separate ---------------------------------------- */}
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle
            sx={{
              m: 0,
              p: 2,
              fontSize: "28px",
              fontWeight: "600",
              backgroundColor: "#17253e",
              boxShadow: "3px 5px 11px #000919bc",
            }}
            id="customized-dialog-title"
          >
            {todo.title}
          </DialogTitle>
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
          <DialogContent sx={{ backgroundColor: "#1a2b49" }}>
            <Typography sx={{ fontSize: "19px" }} gutterBottom>
              {todo.taskDetails}
            </Typography>
          </DialogContent>
        </BootstrapDialog>
      </Box>
    </Box>
  );
};

export default ToDoItem;
