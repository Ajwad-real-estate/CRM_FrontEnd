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
// import clientsApi from "./clientsApi"; // Updated to use the clientsApi
import toast from "react-hot-toast";
import clientsApi from "../../../api/clientsApis";

const isValidEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone) => {
  if (!phone) return false;
  // Allow international format (+ prefix) or local numbers
  const phoneRegex = /^(\+\d{1,3})?\d{9,15}$/;
  return phoneRegex.test(phone);
};

const isValidName = (name) => {
  return name && name.trim().length >= 2;
};

const GetContacts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleBulkCreate = async () => {
    if (data.length === 0) {
      toast.error("No data to process");
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    try {
      // Filter and format valid data
      const validClients = data
        .filter(
          (row) => isValidName(row.name) && isValidPhone(row.phoneNumbers?.[0])
        )
        .map((row) => ({
          name: row.name.trim(),
          email: isValidEmail(row.email) ? row.email : null,
          phoneNumbers: [String(row.phoneNumbers?.[0]).replace(/\D/g, "")],
          ...(row.city_id && { city_id: row.city_id }),
          ...(row.street && { street: row.street }),
          ...(row.budget && { budget: parseFloat(row.budget) || 0 }),
        }));

      if (validClients.length === 0) {
        toast.error("No valid clients to create");
        return;
      }

      // Split into batches of 50 to avoid overwhelming the server
      const batchSize = 50;
      const batches = [];
      for (let i = 0; i < validClients.length; i += batchSize) {
        batches.push(validClients.slice(i, i + batchSize));
      }

      let successCount = 0;
      let errorCount = 0;

      for (const [index, batch] of batches.entries()) {
        try {
          const result = await clientsApi.createBulkClients(batch);
          successCount += batch.length;
          toast.success(
            `Batch ${index + 1}/${batches.length} processed successfully`
          );
        } catch (error) {
          errorCount += batch.length;
          console.error(`Batch ${index + 1} failed:`, error);
          toast.error(
            `Batch ${index + 1} failed: ${error.error || "Unknown error"}`
          );
        }
        setUploadProgress(Math.round(((index + 1) / batches.length) * 100));
      }

      toast.success(
        `Processed ${successCount} clients successfully. ${errorCount} failed.`,
        { duration: 5000 }
      );

      // Clear data after successful processing
      if (errorCount === 0) {
        setData([]);
        setFile(null);
      }
    } catch (error) {
      console.error("Bulk create error:", error);
      toast.error(error.message || "Failed to process clients");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    setLoading(true);
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const arrayBuffer = event.target.result;
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
          type: "array",
        });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);

        const normalizedData = parsedData.map((row) => {
          // Normalize phone numbers - ensure it's an array of strings
          let phoneNumbers = [];
          if (row.phone) {
            phoneNumbers = [String(row.phone).trim()];
          } else if (row.phoneNumbers) {
            phoneNumbers = Array.isArray(row.phoneNumbers)
              ? row.phoneNumbers.map((p) => String(p).trim())
              : [String(row.phoneNumbers).trim()];
          }

          return {
            name: row.name ? String(row.name).trim() : null,
            email: row.email ? String(row.email).trim() : null,
            phoneNumbers,
            city_id: row.city_id || null,
            street: row.street ? String(row.street).trim() : null,
            budget: parseFloat(row.budget) || 0,
          };
        });

        setData(normalizedData);
      } catch (error) {
        console.error("File processing error:", error);
        toast.error("Failed to process file. Please check the format.");
        setFile(null);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsArrayBuffer(uploadedFile);
  };

  const handleDeleteRow = (index) => {
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveInvalidRows = () => {
    setData((prev) =>
      prev.filter(
        (row) => isValidName(row.name) && isValidPhone(row.phoneNumbers?.[0])
      )
    );
  };

  const handleResetFile = () => {
    setData([]);
    setFile(null);
  };

  const getRowValidationStatus = (row) => {
    const errors = [];
    if (!isValidName(row.name)) errors.push("Invalid name");
    if (!isValidPhone(row.phoneNumbers?.[0])) errors.push("Invalid phone");
    if (row.email && !isValidEmail(row.email)) errors.push("Invalid email");
    return errors;
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom>
                Upload Client Data
              </Typography>

              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Button component="label" variant="contained" disabled={!!file}>
                  {file ? "File Selected" : "Select Excel File"}
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                    hidden
                  />
                </Button>
                {file && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1">{file.name}</Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleResetFile}
                      sx={{ mt: 1 }}>
                      Remove File
                    </Button>
                  </Box>
                )}
              </Box>

              {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                  <CircularProgress />
                  <Typography>Processing file...</Typography>
                </Box>
              )}

              {!loading && data.length === 0 && (
                <Alert severity="info">
                  Upload an Excel file to preview client data
                </Alert>
              )}

              {data.length > 0 && (
                <>
                  <TableContainer component={Paper} sx={{ mt: 3, mb: 3 }}>
                    <Table size="small">
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
                            <b>Status</b>
                          </TableCell>
                          <TableCell>
                            <b>Action</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((row, index) => {
                          const errors = getRowValidationStatus(row);
                          return (
                            <TableRow
                              key={index}
                              sx={{
                                backgroundColor:
                                  errors.length > 0
                                    ? "rgba(255, 0, 0, 0.08)"
                                    : "inherit",
                              }}>
                              <TableCell>
                                {row.name || <em>Missing</em>}
                              </TableCell>
                              <TableCell>
                                {row.phoneNumbers?.[0] || <em>Missing</em>}
                              </TableCell>
                              <TableCell>
                                {row.email || <em>None</em>}
                              </TableCell>
                              <TableCell>
                                {errors.length > 0 ? (
                                  <Typography color="error" variant="caption">
                                    {errors.join(", ")}
                                  </Typography>
                                ) : (
                                  <Typography
                                    color="success.main"
                                    variant="caption">
                                    Valid
                                  </Typography>
                                )}
                              </TableCell>
                              <TableCell>
                                <IconButton
                                  size="small"
                                  onClick={() => handleDeleteRow(index)}>
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleRemoveInvalidRows}
                        disabled={loading}
                        sx={{ mr: 2 }}>
                        Remove Invalid (
                        {
                          data.filter(
                            (row) => getRowValidationStatus(row).length > 0
                          ).length
                        }
                        )
                      </Button>
                      <Typography variant="caption" display="block">
                        Total valid:{" "}
                        {
                          data.filter(
                            (row) => getRowValidationStatus(row).length === 0
                          ).length
                        }
                        /{data.length}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleBulkCreate}
                      disabled={loading || data.length === 0}
                      startIcon={
                        loading && (
                          <CircularProgress size={20} color="inherit" />
                        )
                      }>
                      {uploadProgress > 0
                        ? `${uploadProgress}% Complete`
                        : "Create Clients"}
                    </Button>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GetContacts;
