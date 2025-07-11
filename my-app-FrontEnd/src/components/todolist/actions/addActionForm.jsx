import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  MenuItem,
  Collapse,
} from "@mui/material";
import { tokens } from "../../../helpers/redux/theme";
import { useTheme } from "@emotion/react";
import FormRow from "../../../helpers/ui/FormRow";
import { useUpdateAction } from "./actionQueries";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useClient } from "../../newNewKanbanBoard/actions/useKanban";
import { useUpdateClient } from "../../newNewKanbanBoard/actions/useUpdateClient";
import Loading from "../../../helpers/loading";

const Form = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "0.8rem",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "40px 70px",
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
  { value: 2, label: "Qualified" },
  { value: 3, label: "Reserved" },
  { value: 4, label: "Done Deal" },
  { value: 5, label: "Archived" },
  { value: 6, label: "Lost" },
];
const CHANNEL_OPTIONS = [
  { value: 1, label: "Direct" },
  { value: 2, label: "Website" },
  { value: 3, label: "Referral" },
  { value: 4, label: "Referral" },
];

const TYPE_OPTIONS = [
  { value: 1, label: "warm" },
  { value: 2, label: "cold" },
];

const CITY_OPTIONS = [
  { value: 1, label: "Cairo" },
  { value: 2, label: "Alexandria" },
  { value: 3, label: "Giza" },
  { value: 4, label: "Giza" },
];
const actionOptions = [
  { value: 1, label: "Follow Up" },
  { value: 2, label: "Meeting" },
  { value: 3, label: "Follow Up After Meeting" },
];

