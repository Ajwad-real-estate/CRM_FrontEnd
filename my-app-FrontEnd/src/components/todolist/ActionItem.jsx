import { useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Tooltip,
  Slider,
  MenuItem,
} from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import FormRow from "../../ui/FormRow";
// import styled from "styled-components";
import ShowMoreLess from "./ShowMoreLess";
import { useUpdateAction } from "./useUpdateAction";
import { ActionMenu } from './ActionMenu';


// Replace the Form array definition with
const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '0.8rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '40px 70px'
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const statusOptions = [
  { value: 1, label: "New" },
  { value: 2, label: "In Progress" },
  { value: 3, label: "Completed" },
];

const ActionItem = ({ todo }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    comment: todo.comment,
    date: new Date(todo.date).toISOString().split('T')[0],
    time: todo.time,
    status_id: todo.status_id,
    completed: todo.completed,
    answered: todo.answered,
    unit_id: todo.unit_id,
    project_id: todo.project_id,
    type_id: todo.type_id,
    location: todo.location,
  });

  const { updateActionById, isUpdating } = useUpdateAction();

  const handleClose = () => {
    setFormData({
      comment: todo.comment,
      date: new Date(todo.date).toISOString().split('T')[0],
      time: todo.time,
      status_id: todo.status_id,
      completed: todo.completed,
      answered: todo.answered,
      unit_id: todo.unit_id,
      project_id: todo.project_id,
      type_id: todo.type_id,
      location: todo.location,
    });
    setOpen(false);
  };

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = () => {
    updateActionById({
      actionId: todo.id,
      actionData: {
        ...formData,
        date: new Date(formData.date).toISOString()
      }
    });
    handleClose();
  };

  return (
    <Box
      p="10px"
      mb="10px"
      borderRadius="4px"
      sx={{
        display: "flex",
        flexDirection: "column",
        borderLeft: "10px solid red",
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
        justifyContent="space-between"
        width="100%"
      >  <ActionMenu
          onEdit={() => setOpen(true)}
          // onDelete={handleDelete}
          // onComplete={handleComplete}
          // onCancel={handleCancel}
          // isCompleted={todo.completed}
          disabled={isUpdating}
        />
        <Typography
          variant="body1"
          sx={{
            color: colors.grey[100],
            flexGrow: 1,
            marginLeft: "10px",
          }}
        >
          {todo.comment}
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding="10px"
        >
          {/* <Typography sx={{ color: colors.grey[100], marginRight: "20px" }}>
            Created: {new Date(todo.created_at).toLocaleDateString()}
          </Typography> */}

          <Typography sx={{ color: colors.grey[100], marginRight: "20px" }}>
            {new Date(todo.date).toLocaleDateString()} {todo.time}
          </Typography>

          <Box
            sx={{
              height: "14px",
              width: "14px",
              borderRadius: "50%",
              backgroundColor: todo.status_id === 1 ? "grey" :
                todo.status_id === 2 ? "orange" : "green",
              marginRight: "20px"
            }}
          />

          <EditIcon onClick={() => setOpen(true)} sx={{ cursor: "pointer" }} />
        </Box>
      </Box>

      <BootstrapDialog onClose={handleClose} open={open}>
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "grey.500",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box>action edit</Box>
        <Form>
          <FormRow label="Comment">
            <TextField
              value={formData.comment}
              onChange={handleChange('comment')}
              placeholder="Enter action comment"
              variant="outlined"
              size="small"
              fullWidth
            />
          </FormRow>

          {/* <FormRow label="Date">
            <TextField
              type="date"
              value={formData.date}
              onChange={handleChange('date')}
              variant="outlined"
              size="small"
            />
          </FormRow> */}
{/* 
          <FormRow label="Time">
            <TextField
              type="time"
              value={formData.time}
              onChange={handleChange('time')}
              variant="outlined"
              size="small"
            />
          </FormRow> */}

          {/* <FormRow label="Status">
            <TextField
              select
              value={formData.status_id}
              onChange={handleChange('status_id')}
              fullWidth
              variant="outlined"
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormRow> */}

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </Form>
      </BootstrapDialog>
    </Box>
  );
};

export default ActionItem;
