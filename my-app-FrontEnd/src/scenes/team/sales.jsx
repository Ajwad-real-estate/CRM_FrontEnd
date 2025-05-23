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
import { tokens } from "../../theme";
import Cookies from "js-cookie";

const Sales = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Simplified state structure
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    status_id: "",
    target: "",
    role_id: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [roles, setRoles] = useState([]);
  const [statuses, setStatuses] = useState([]);
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
    const fetchData = async () => {
      try {
        const [agentResponse, rolesResponse, statusesResponse] = await Promise.all([
          axios.get(`${apiUrl}/api/agentDetails/${id}`, {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }),
          axios.get(`${apiUrl}/api/roles`, {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }),
          axios.get(`${apiUrl}/api/agent-statuses`, {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }),
        ]);

        setFormData({
          name: agentResponse.data.name || "",
          street: agentResponse.data.street || "",
          status_id: agentResponse.data.status_id || "",
          target: agentResponse.data.target || "",
          role_id: agentResponse.data.role_id || "",
        });

        setRoles(rolesResponse.data.roles);
        setStatuses(statusesResponse.data.statuses);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, apiUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const payload = {
        name: formData.name,
        street: formData.street,
        status_id: parseInt(formData.status_id),
        target: parseInt(formData.target),
        role_id: parseInt(formData.role_id),
      };

      await axios.put(
        `${apiUrl}/api/agentDetails/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      setSuccessMessage("Agent details updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update agent details. Please try again.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await axios.post(
        `${apiUrl}/api/auth/regmailbyid/${id}`,
        { newEmail: emailForm.newEmail },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      setSuccessMessage("Email updated successfully!");
      setEmailForm({ newEmail: "" });
      setShowEmailForm(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update email. Please try again.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsUpdating(false);
    }
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

    setIsUpdating(true);
    try {
      await axios.post(
        `${apiUrl}/api/auth/repassbyid/${id}`,
        { newPassword: passwordForm.newPassword },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      setSuccessMessage("Password updated successfully!");
      setPasswordForm({ newPassword: "", confirmPassword: "" });
      setShowPasswordForm(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password. Please try again.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "800px", margin: "0 auto", mt: 5, padding: "20px" }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

      <Stack spacing={4}>
        <Box sx={{ backgroundColor: colors.primary[400], p: 3, borderRadius: "8px" }}>
          <Typography variant="h4" sx={{ mb: 3, color: colors.grey[100], textAlign: "center" }}>
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
                onChange={handleInputChange}
              >
                {statuses.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.name}
                  </MenuItem>
                ))}
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
                onChange={handleInputChange}
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update"}
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={() => setShowEmailForm(!showEmailForm)}
                >
                  {showEmailForm ? "Hide Email Form" : "Change Email"}
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                >
                  {showPasswordForm ? "Hide Password Form" : "Change Password"}
                </Button>
              </Box>
            </Box>
          </form>
        </Box>

        <Collapse in={showEmailForm}>
          <Box sx={{ backgroundColor: colors.primary[400], p: 3, borderRadius: "8px" }}>
            <Typography variant="h4" sx={{ mb: 3, color: colors.grey[100], textAlign: "center" }}>
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
                sx={{ mt: 2 }}
              >
                {isUpdating ? "Updating..." : "Update Email"}
              </Button>
            </form>
          </Box>
        </Collapse>

        <Collapse in={showPasswordForm}>
          <Box sx={{ backgroundColor: colors.primary[400], p: 3, borderRadius: "8px" }}>
            <Typography variant="h4" sx={{ mb: 3, color: colors.grey[100], textAlign: "center" }}>
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
                onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
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
                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isUpdating}
                sx={{ mt: 2 }}
              >
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
