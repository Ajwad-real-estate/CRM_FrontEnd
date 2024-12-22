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
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { tokens } from "../../theme";
import Cookies from "js-cookie";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const [roles, setRoles] = useState([]); // State to hold the roles
  const [theRole, setTheRole] = useState(""); // State to hold the current role_id

  // Fetch agent data and roles data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch agent data
        const agentResponse = await axios.get(
          `${apiUrl}/api/agentDetails`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
        );
        setFormData(agentResponse.data); // Populate the form with agent details
        setTheRole(agentResponse.data.role_id); // Set the initial role_id

        // Fetch roles data
        const rolesResponse = await axios.get(`${apiUrl}/api/roles`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        });
        setRoles(rolesResponse.data.roles); // Populate the dropdown with roles

        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle role change in the dropdown
  // const handleRoleChange = (e) => {
  //   const { value } = e.target;
  //   setTheRole(value);
  //   setFormData((prevData) => ({ ...prevData, role_id: value })); // Update role_id in form data
  // };

  // Handle form submission to update agent details
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      await axios.put(
        `${apiUrl}/api/agentDetails`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      alert("Agent details updated successfully!");
    } catch (err) {
      setError("Failed to update agent details. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Loading or error UI
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" color={colors.redAccent[500]}>
          {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: "600px",
        margin: "0 auto",
        mt: 5,
        padding: "20px",
        backgroundColor: colors.primary[400],
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          textAlign: "center",
          color: colors.grey[100],
        }}
      >
        Update Agent Details
      </Typography>

      <form onSubmit={handleFormSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formData?.name || ""}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Street"
          name="street"
          value={formData?.street || ""}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Status"
          name="status"
          value={formData?.status || ""}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Target"
          name="target"
          type="number"
          value={formData?.target || ""}
          onChange={handleInputChange}
        />

        {/*
        Dropdown for Roles
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
           <Select
            label="Role"
            name="role"
            value={theRole || ""}
            onChange={handleRoleChange} // Set selected role in the state
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.title}
              </MenuItem>
            ))}
          </Select> 
        </FormControl>
          */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
          }}
        >
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
      </form>
    </Box>
  );
};

export default Profile;