const ActionForm = ({ open, onClose, todo }) => {
  console.log("ActionForm:", todo);

  console.log("addAction");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { updateActionById, isUpdating } = useUpdateAction();
  const [answered, setAnswered] = useState(
    todo.answered !== undefined ? todo.answered : true
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: clientData, isPending: isLoadingClient } = useClient(
    todo.client_id
  );
  const { editClient, isLoading: isUpdatingClient } = useUpdateClient();

  const [formData, setFormData] = useState({
    comment: "",
    date: "",
    time: "",
    status_id: "",
    location: "",
    name: "",
    email: "",
    age: "",
    phone_numbers: "",
    nat_id: "",
    street: "",
    city_id: "",
    channel_id: "",
    type_id: "",
    budget: "",
    action_id: "",
    project_id: "",
    unit_id: "",
  });

  useEffect(() => {
    if (clientData && todo) {
      setFormData({
        comment: todo.comment || "",
        date: todo.date ? new Date(todo.date).toISOString().split("T")[0] : "",
        time: todo.time || "",
        status_id: clientData?.status_id || "",
        location: todo.location || "",
        name: clientData.name || "",
        email: clientData.email || "",
        age: clientData.age || "",
        phone_numbers: clientData.phone_numbers?.[0] || "",
        nat_id: clientData.nat_id || "",
        street: clientData.street || "",
        city_id: clientData.city_id || "",
        channel_id: clientData.channel_id || "",
        type_id: clientData.type_id || "",
        budget: clientData.budget || "",
        action_id: todo.action_id || "",
        project_id: todo.project_id || "",
        unit_id: todo.unit_id || "",
        action_type: todo.type_id || "",
      });
    }
  }, [clientData, todo]);
  console.log("formData:", formData);
  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleAnswer = (value) => {
    setFormData((prev) => ({
      ...prev,
      answered: value,
    }));
    setAnswered(value);
  };

  const handleSubmitAction = async () => {
    try {
      setIsSubmitting(true);
      const actionData = {
        comment: formData.comment,
        date: formData.date,
        time: formData.time,
        status_id: parseInt(formData.status_id),
        location: formData.location,
      };

      await updateActionById({
        actionId: todo.id,
        actionData,
      });
      onClose();
    } catch (error) {
      console.error("Failed to update:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitClient = async () => {
    try {
      setIsSubmitting(true);
      const clientData = {
        name: formData.name,
        email: formData.email,
        age: parseInt(formData.age),
        budget: parseInt(formData.budget),
        phone_numbers: [formData.phone_numbers],
        nat_id: formData.nat_id,
        street: formData.street,
        city_id: parseInt(formData.city_id),
        channel_id: parseInt(formData.channel_id),
        type_id: parseInt(formData.type_id),
        status_id: parseInt(formData.status_id),
      };

      editClient({ clientID: todo.client_id, clientData });
      onClose();
    } catch (error) {
      console.error("Failed to update:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  // if (!clientData) {
  //   return <Loading />;
  // }
  return (
    <BootstrapDialog
      onClose={onClose}
      open={open}
      style={{ minWidth: "500px !important" }}>
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "grey.500",
        }}>
        <CloseIcon />
      </IconButton>
      {!clientData ? (
        <Box sx={{ minWidth: "500px !important" }}>
          <Loading />
        </Box>
      ) : (
        <>
          <Form>
            <Box mb={2}>
              <Typography variant="h6" gutterBottom>
                Client Information
              </Typography>
              {/* <Box>{formData.name}</Box> */}
              <TextField
                label="Client Name"
                value={formData.name}
                onChange={handleChange("name")}
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Age"
                type="number"
                value={formData.age}
                onChange={handleChange("age")}
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone Number"
                value={formData.phone_numbers}
                onChange={handleChange("phone_numbers")}
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
              />
              <TextField
                label="National ID"
                value={formData.nat_id}
                onChange={handleChange("nat_id")}
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Street"
                value={formData.street}
                onChange={handleChange("street")}
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
              />
              <TextField
                select
                label="City"
                value={formData.city_id}
                onChange={handleChange("city_id")}
                variant="outlined"
                size="small"
                fullWidth
                margin="normal">
                {CITY_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Budget"
                type="number"
                value={formData.budget}
                onChange={handleChange("budget")}
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
              />
              <TextField
                select
                label="Channel"
                value={formData.channel_id}
                onChange={handleChange("channel_id")}
                variant="outlined"
                size="small"
                fullWidth
                margin="normal">
                {CHANNEL_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Type"
                value={formData.type_id}
                onChange={handleChange("type_id")}
                variant="outlined"
                size="small"
                fullWidth
                margin="normal">
                {TYPE_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Button
              variant="contained"
              onClick={handleSubmitClient}
              disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update"}
            </Button>
          </Form>
          <Form>
            <FormRow label="Status">
              <TextField
                select
                value={formData?.status_id}
                onChange={handleChange("status_id")}
                fullWidth
                variant="outlined">
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormRow>

            <FormRow label="Comment">
              <TextField
                value={formData.comment}
                onChange={handleChange("comment")}
                placeholder="Enter action comment"
                variant="outlined"
                size="small"
                fullWidth
              />
            </FormRow>
            <FormRow label="Date">
              <TextField
                type="date"
                value={formData.date}
                onChange={handleChange("date")}
                variant="outlined"
                size="small"
              />
            </FormRow>
            <FormRow label="Time">
              <TextField
                type="time"
                value={formData.time}
                onChange={handleChange("time")}
                variant="outlined"
                size="small"
              />
            </FormRow>

            <FormRow label="type of action">
              <TextField
                select
                value={formData.action_type}
                onChange={handleChange("action_type")}
                fullWidth
                variant="outlined">
                {actionOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormRow>
            <Box display="flex" justifyContent="space-between" gap="10px">
              <Button
                variant={answered === true ? "contained" : "outlined"}
                color="success"
                onClick={() => handleAnswer(true)}>
                Answer
              </Button>
              <Button
                variant={answered === false ? "contained" : "outlined"}
                color="error"
                onClick={() => handleAnswer(false)}>
                Not Answer
              </Button>
            </Box>
            <Box display="flex" alignItems="center" mt={2}>
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                Additional Data
              </Typography>
              <IconButton onClick={handleToggleExpand}>
                {isExpanded ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
              </IconButton>
            </Box>
            <Collapse in={isExpanded}>
              <Box mt={2}>
                <TextField
                  label="Location"
                  value={formData.location}
                  onChange={handleChange("location")}
                  variant="outlined"
                  size="small"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Project ID"
                  value={formData.project_id}
                  onChange={handleChange("project_id")}
                  variant="outlined"
                  size="small"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Unit ID"
                  value={formData.unit_id}
                  onChange={handleChange("unit_id")}
                  variant="outlined"
                  size="small"
                  fullWidth
                  margin="normal"
                />
              </Box>
            </Collapse>
            <Button
              variant="contained"
              onClick={handleSubmitAction}
              disabled={isUpdating}></Button>
          </Form>
        </>
      )}
    </BootstrapDialog>
  );
};

export default ActionForm;
