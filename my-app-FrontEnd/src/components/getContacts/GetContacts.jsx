import { useState } from "react";
import * as XLSX from "xlsx";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Alert,
  CircularProgress,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { createBulkClients } from "./createBulkClients";
import toast from "react-hot-toast";

// Email validation function
const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zAH0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

// Phone validation function (checks if the number starts with 0 or not and is numeric with at least 11 digits)
const isValidPhone = (phone) => {
  const phoneRegex = /^(\d{10}|\d{11})$/; // Validates phone number that either starts with 0 or has 11 digits
  return phoneRegex.test(phone) && phone;
};

// Name validation function (checks if it's not empty)
const isValidName = (name) => {
  return name && name.trim() !== ""; // Ensure name is not empty
};

const GetContacts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null); // State to track the uploaded file
  const [result, setResult] = useState(null);

  const handleBulkCreate = async (clientsData) => {
    setLoading(true);
    clientsData = data;
    console.log(data);
    try {
      const result = await createBulkClients(clientsData);
      setResult(result);
      console.log(result);
      console.log(result.success);

      if (result.success) {
        console.log("result.success");
        // Show success notification
        toast.success(`Successfully created  clients`);
      } else {
        // Show error notification
        toast.error(`Failed to create some clients. `);
      }
    } catch (error) {
      console.log(error);
      setResult({
        success: false,
        error: "Failed to process request",
      });
      toast.error("Failed to process request");
    } finally {
      setLoading(false);
    }
  };

  // Handle file upload and parse the Excel file
  // const handleFileUpload = (e) => {
  //   setLoading(true); // Start loading
  //   const uploadedFile = e.target.files[0];
  //   setFile(uploadedFile); // Update the file state

  //   const reader = new FileReader();
  //   reader.readAsArrayBuffer(uploadedFile);
  //   reader.onload = (event) => {
  //     const arrayBuffer = event.target.result;
  //     const data = new Uint8Array(arrayBuffer);
  //     const workbook = XLSX.read(data, { type: "array" });
  //     const sheetName = workbook.SheetNames[0];
  //     const sheet = workbook.Sheets[sheetName];
  //     const parsedData = XLSX.utils.sheet_to_json(sheet, { defval: "N/A" });
  //     setData(parsedData);
  //     setLoading(false); // Stop loading
  //   };
  // };
  // chat gpt
  const handleFileUpload = (e) => {
    setLoading(true); // Start loading
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile); // Update the file state

    const reader = new FileReader();
    reader.readAsArrayBuffer(uploadedFile);
    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { defval: null }); // Use null for missing values
      //Email
      // Transform data to match the required format
      const normalizedData = parsedData.map((row) => ({
        name: row.name || null, // Default to null if name is missing
        age: row.age || null, // Default to null if age is missing
        email: row.email || null, // Default to null if email is missing
        city_id: row.city_id || null, // Default to null if city_id is missing
        street: row.street || null, // Default to null if street is missing
        // channel: row.channel || "Unknown", // Default to "Unknown" if channel is missing
        // type: row.type || "Unknown", // Default to "Unknown" if type is missing
        // status: row.status || "Unknown", // Default to "Unknown" if status is missing
        budget: row.budget || 0, // Default to 0 if budget is missing
        phoneNumbers: Array.isArray(row.phoneNumbers)
          ? row.phoneNumbers
          : [String(row.phoneNumbers || "")], // Ensure phoneNumbers is an array
      }));

      setData(normalizedData);
      setLoading(false); // Stop loading
    };
  };

  // Handle deleting a row
  const handleDeleteRow = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1); // Remove the row at the given index
    setData(updatedData);
  };

  // Remove all invalid rows (those with red background)
  const handleRemoveInvalidRows = () => {
    const updatedData = data.filter((row) => {
      const isNameValid = isValidName(row.name);
      const isPhoneValid = isValidPhone(row.phoneNumbers);
      return isNameValid && isPhoneValid;
    });
    setData(updatedData);
  };

  // Handle file reset
  const handleResetFile = () => {
    setFile(null); // Reset the file state
    setData([]); // Optionally, reset the data if you want
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom>
                Upload Excel File
              </Typography>
              <Box>
                <Box
                  component="input"
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileUpload}
                  disabled={file !== null} // Disable the input if file is already selected
                  sx={{
                    display: "block",
                    margin: "16px auto",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
                {file && (
                  <Box sx={{ textAlign: "center", mt: 2 }}>
                    <Typography variant="body1">File: {file.name}</Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleResetFile}
                      sx={{ mt: 2 }}
                    >
                      Remove File
                    </Button>
                  </Box>
                )}
                {loading && (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 3 }}
                  >
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>Processing file...</Typography>
                  </Box>
                )}
                {!loading && data.length === 0 && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    No data to display. Please upload a valid Excel file.
                  </Alert>
                )}
              </Box>
              {data.length > 0 && (
                <TableContainer component={Paper} sx={{ mt: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <b>Name</b>
                        </TableCell>
                        <TableCell>
                          <b>Phone</b>
                        </TableCell>
                        <TableCell>
                          <b>Email</b>
                        </TableCell>
                        <TableCell>
                          <b>Action</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((row, index) => {
                        // Check if any field is invalid
                        const isNameValid = isValidName(row.name);
                        const isPhoneValid = isValidPhone(row.phoneNumbers);

                        return (
                          <TableRow
                            key={index}
                            sx={{
                              backgroundColor: !(isNameValid && isPhoneValid)
                                ? "rgba(255, 0, 0, 0.1)" // Red background for invalid row
                                : "white",
                            }}
                          >
                            <TableCell>{row.name || "N/A"}</TableCell>
                            <TableCell>{row.phoneNumbers || "N/A"}</TableCell>
                            <TableCell>{row.email || "N/A"}</TableCell>
                            <TableCell>
                              <IconButton
                                color="error"
                                onClick={() => handleDeleteRow(index)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {data.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    // onClick={() => alert("Contacts processed successfully!")}
                    onClick={handleBulkCreate}
                  >
                    Process Contacts
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleRemoveInvalidRows}
                  >
                    Remove Invalid Rows
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GetContacts;
