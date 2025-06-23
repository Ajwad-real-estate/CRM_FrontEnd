import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  useTheme,
  Alert,
  Stack,
  Collapse,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { tokens } from "../../helpers/redux/theme";
import { useTeam } from "./useTeam";

const Sales = () => {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    useAgentDetails,
    // roles,
    // statuses,
    updateAgentDetails,
    updateAgentEmail,
    updateAgentPassword,
  } = useTeam();

  // Simplified state structure
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    status_id: "",
    target: "",
    role_id: "",
  });
  const { data: agentData, isLoading } = useAgentDetails(id);

  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // const [roles, setRoles] = useState([]);
  // const [statuses, setStatuses] = useState([]);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [emailForm, setEmailForm] = useState({
    newEmail: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (agentData) {
      setFormData({
        name: agentData.name || "",
        street: agentData.street || "",
        status_id: agentData.status_id || "",
        target: agentData.target || "",
        role_id: agentData.role_id || "",
      });
    }
  }, [agentData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      street: formData.street,
      status_id: parseInt(formData.status_id),
      target: parseInt(formData.target),
      role_id: parseInt(formData.role_id),
    };
    updateAgentDetails.mutate({ id, payload });
  };

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    updateAgentEmail.mutate({ id, newEmail: emailForm.newEmail });
    setEmailForm({ newEmail: "" });
    setShowEmailForm(false);
    setSuccessMessage("Email updated successfully!");
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("Passwords do not match!");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setError("Password must be at least 6 characters long!");
      setTimeout(() => setError(""), 3000);
      return;
    }
    updateAgentPassword.mutate({ id, newPassword: passwordForm.newPassword });
    setPasswordForm({ newPassword: "", confirmPassword: "" });
    setShowPasswordForm(false);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "800px", margin: "0 auto", mt: 5, padding: "20px" }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <Stack spacing={4}>
        <Box
          sx={{
            backgroundColor: colors.primary[400],
            p: 3,
            borderRadius: "8px",
          }}>
          <Typography
            variant="h4"
            sx={{ mb: 3, color: colors.grey[100], textAlign: "center" }}>
            Update Agent Details
          </Typography>

          <form onSubmit={handleFormSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Street"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                name="status_id"
                value={formData.status_id}
                onChange={handleInputChange}>
                {/* {statuses.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.name}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              label="Target"
              name="target"
              type="number"
              value={formData.target}
              onChange={handleInputChange}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                name="role_id"
                value={formData.role_id}
                onChange={handleInputChange}>
                {/* {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.title}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>

            <Box
              sx={{
                mt: 3,
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isUpdating}>
                  {isUpdating ? "Updating..." : "Update"}
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={() => window.history.back()}>
                  Cancel
                </Button>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={() => setShowEmailForm(!showEmailForm)}>
                  {showEmailForm ? "Hide Email Form" : "Change Email"}
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={() => setShowPasswordForm(!showPasswordForm)}>
                  {showPasswordForm ? "Hide Password Form" : "Change Password"}
                </Button>
              </Box>
            </Box>
          </form>
        </Box>

        <Collapse in={showEmailForm}>
          <Box
            sx={{
              backgroundColor: colors.primary[400],
              p: 3,
              borderRadius: "8px",
            }}>
            <Typography
              variant="h4"
              sx={{ mb: 3, color: colors.grey[100], textAlign: "center" }}>
              Update Email
            </Typography>
            <form onSubmit={handleEmailUpdate}>
              <TextField
                fullWidth
                margin="normal"
                label="New Email"
                name="newEmail"
                type="email"
                value={emailForm.newEmail}
                onChange={(e) => setEmailForm({ newEmail: e.target.value })}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isUpdating}
                sx={{ mt: 2 }}>
                {isUpdating ? "Updating..." : "Update Email"}
              </Button>
            </form>
          </Box>
        </Collapse>

        <Collapse in={showPasswordForm}>
          <Box
            sx={{
              backgroundColor: colors.primary[400],
              p: 3,
              borderRadius: "8px",
            }}>
            <Typography
              variant="h4"
              sx={{ mb: 3, color: colors.grey[100], textAlign: "center" }}>
              Update Password
            </Typography>
            <form onSubmit={handlePasswordUpdate}>
              <TextField
                fullWidth
                margin="normal"
                label="New Password"
                name="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                required
                helperText="Password must be at least 6 characters long"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isUpdating}
                sx={{ mt: 2 }}>
                {isUpdating ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </Box>
        </Collapse>
      </Stack>
    </Box>
  );
};

export default Sales;
