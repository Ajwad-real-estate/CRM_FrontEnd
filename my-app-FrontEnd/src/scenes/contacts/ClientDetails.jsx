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

const ClientDetails = () => {
 const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
 const { id } = useParams();
 const theme = useTheme();
 const colors = tokens(theme.palette.mode);
 const [cities, setCities] = useState([]);

 const [formData, setFormData] = useState(null);
 const [isLoading, setIsLoading] = useState(true);
 const [isUpdating, setIsUpdating] = useState(false);
 const [error, setError] = useState("");

 // Status options
 const statusOptions = ["New", "Qualified", "Lost", "Reserved", "Done_Deal"];
 const typeOptions = ["Warm", "Cold"];
 const channelOptions = [
  "Google Form",
  "Facebook",
  "Twitter",
  "Instagram",
  "Website",
  "Referral",
 ];

 useEffect(() => {
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

  fetchClientDetails();

  // fetchCities
  const fetchCities = async () => {
   setIsLoading(true);
   setError(null);

   try {
    const response = await axios.get(`${apiUrl}/api/city`, {
     headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
     },
    });
    const { data } = response;

    if (data && data.cities && data.cities.length > 0) {
     const fetchedCities = data.cities.map((city) => city.name);

     // Merge fetched cities with fallback cities, avoiding duplicates
     // const mergedCities = Array.from(new Set([...fetchedCities, ...cityOptions]));

     // Sort the cities alphabetically
     // mergedCities.sort((a, b) => a.localeCompare(b));

     setCities(fetchedCities);
    }
   } catch (err) {
    console.error("Error fetching cities:", err.message);
    setError("Failed to fetch cities. Using fallback options.");

    // Use fallback cities in case of error
    setCities(cityOptions);
   } finally {
    setIsLoading(false);
   }
  };

  fetchCities();
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
   await axios.put(
    `${apiUrl}/api/clients/${id}`,
    formData,
    {
     headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
     },
    }
   );
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
    maxWidth: "800px",
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

     {/* <TextField
      fullWidth
      margin="normal"
      label="City ID"
      name="city_id"
      type="number"
      value={formData?.city_id || ""}
      onChange={handleInputChange}
     /> */}

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
       name="status"
       value={formData?.status || ""}
       onChange={handleInputChange}
      >
       {statusOptions.map((status) => (
        <MenuItem key={status} value={status}>
         {status}
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
       onChange={handleInputChange}
      >
       {cities.map((city, index) => (
        <MenuItem key={index} value={index + 1}>
         {city}
        </MenuItem>
       ))}
      </Select>
     </FormControl>

     <FormControl fullWidth margin="normal">
      <InputLabel>Type</InputLabel>
      <Select
       label="Type"
       name="type"
       value={formData?.type || ""}
       onChange={handleInputChange}
      >
       {typeOptions.map((type) => (
        <MenuItem key={type} value={type}>
         {type}
        </MenuItem>
       ))}
      </Select>
     </FormControl>

     <FormControl fullWidth margin="normal">
      <InputLabel>Channel</InputLabel>
      <Select
       label="Channel"
       name="channel"
       value={formData?.channel || ""}
       onChange={handleInputChange}
      >
       {channelOptions.map((channel) => (
        <MenuItem key={channel} value={channel}>
         {channel}
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
        onClick={() => removePhoneNumber(index)}
       >
        Remove
       </Button>
      </Box>
     ))}
     <Button
      variant="outlined"
      color="primary"
      onClick={addPhoneNumber}
      sx={{ mt: 1 }}
     >
      Add Phone Number
     </Button>
    </Box>

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

export default ClientDetails;
