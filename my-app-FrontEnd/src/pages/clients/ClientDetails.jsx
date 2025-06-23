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
import { tokens } from "../../helpers/redux/theme";
import Cookies from "js-cookie";
import {
  cityOptions,
  statusOptions,
  typeOptions,
  channelOptions,
} from "../../data/clientOptions";

const ClientDetails = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    street: "",
    city_id: "",
    budget: "",
    type_id: "",
    status_id: "",
    channel_id: "",
    nat_id: "",
    phone_numbers: [""],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  const fetchClientDetails = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      setFormData(response.data);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to fetch client details. Please try again.");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchClientDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (index, value) => {
    const newPhoneNumbers = [...(formData.phone_numbers || [])];
    newPhoneNumbers[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      phone_numbers: newPhoneNumbers,
    }));
  };

  const addPhoneNumber = () => {
    setFormData((prevData) => ({
      ...prevData,
      phone_numbers: [...(prevData.phone_numbers || []), ""],
    }));
  };

  const removePhoneNumber = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      phone_numbers: prevData.phone_numbers.filter((_, i) => i !== index),
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      await axios.put(`${apiUrl}/api/clients/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      alert("Client details updated successfully!");
    } catch (err) {
      setError("Failed to update client details. Please try again.");
    } finally {
      setIsUpdating(false);
    }
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

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}>
        <Typography variant="h4" color={colors.redAccent[500]}>
          {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "0 auto",
        mt: 5,
        padding: "20px",
        backgroundColor: colors.primary[400],
        borderRadius: "8px",
      }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          textAlign: "center",
          color: colors.grey[100],
        }}>
        Client Details
      </Typography>

      <form onSubmit={handleFormSubmit}>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
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
            label="Age"
            name="age"
            type="number"
            value={formData?.age || ""}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formData?.email || ""}
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
            label="Budget"
            name="budget"
            type="number"
            value={formData?.budget || ""}
            onChange={handleInputChange}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              name="status_id"
              value={formData?.status_id || ""}
              onChange={handleInputChange}>
              {statusOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>City</InputLabel>
            <Select
              label="City"
              name="city_id"
              value={formData?.city_id || ""}
              onChange={handleInputChange}>
              {cityOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              name="type_id"
              value={formData?.type_id || ""}
              onChange={handleInputChange}>
              {typeOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Channel</InputLabel>
            <Select
              label="Channel"
              name="channel_id"
              value={formData?.channel_id || ""}
              onChange={handleInputChange}>
              {channelOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="National ID"
            name="nat_id"
            value={formData?.nat_id || ""}
            onChange={handleInputChange}
          />
        </Box>

        {/* Phone Numbers Section */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" color={colors.grey[100]} sx={{ mb: 2 }}>
            Phone Numbers
          </Typography>
          {formData?.phone_numbers?.map((phone, index) => (
            <Box key={index} sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                label={`Phone Number ${index + 1}`}
                value={phone || ""}
                onChange={(e) => handlePhoneChange(index, e.target.value)}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => removePhoneNumber(index)}>
                Remove
              </Button>
            </Box>
          ))}
          <Button
            variant="outlined"
            color="primary"
            onClick={addPhoneNumber}
            sx={{ mt: 1 }}>
            Add Phone Number
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
          }}>
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
      </form>
    </Box>
  );
};

export default ClientDetails;
